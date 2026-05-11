'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const subject = encodeURIComponent(`Website enquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        '',
        form.message,
      ].join('\n'),
    );

    window.location.href = `mailto:info@wtcnepal.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-950">Send us a message</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        This form opens your email app with the enquiry pre-filled.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
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
            className="w-full rounded-lg bg-[var(--color-primary)] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
          >
            Open email enquiry
          </button>
        </form>
      ) : (
        <div className="mt-8 rounded-lg bg-emerald-50 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
          <h3 className="mt-4 text-xl font-bold text-slate-950">Email draft opened</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Please send the prepared email from your mail app so the WTC Nepal team receives it.
          </p>
        </div>
      )}
    </div>
  );
}
