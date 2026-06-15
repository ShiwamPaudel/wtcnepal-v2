import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminItemForm } from '@/components/admin/AdminItemForm';
import { adminCollections, isCmsCollection } from '@/lib/admin-collections';
import { getAdminCmsItem } from '@/lib/cms';

type Props = {
  params: Promise<{ collection: string; id: string }>;
};

export default async function EditAdminItemPage({ params }: Props) {
  const { collection: collectionParam, id } = await params;
  if (!isCmsCollection(collectionParam)) notFound();

  const config = adminCollections[collectionParam];
  const record = await getAdminCmsItem(collectionParam, decodeURIComponent(id));
  if (!record) notFound();

  return (
    <div className="mx-auto grid max-w-5xl gap-6">
      <div>
        <Link href={`/admin/content/${collectionParam}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          Back to {config.label}
        </Link>
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-950">Edit {config.singular}</h1>
            <p className="mt-2 font-mono text-xs text-slate-500">{record.id}</p>
          </div>
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
              record.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {record.status}
          </span>
        </div>
      </div>
      <AdminItemForm
        collection={collectionParam}
        item={{ ...(record.data as Record<string, unknown>), sortOrder: record.sortOrder }}
        mode="edit"
      />
    </div>
  );
}
