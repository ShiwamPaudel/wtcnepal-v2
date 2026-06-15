import { NextResponse } from 'next/server';
import { z } from 'zod';
import { submitContactSubmission } from '@/lib/cms';
import {
  getClientIp,
  hashRequestIdentifier,
  isSameOriginRequest,
  rateLimit,
} from '@/lib/request-security';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  message: z.string().trim().min(10).max(3000),
  sourcePath: z.string().trim().max(240).default('/contact'),
  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const ipHash = hashRequestIdentifier(ip);
  const limiter = rateLimit(`contact:${ipHash}`, 8, 15 * 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json({ message: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 });
  }

  try {
    const id = await submitContactSubmission({
      ...parsed.data,
      ipHash,
      userAgent: request.headers.get('user-agent') ?? '',
    });

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('Contact enquiry failed', error);
    return NextResponse.json(
      { message: 'Could not send your enquiry. Please contact WTC Nepal directly.' },
      { status: 500 },
    );
  }
}
