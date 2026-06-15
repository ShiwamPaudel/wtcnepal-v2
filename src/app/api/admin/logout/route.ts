import { NextResponse } from 'next/server';
import { clearAdminSession } from '@/lib/admin-auth';
import { isSameOriginRequest } from '@/lib/request-security';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
