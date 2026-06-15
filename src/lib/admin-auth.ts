import 'server-only';

import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { getTursoClient } from '@/lib/turso';

const cookieName = 'wtc_admin_session';
const maxAgeSeconds = 60 * 60 * 8;
const passwordKeyLength = 64;
const scryptCost = 16384;
const scryptBlockSize = 8;
const scryptParallelization = 1;

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

function nowIso() {
  return new Date().toISOString();
}

function expiryIso() {
  return new Date(Date.now() + maxAgeSeconds * 1000).toISOString();
}

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function derivePasswordKey(password: string, salt: string, keyLength: number, options: {
  N: number;
  r: number;
  p: number;
  maxmem: number;
}) {
  return new Promise<Buffer>((resolve, reject) => {
    scryptCallback(password, salt, keyLength, options, (error, key) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(key);
    });
  });
}

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('base64url');
  const key = await derivePasswordKey(password, salt, passwordKeyLength, {
    N: scryptCost,
    r: scryptBlockSize,
    p: scryptParallelization,
    maxmem: 64 * 1024 * 1024,
  });

  return [
    'scrypt',
    String(scryptCost),
    String(scryptBlockSize),
    String(scryptParallelization),
    salt,
    key.toString('base64url'),
  ].join('$');
}

async function verifyPassword(password: string, encodedHash: string) {
  const [algorithm, cost, blockSize, parallelization, salt, expected] = encodedHash.split('$');
  if (algorithm !== 'scrypt' || !cost || !blockSize || !parallelization || !salt || !expected) {
    return false;
  }

  const key = await derivePasswordKey(password, salt, Buffer.from(expected, 'base64url').length, {
    N: Number(cost),
    r: Number(blockSize),
    p: Number(parallelization),
    maxmem: 64 * 1024 * 1024,
  });

  return safeEqual(key.toString('base64url'), expected);
}

async function seedInitialAdminIfNeeded() {
  const db = getTursoClient();
  if (!db) return false;

  const result = await db.execute('SELECT COUNT(*) AS count FROM admin_users');
  const count = Number(result.rows[0]?.count ?? 0);
  if (count > 0) return true;

  const bootstrapPassword = process.env.ADMIN_PASSWORD;
  if (!bootstrapPassword) return false;

  const createdAt = nowIso();
  await db.execute({
    sql: `INSERT INTO admin_users
      (id, email, name, password_hash, role, active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'owner', 1, ?, ?)`,
    args: [
      randomBytes(16).toString('hex'),
      (process.env.ADMIN_EMAIL || process.env.ADMIN_USERNAME || 'admin@wtcnepal.com').toLowerCase(),
      process.env.ADMIN_NAME || 'WTC Admin',
      await hashPassword(bootstrapPassword),
      createdAt,
      createdAt,
    ],
  });

  return true;
}

export async function ensureAdminAuthSchema() {
  const db = getTursoClient();
  if (!db) return false;

  await db.batch(
    [
      `CREATE TABLE IF NOT EXISTS admin_users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        last_login_at TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS admin_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        secret_hash TEXT NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL,
        revoked_at TEXT,
        user_agent TEXT,
        FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE CASCADE
      )`,
      'CREATE INDEX IF NOT EXISTS idx_admin_sessions_user_id ON admin_sessions(user_id)',
      'CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires_at ON admin_sessions(expires_at)',
    ],
    'write',
  );

  return seedInitialAdminIfNeeded();
}

export async function isAdminLoginConfigured() {
  const db = getTursoClient();
  if (!db) return false;

  await ensureAdminAuthSchema();
  const result = await db.execute('SELECT COUNT(*) AS count FROM admin_users WHERE active = 1');
  return Number(result.rows[0]?.count ?? 0) > 0;
}

export async function authenticateAdmin(email: string, password: string): Promise<AdminUser | null> {
  const db = getTursoClient();
  if (!db) return null;

  await ensureAdminAuthSchema();
  const result = await db.execute({
    sql: `SELECT id, email, name, password_hash, role
      FROM admin_users
      WHERE lower(email) = lower(?) AND active = 1
      LIMIT 1`,
    args: [email.trim()],
  });
  const row = result.rows[0];

  if (!row || !(await verifyPassword(password, String(row.password_hash)))) {
    return null;
  }

  const loggedInAt = nowIso();
  await db.execute({
    sql: 'UPDATE admin_users SET last_login_at = ?, updated_at = ? WHERE id = ?',
    args: [loggedInAt, loggedInAt, String(row.id)],
  });

  return {
    id: String(row.id),
    email: String(row.email),
    name: String(row.name),
    role: String(row.role),
  };
}

export async function createAdminSession(userId: string, request?: Request) {
  const db = getTursoClient();
  if (!db) throw new Error('CMS storage is not configured.');

  const sessionId = randomBytes(16).toString('hex');
  const secret = randomBytes(32).toString('base64url');
  const createdAt = nowIso();

  await db.execute({
    sql: `INSERT INTO admin_sessions
      (id, user_id, secret_hash, expires_at, created_at, last_seen_at, user_agent)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      sessionId,
      userId,
      sha256(secret),
      expiryIso(),
      createdAt,
      createdAt,
      request?.headers.get('user-agent')?.slice(0, 500) ?? '',
    ],
  });

  const cookieStore = await cookies();
  cookieStore.set(cookieName, `${sessionId}.${secret}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: maxAgeSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  const [sessionId] = String(token ?? '').split('.');
  const db = getTursoClient();

  if (db && sessionId) {
    await ensureAdminAuthSchema();
    await db.execute({
      sql: 'UPDATE admin_sessions SET revoked_at = ? WHERE id = ?',
      args: [nowIso(), sessionId],
    });
  }

  cookieStore.delete(cookieName);
}

export async function getAdminSession(): Promise<{ user: AdminUser } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName)?.value;
  if (!token) return null;

  const [sessionId, secret] = token.split('.');
  if (!sessionId || !secret) return null;

  const db = getTursoClient();
  if (!db) return null;

  await ensureAdminAuthSchema();
  const result = await db.execute({
    sql: `SELECT
        s.secret_hash,
        s.expires_at,
        u.id AS user_id,
        u.email,
        u.name,
        u.role
      FROM admin_sessions s
      INNER JOIN admin_users u ON u.id = s.user_id
      WHERE s.id = ? AND s.revoked_at IS NULL AND u.active = 1
      LIMIT 1`,
    args: [sessionId],
  });
  const row = result.rows[0];

  if (!row || String(row.expires_at) <= nowIso() || !safeEqual(String(row.secret_hash), sha256(secret))) {
    return null;
  }

  await db.execute({
    sql: 'UPDATE admin_sessions SET last_seen_at = ? WHERE id = ?',
    args: [nowIso(), sessionId],
  });

  return {
    user: {
      id: String(row.user_id),
      email: String(row.email),
      name: String(row.name),
      role: String(row.role),
    },
  };
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession());
}
