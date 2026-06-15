import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { AdminItemForm } from '@/components/admin/AdminItemForm';
import { adminCollections, emptyCmsItem, isCmsCollection } from '@/lib/admin-collections';

type Props = {
  params: Promise<{ collection: string }>;
};

export default async function NewAdminItemPage({ params }: Props) {
  const { collection: collectionParam } = await params;
  if (!isCmsCollection(collectionParam)) notFound();

  const config = adminCollections[collectionParam];

  return (
    <div className="mx-auto grid max-w-5xl gap-6">
      <div>
        <Link href={`/admin/content/${collectionParam}`} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-950">
          <ArrowLeft className="h-4 w-4" />
          Back to {config.label}
        </Link>
        <h1 className="mt-3 text-3xl font-bold text-slate-950">New {config.singular}</h1>
        <p className="mt-2 text-sm text-slate-600">{config.description}</p>
      </div>
      <AdminItemForm collection={collectionParam} item={emptyCmsItem(collectionParam)} mode="create" />
    </div>
  );
}
