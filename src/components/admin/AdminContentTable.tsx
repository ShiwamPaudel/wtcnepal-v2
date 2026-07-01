'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ExternalLink, Loader2, Pencil, Trash2 } from 'lucide-react';
import type { CmsCollection, CmsItemRecord } from '@/lib/cms';
import { adminCollections } from '@/lib/admin-collections';

function itemTitle(record: CmsItemRecord) {
  const data = record.data as Record<string, unknown>;
  return String(data.name ?? data.title ?? record.id);
}

function itemSubtitle(record: CmsItemRecord) {
  const data = record.data as Record<string, unknown>;
  return String(data.partner ?? data.department ?? data.email ?? data.date ?? record.id);
}

function publicHref(collection: CmsCollection, record: CmsItemRecord) {
  const data = record.data as Record<string, unknown>;
  if (collection === 'products') return `/products/${record.id}`;
  if (collection === 'news') return `/news-and-events/${String(data.slug ?? record.id)}`;
  if (collection === 'team') return '/team';
  if (collection === 'home-banners') return '/';
  if (collection === 'page-assets') return collection === 'page-assets' && record.id === 'team-hero' ? '/team' : '/';
  return '/career';
}

async function readJsonResponse(response: Response) {
  try {
    return await response.json();
  } catch {
    return { message: response.ok ? '' : 'Request failed without a JSON response.' };
  }
}

export function AdminContentTable({
  collection,
  records,
}: {
  collection: CmsCollection;
  records: CmsItemRecord[];
}) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const config = adminCollections[collection];

  async function deleteItem(record: CmsItemRecord) {
    if (!window.confirm(`Delete "${itemTitle(record)}" permanently?`)) return;

    setDeletingId(record.id);
    const response = await fetch(`/api/admin/cms?collection=${collection}&id=${encodeURIComponent(record.id)}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      router.refresh();
    } else {
      const result = await readJsonResponse(response);
      window.alert(result.message ?? 'Delete failed.');
    }

    setDeletingId(null);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{config.label}</h2>
          <p className="mt-1 text-sm text-slate-500">{records.length} records</p>
        </div>
        <Link
          href={`/admin/content/${collection}/new`}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)]"
        >
          New {config.singular}
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {records.length === 0 && (
          <div className="p-10 text-center">
            <p className="font-bold text-slate-950">No records yet</p>
            <p className="mt-2 text-sm text-slate-500">Create one manually or seed local content from the overview page.</p>
          </div>
        )}
        {records.map((record) => (
          <article key={record.id} className="grid gap-4 p-5 transition hover:bg-slate-50 lg:grid-cols-[minmax(0,1fr)_150px_220px] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-bold text-slate-950">{itemTitle(record)}</h3>
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                    record.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {record.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{itemSubtitle(record)}</p>
              <p className="mt-2 font-mono text-xs text-slate-400">{record.id}</p>
            </div>
            <div className="text-sm text-slate-500">
              <p>Updated</p>
              <p className="font-semibold text-slate-700">{record.updatedAt ? new Date(record.updatedAt).toLocaleDateString() : 'Local'}</p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <Link
                href={publicHref(collection, record)}
                target="_blank"
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
              >
                <ExternalLink className="h-4 w-4" />
                View
              </Link>
              <Link
                href={`/admin/content/${collection}/${encodeURIComponent(record.id)}/edit`}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Link>
              <button
                type="button"
                onClick={() => deleteItem(record)}
                disabled={deletingId === record.id || record.status === 'local'}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700 disabled:opacity-45"
              >
                {deletingId === record.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
