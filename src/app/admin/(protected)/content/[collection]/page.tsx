import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminContentTable } from '@/components/admin/AdminContentTable';
import { adminCollections, isCmsCollection } from '@/lib/admin-collections';
import { getAdminCmsCollection } from '@/lib/cms';

type Props = {
  params: Promise<{ collection: string }>;
};

export async function generateStaticParams() {
  return Object.keys(adminCollections).map((collection) => ({ collection }));
}

export default async function AdminCollectionPage({ params }: Props) {
  const { collection: collectionParam } = await params;
  if (!isCmsCollection(collectionParam)) notFound();

  const config = adminCollections[collectionParam];
  const records = await getAdminCmsCollection(collectionParam);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950">
            <ArrowLeft className="h-4 w-4" />
            Overview
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">{config.label}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{config.description}</p>
        </div>
        <Link
          href={config.publicPath}
          target="_blank"
          className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700"
        >
          Open public page
        </Link>
      </div>

      <AdminContentTable collection={collectionParam} records={records} />
    </div>
  );
}
