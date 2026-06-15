import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  deleteFormSubmission,
  listFormSubmissions,
  updateFormSubmissionStatus,
  type FormSubmissionType,
} from '@/lib/cms';
import { isSameOriginRequest } from '@/lib/request-security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const statuses = ['new', 'contacted', 'qualified', 'closed', 'spam'];
const types = ['contact', 'brochure'];

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to manage submissions.' }, { status: 401 });
  }

  return null;
}

function parseType(value: string | null): FormSubmissionType | undefined {
  if (!value) return undefined;
  if (types.includes(value)) return value as FormSubmissionType;
  throw new Error('Unknown submission type.');
}

export async function GET(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  const url = new URL(request.url);
  const type = parseType(url.searchParams.get('type'));
  return NextResponse.json(await listFormSubmissions(type));
}

export async function PATCH(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const body = z.object({
    id: z.string().min(1),
    status: z.enum(statuses),
  }).safeParse(await request.json().catch(() => null));

  if (!body.success) {
    return NextResponse.json({ message: 'Missing submission status update.' }, { status: 400 });
  }

  await updateFormSubmissionStatus(body.data.id, body.data.status);
  return NextResponse.json(await listFormSubmissions());
}

export async function DELETE(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing submission id.' }, { status: 400 });
  }

  await deleteFormSubmission(id);
  return NextResponse.json(await listFormSubmissions());
}
