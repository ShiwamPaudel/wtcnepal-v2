import 'server-only';

import { createHash } from 'crypto';

type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (!host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function getClientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

export function hashRequestIdentifier(value: string) {
  const salt = process.env.ADMIN_SESSION_SECRET || process.env.TURSO_AUTH_TOKEN || 'wtc-local-request-salt';
  return createHash('sha256').update(`${salt}:${value}`).digest('hex');
}

export function rateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();

  for (const [bucketKey, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(bucketKey);
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, resetAt: now + windowMs };
  }

  bucket.count += 1;
  return { allowed: bucket.count <= max, resetAt: bucket.resetAt };
}
