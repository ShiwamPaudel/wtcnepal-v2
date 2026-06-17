import { NextResponse } from 'next/server';
import { z } from 'zod';
import { submitBrochureRequest } from '@/lib/cms';
import {
  getClientIp,
  hashRequestIdentifier,
  isSameOriginRequest,
  rateLimit,
} from '@/lib/request-security';

export const runtime = 'nodejs';

const schema = z.object({
  productId: z.string().trim().min(1).max(160),
  productName: z.string().trim().min(1).max(180),
  brochureUrl: z.string().trim().max(500).default(''),
  name: z.string().trim().min(2).max(120),
  institution: z.string().trim().min(2).max(180),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  sourcePath: z.string().trim().max(240).default('/products'),
  website: z.string().max(0).optional().or(z.literal('')),
});

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const ip = getClientIp(request);
  const ipHash = hashRequestIdentifier(ip);
  const limiter = rateLimit(`brochure:${ipHash}`, 8, 15 * 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json({ message: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ message: 'Please check the form and try again.' }, { status: 400 });
  }

  try {
    const id = await submitBrochureRequest({
      ...parsed.data,
      ipHash,
      userAgent: request.headers.get('user-agent') ?? '',
    });

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('Brochure request failed', error);
    return NextResponse.json(
      { message: 'Could not send your brochure request. Please contact Web Trading Concern Pvt. Ltd. directly.' },
      { status: 500 },
    );
  }
}
