import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { deleteMedia, listMedia, saveMedia } from '@/lib/cms';
import { isSameOriginRequest } from '@/lib/request-security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']);

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to upload media.' }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const error = await requireAdmin();
  if (error) return error;

  return NextResponse.json(await listMedia());
}

export async function POST(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ message: 'Choose a file to upload.' }, { status: 400 });
  }

  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ message: 'Upload a JPG, PNG, WebP, GIF, or PDF file.' }, { status: 400 });
  }

  const media = await saveMedia(file);
  return NextResponse.json(media);
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
    return NextResponse.json({ message: 'Missing media id.' }, { status: 400 });
  }

  await deleteMedia(id);
  return NextResponse.json(await listMedia());
}
