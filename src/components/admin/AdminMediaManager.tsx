'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Copy, ExternalLink, Loader2, Trash2, UploadCloud } from 'lucide-react';
import type { CmsMedia } from '@/lib/cms';

function formatBytes(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export function AdminMediaManager({ media }: { media: CmsMedia[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage('');

    const response = await fetch('/api/admin/media', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    });
    const result = await response.json();

    if (response.ok) {
      setMessage(`Uploaded ${result.filename}.`);
      event.currentTarget.reset();
      router.refresh();
    } else {
      setMessage(result.message ?? 'Upload failed.');
    }

    setBusy(false);
  }

  async function deleteMedia(id: string, filename: string) {
    if (!window.confirm(`Delete "${filename}"? Existing content using this URL will stop showing it.`)) return;

    const response = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, { method: 'DELETE' });

    if (response.ok) {
      router.refresh();
    } else {
      const result = await response.json();
      window.alert(result.message ?? 'Delete failed.');
    }
  }

  async function copyUrl(id: string) {
    await navigator.clipboard.writeText(`/api/media/${id}`);
    setMessage('Media URL copied.');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
      <form onSubmit={upload} className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Upload media</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Keep CMS images and CVs reasonably small so media loads quickly.
        </p>
        <input name="file" type="file" required className="mt-5 block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm" />
        <button
          type="submit"
          disabled={busy}
          className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)] disabled:bg-slate-300"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
          Upload media
        </button>
        {message && <p className="mt-4 text-sm font-semibold text-slate-600">{message}</p>}
      </form>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h2 className="text-xl font-bold text-slate-950">Media library</h2>
          <p className="mt-1 text-sm text-slate-500">{media.length} files</p>
        </div>
        <div className="divide-y divide-slate-100">
          {media.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No media uploaded yet.</p>}
          {media.map((item) => (
            <article key={item.id} className="grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-950">{item.filename}</p>
                {item.isCorrupt && (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 ring-1 ring-amber-200">
                    <AlertTriangle className="h-4 w-4" />
                    Migrated BLOB is invalid. Stored {formatBytes(item.storedSize)} as {item.dataType}; re-upload this file.
                  </p>
                )}
                <p className="mt-1 text-sm text-slate-500">{item.contentType} · {formatBytes(item.size)}</p>
                <code className="mt-3 block break-all rounded-xl bg-slate-50 p-3 text-xs text-slate-600">/api/media/{item.id}</code>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                <button type="button" onClick={() => copyUrl(item.id)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
                <a href={`/api/media/${item.id}`} target="_blank" className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
                  <ExternalLink className="h-4 w-4" />
                  Open
                </a>
                <button type="button" onClick={() => deleteMedia(item.id, item.filename)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
