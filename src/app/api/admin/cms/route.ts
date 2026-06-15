import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import {
  deleteCmsItem,
  getAdminCmsContent,
  saveCmsItem,
  seedCmsFromLocalContent,
  type CmsCollection,
} from '@/lib/cms';
import { isAdminAuthenticated } from '@/lib/admin-auth';
import { isSameOriginRequest } from '@/lib/request-security';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const collections = ['products', 'news', 'team', 'jobs', 'home-banners', 'page-assets', 'about-page'];

function parseCollection(value: unknown): CmsCollection {
  if (typeof value === 'string' && collections.includes(value)) return value as CmsCollection;
  throw new Error('Unknown CMS collection.');
}

function revalidateCollection(collection: CmsCollection, id?: string) {
  revalidatePath('/');
  revalidatePath('/sitemap.xml');
  revalidatePath('/admin');
  revalidatePath(`/admin/content/${collection}`);

  if (collection === 'products') {
    revalidatePath('/products');
    if (id) revalidatePath(`/products/${id}`);
  }

  if (collection === 'news') {
    revalidatePath('/news');
    revalidatePath('/news-and-events');
    if (id) {
      revalidatePath(`/news/${id}`);
      revalidatePath(`/news-and-events/${id}`);
    }
  }

  if (collection === 'team') revalidatePath('/team');
  if (collection === 'jobs') revalidatePath('/career');
  if (collection === 'home-banners') revalidatePath('/');
  if (collection === 'page-assets') {
    revalidatePath('/');
    revalidatePath('/team');
  }
  if (collection === 'about-page') revalidatePath('/about');
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: 'Sign in to use the CMS.' }, { status: 401 });
  }

  return null;
}

export async function GET() {
  const error = await requireAdmin();
  if (error) return error;

  try {
    return NextResponse.json(await getAdminCmsContent());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CMS request failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    const body = await request.json();

    if (body?.action === 'seed') {
      await seedCmsFromLocalContent();
      return NextResponse.json(await getAdminCmsContent());
    }

    const collection = parseCollection(body.collection);
    const item = await saveCmsItem(collection, body.item ?? {});
    revalidateCollection(collection, String(item.id));

    return NextResponse.json(await getAdminCmsContent());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CMS save failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const error = await requireAdmin();
  if (error) return error;

  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ message: 'Invalid request origin.' }, { status: 403 });
  }

  try {
    const url = new URL(request.url);
    const collection = parseCollection(url.searchParams.get('collection'));
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Missing item id.' }, { status: 400 });
    }

    await deleteCmsItem(collection, id);
    revalidateCollection(collection, id);
    return NextResponse.json(await getAdminCmsContent());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CMS delete failed.';
    return NextResponse.json({ message }, { status: 500 });
  }
}
