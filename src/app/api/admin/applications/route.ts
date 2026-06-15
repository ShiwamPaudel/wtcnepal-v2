import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import {
  deleteCareerApplication,
  listCareerApplications,
  updateCareerApplicationStatus,
} from '@/lib/cms';
import { isSameOriginRequest } from '@/lib/request-security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to view applications.' }, { status: 401 });
  }

  return NextResponse.json(await listCareerApplications());
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to update applications.' }, { status: 401 });
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const body = await request.json();

  if (!body.id || !body.status) {
    return NextResponse.json({ message: 'Missing application status update.' }, { status: 400 });
  }

  await updateCareerApplicationStatus(String(body.id), String(body.status));
  return NextResponse.json(await listCareerApplications());
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to delete applications.' }, { status: 401 });
  }

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'Missing application id.' }, { status: 400 });
  }

  await deleteCareerApplication(id);
  return NextResponse.json(await listCareerApplications());
}
