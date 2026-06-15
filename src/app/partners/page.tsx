import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Globe2 } from 'lucide-react';
import { partners } from '@/data/partners';
import { constructMetadata } from '@/lib/seo';
import { getDivisionLabel } from '@/lib/content';

export const metadata: Metadata = constructMetadata({
  title: 'Our Global Partners',
  description:
    'Explore WTC Nepal global partner brands across diagnostics, disinfection, and care medical equipment for healthcare providers in Nepal.',
  path: '/partners',
});

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 py-20">
        <div className="container-xl">
          <div className="max-w-4xl">
            <p className="text-sm font-bold text-[var(--color-primary)]">Our Global Partners</p>
            <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
              
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
             
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {partners.map((partner) => (
              <article
                key={partner.id}
                className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-24 w-32 items-center justify-center rounded-md bg-slate-50 p-4">
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={160}
                      height={90}
                      className="max-h-16 object-contain"
                    />
                  </div>
                  <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                    {getDivisionLabel(partner.division)}
                  </span>
                </div>

                <h2 className="mt-6 text-xl font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
                  {partner.name}
                </h2>
                <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-slate-500">
                  <Globe2 className="h-4 w-4" />
                  {partner.country}
                </p>
                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{partner.description}</p>

                <Link
                  href={`/partners/${partner.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
                >
                  View partner page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
