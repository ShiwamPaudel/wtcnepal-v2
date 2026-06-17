import { NextResponse } from 'next/server';
import { z } from 'zod';
import { submitCareerApplication } from '@/lib/cms';
import {
  getClientIp,
  hashRequestIdentifier,
  isSameOriginRequest,
  rateLimit,
} from '@/lib/request-security';

export const runtime = 'nodejs';

const schema = z.object({
  jobId: z.string().trim().min(1).max(160),
  jobTitle: z.string().trim().min(1).max(180),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(6).max(40),
  coverNote: z.string().trim().max(3000).default(''),
});

const allowedCvTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const ipHash = hashRequestIdentifier(getClientIp(request));
  const limiter = rateLimit(`career:${ipHash}`, 5, 15 * 60 * 1000);
  if (!limiter.allowed) {
    return NextResponse.json({ message: 'Too many submissions. Please try again later.' }, { status: 429 });
  }

  try {
    const formData = await request.formData();
    const cvFile = formData.get('cv');
    const parsed = schema.safeParse(Object.fromEntries(formData.entries()));

    if (!parsed.success) {
      return NextResponse.json({ message: 'Please check the application form and try again.' }, { status: 400 });
    }

    if (!(cvFile instanceof File) || cvFile.size === 0) {
      return NextResponse.json({ message: 'Upload a CV file.' }, { status: 400 });
    }

    if (!allowedCvTypes.has(cvFile.type)) {
      return NextResponse.json({ message: 'Upload a PDF, DOC, or DOCX CV.' }, { status: 400 });
    }

    const id = await submitCareerApplication({
      ...parsed.data,
      cvFile,
    });

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error('Career application failed', error);
    return NextResponse.json(
      { message: 'Could not send your application. Please contact Web Trading Concern Pvt. Ltd. directly.' },
      { status: 500 },
    );
  }
}
