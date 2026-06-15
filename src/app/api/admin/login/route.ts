import { NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateAdmin, createAdminSession, isAdminLoginConfigured } from '@/lib/admin-auth';
import { isSameOriginRequest, rateLimit } from '@/lib/request-security';

export const runtime = 'nodejs';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(256),
});

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const limiter = rateLimit(`admin-login:${request.headers.get('x-forwarded-for') ?? 'local'}`, 8, 15 * 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json({ message: 'Too many login attempts. Try again later.' }, { status: 429 });
  }

  const body = schema.safeParse(await request.json().catch(() => null));

  if (!body.success) {
    return NextResponse.json({ message: 'Enter a valid admin email and password.' }, { status: 400 });
  }

  if (!(await isAdminLoginConfigured())) {
    return NextResponse.json({ message: 'Configure CMS access before signing in.' }, { status: 503 });
  }

  const user = await authenticateAdmin(body.data.email, body.data.password);
  if (!user) {
    return NextResponse.json({ message: 'Invalid password.' }, { status: 401 });
  }

  await createAdminSession(user.id, request);
  return NextResponse.json({ ok: true });
}
