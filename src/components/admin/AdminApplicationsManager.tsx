'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ExternalLink, Loader2, Trash2 } from 'lucide-react';
import type { CareerApplication } from '@/lib/cms';

const statuses = ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'];

export function AdminApplicationsManager({ applications }: { applications: CareerApplication[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    const response = await fetch('/api/admin/applications', {
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

  async function deleteApplication(id: string, name: string) {
    if (!window.confirm(`Delete ${name}'s application permanently?`)) return;

    setBusyId(id);
    const response = await fetch(`/api/admin/applications?id=${encodeURIComponent(id)}`, { method: 'DELETE' });

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
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-xl font-bold text-slate-950">Career applications</h2>
        <p className="mt-1 text-sm text-slate-500">{applications.length} applicant records</p>
      </div>
      <div className="divide-y divide-slate-100">
        {applications.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No applications have been received yet.</p>}
        {applications.map((application) => (
          <article key={application.id} className="grid gap-4 p-5 lg:grid-cols-[minmax(0,1fr)_180px_220px] lg:items-center">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold text-slate-950">{application.name}</h3>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">{application.status}</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">{application.jobTitle} · {application.email} · {application.phone}</p>
              {application.coverNote && <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{application.coverNote}</p>}
              <p className="mt-2 text-xs text-slate-400">{new Date(application.createdAt).toLocaleString()}</p>
            </div>
            <label className="block">
              <span className="sr-only">Status</span>
              <select
                value={application.status}
                disabled={busyId === application.id}
                onChange={(event) => updateStatus(application.id, event.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              <a href={`/api/media/${application.cvMediaId}`} target="_blank" className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
                <ExternalLink className="h-4 w-4" />
                CV
              </a>
              <button
                type="button"
                onClick={() => deleteApplication(application.id, application.name)}
                disabled={busyId === application.id}
                className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700"
              >
                {busyId === application.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
