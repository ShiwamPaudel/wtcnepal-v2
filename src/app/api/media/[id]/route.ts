import { NextResponse } from 'next/server';
import { getMedia } from '@/lib/cms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Props) {
  const { id } = await params;
  const media = await getMedia(id);

  if (!media) {
    return NextResponse.json({ message: 'Media not found.' }, { status: 404 });
  }

  if (media.isCorrupt) {
    return NextResponse.json(
      { message: 'Media data is unavailable. Please re-upload this file.' },
      { status: 410 },
    );
  }

  const safeFilename = media.filename.replace(/[^\w.\- ]/g, '').slice(0, 180) || 'download';
  const disposition = media.contentType.startsWith('image/') || media.contentType === 'application/pdf' ? 'inline' : 'attachment';

  return new Response(media.data as BodyInit, {
    headers: {
      'Content-Type': media.contentType,
      'Content-Length': String(media.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': `${disposition}; filename="${safeFilename}"`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
