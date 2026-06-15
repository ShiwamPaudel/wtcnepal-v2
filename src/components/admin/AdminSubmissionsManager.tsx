'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Loader2, Mail, Trash2 } from 'lucide-react';
import type { FormSubmission, FormSubmissionType } from '@/lib/cms';

const statuses = ['new', 'contacted', 'qualified', 'closed', 'spam'];
const filters: Array<'all' | FormSubmissionType> = ['all', 'contact', 'brochure'];

export function AdminSubmissionsManager({ submissions }: { submissions: FormSubmission[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | FormSubmissionType>('all');
  const [busyId, setBusyId] = useState<string | null>(null);
  const visibleSubmissions = useMemo(
    () => (filter === 'all' ? submissions : submissions.filter((submission) => submission.type === filter)),
    [filter, submissions],
  );

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    const response = await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });

    if (response.ok) {
      router.refresh();
    } else {
      const result = await response.json();
      window.alert(result.message ?? 'Status update failed.');
    }

    setBusyId(null);
  }

  async function deleteSubmission(submission: FormSubmission) {
    if (!window.confirm(`Delete ${submission.name}'s ${submission.type} submission permanently?`)) return;

    setBusyId(submission.id);
    const response = await fetch(`/api/admin/submissions?id=${encodeURIComponent(submission.id)}`, { method: 'DELETE' });

    if (response.ok) {
      router.refresh();
    } else {
      const result = await response.json();
      window.alert(result.message ?? 'Delete failed.');
    }

    setBusyId(null);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Form submissions</h2>
          <p className="mt-1 text-sm text-slate-500">{visibleSubmissions.length} visible records</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`h-9 rounded-xl px-4 text-sm font-semibold ${
                filter === item ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {visibleSubmissions.length === 0 && (
          <p className="p-8 text-center text-sm text-slate-500">No submissions have been received yet.</p>
        )}
        {visibleSubmissions.map((submission) => (
          <article key={submission.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_180px_220px] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                  {submission.type}
                </span>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                  {submission.status}
                </span>
                <h3 className="font-bold text-slate-950">{submission.name}</h3>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {submission.email} - {submission.phone}
                {submission.institution ? ` - ${submission.institution}` : ''}
              </p>
              {submission.productName && (
                <p className="mt-2 text-sm font-semibold text-slate-700">
                  Product: {submission.productName}
                </p>
              )}
              {submission.message && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{submission.message}</p>}
              <p className="mt-2 text-xs text-slate-400">
                {new Date(submission.createdAt).toLocaleString()} - {submission.sourcePath}
              </p>
            </div>
            <label className="block">
              <span className="sr-only">Status</span>
              <select
                value={submission.status}
                disabled={busyId === submission.id}
                onChange={(event) => updateStatus(submission.id, event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a
                href={`mailto:${submission.email}`}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              {submission.brochureUrl && (
                <a
                  href={submission.brochureUrl}
                  target="_blank"
                  className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Brochure
                </a>
              )}
              <button
                type="button"
                onClick={() => deleteSubmission(submission)}
                disabled={busyId === submission.id}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700"
              >
                {busyId === submission.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
