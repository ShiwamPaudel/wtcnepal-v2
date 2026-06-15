'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('submitting');
    setMessage('');

    const formData = new FormData(event.currentTarget);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        website: formData.get('website'),
        sourcePath: window.location.pathname,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      setStatus('success');
      setMessage('Thanks. Your enquiry has been received by WTC Nepal.');
      setForm({ name: '', email: '', phone: '', message: '' });
      event.currentTarget.reset();
      return;
    }

    setStatus('error');
    setMessage(result.message ?? 'Could not submit your enquiry. Please try again.');
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">Send us a message</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Share your requirements and the WTC Nepal team will follow up.
      </p>

      {status !== 'success' ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                Full name
              </label>
              <input
                required
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Email address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700">
              Phone number
            </label>
            <input
              required
              id="phone"
              name="phone"
              type="tel"
              placeholder="+977-XXXXXXXXXX"
              className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              required
              id="message"
              name="message"
              placeholder="Tell us about your requirements"
              rows={6}
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
              value={form.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)] disabled:bg-slate-300"
          >
            {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send enquiry
          </button>
          {message && (
            <p className={`text-sm font-semibold ${status === 'error' ? 'text-red-700' : 'text-emerald-700'}`}>
              {message}
            </p>
          )}
        </form>
      ) : (
        <div className="mt-8 rounded-lg bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h3 className="mt-4 text-xl font-bold text-slate-950">Enquiry received</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Thanks. The WTC Nepal team will review your message and follow up.
          </p>
        </div>
      )}
    </div>
  );
}
