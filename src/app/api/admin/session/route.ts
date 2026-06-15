import { NextResponse } from 'next/server';
import { getAdminSession, isAdminLoginConfigured } from '@/lib/admin-auth';
import { isTursoConfigured } from '@/lib/turso';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getAdminSession();

  return NextResponse.json({
    authenticated: Boolean(session),
    user: session?.user ?? null,
    loginConfigured: await isAdminLoginConfigured(),
    tursoConfigured: isTursoConfigured(),
  });
}
