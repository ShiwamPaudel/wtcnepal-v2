'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, Loader2, Send, X } from 'lucide-react';

interface ProductBrochureModalProps {
  productId: string;
  brochure: string;
  productName: string;
}

export default function ProductBrochureModal({ productId, brochure, productName }: ProductBrochureModalProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', institution: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/brochure-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        productName,
        brochureUrl: brochure,
        name: formData.get('name'),
        institution: formData.get('institution'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        website: formData.get('website'),
        sourcePath: window.location.pathname,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      setStatus('success');
      setMessage('Our Team shall reach out to you soon.');
      setForm({ name: '', institution: '', email: '', phone: '' });
      event.currentTarget.reset();
      return;
    }

    setStatus('error');
    setMessage(result.message ?? 'Could not submit brochure request.');
  }

  return (
    <>
      <button
        type="button"
        className="cursor-pointer rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
        onClick={() => {
          setStatus('idle');
          setMessage('');
          setOpen(true);
        }}
      >
        Request Catalogue for the Product
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200"
              onClick={() => setOpen(false)}
              aria-label="Close brochure request"
            >
              <X className="h-4 w-4" />
            </button>

            <h2 className="pr-10 text-xl font-bold text-slate-950">Request brochure</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Fill in the Form to get brochure for {productName}.
            </p>

            {status === 'success' ? (
              <div className="mt-6 rounded-lg bg-emerald-50 p-5 text-center">
                <CheckCircle2 className="mx-auto h-9 w-9 text-emerald-600" />
                <p className="mt-3 text-sm font-semibold text-emerald-800">{message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <input
                  required
                  name="name"
                  placeholder="Your name"
                  className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  value={form.name}
                  onChange={handleChange}
                />
                <input
                  required
                  name="institution"
                  placeholder="Institution name"
                  className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  value={form.institution}
                  onChange={handleChange}
                />
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  required
                  name="phone"
                  placeholder="Phone number"
                  className="h-11 rounded-lg border border-slate-300 px-4 text-sm outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                  value={form.phone}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  Submit request
                </button>
                {message && <p className="text-sm font-semibold text-red-700">{message}</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
