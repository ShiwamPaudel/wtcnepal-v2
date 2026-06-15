'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Loader2, Send } from 'lucide-react';

export function CareerApplicationForm({ jobId, jobTitle }: { jobId: string; jobTitle: string }) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    formData.set('jobId', jobId);
    formData.set('jobTitle', jobTitle);

    const response = await fetch('/api/careers/apply', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();

    if (response.ok) {
      setStatus('success');
      setMessage('Application received. Our team will review your profile.');
      event.currentTarget.reset();
    } else {
      setStatus('error');
      setMessage(result.message ?? 'Could not submit application.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Full name</span>
          <input name="name" required className="admin-input bg-white" />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input name="email" type="email" required className="admin-input bg-white" />
        </label>
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Phone</span>
        <input name="phone" required className="admin-input bg-white" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">Short note</span>
        <textarea name="coverNote" rows={4} className="admin-textarea bg-white" />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-slate-700">CV / Resume</span>
        <input
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="mt-2 block w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
        />
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-primary)] disabled:bg-slate-300"
      >
        {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        Submit application
      </button>
      {message && (
        <p className={`text-sm font-semibold ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
