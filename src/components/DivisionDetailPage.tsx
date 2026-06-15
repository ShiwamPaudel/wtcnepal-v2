import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, HeartPulse, Microscope, ShieldCheck } from 'lucide-react';
import type { Division } from '@/data/divisions';
import { divisions } from '@/data/divisions';
import { partners } from '@/data/partners';
import { ProductArtwork } from '@/components/ui/ProductArtwork';
import { divisionTheme, getDivisionLabel } from '@/lib/content';
import { getFAQSchema } from '@/lib/structured-data';
import { getProducts } from '@/lib/server-content';

const divisionIcons = {
  diagnostics: Microscope,
  disinfection: ShieldCheck,
  care: HeartPulse,
};

interface DivisionDetailPageProps {
  divisionId: Division;
}

export async function DivisionDetailPage({ divisionId }: DivisionDetailPageProps) {
  const products = await getProducts();
  const division = divisions.find((item) => item.id === divisionId)!;
  const Icon = divisionIcons[divisionId];
  const theme = divisionTheme[divisionId];
  const divisionPartners = partners.filter((partner) => partner.division === divisionId);
  const divisionProducts = products.filter((product) => product.division === divisionId).slice(0, 6);
  const jsonLd = getFAQSchema(division.faq);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-20">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
            <div>
              <div className={`inline-flex h-14 w-14 items-center justify-center rounded-lg ${theme.bg}`}>
                <Icon className={`h-7 w-7 ${theme.text}`} />
              </div>
              <p className="mt-6 text-sm font-bold text-[var(--color-primary)]">
                {division.name} division
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {division.tagline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                {division.longDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/divisions/${division.id}/categories`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                >
                  View categories
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Talk to a specialist
                </Link>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-950">Core offerings</p>
              <ul className="mt-5 space-y-3">
                {division.offerings.slice(0, 6).map((offering) => (
                  <li key={offering} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${theme.text}`} />
                    {offering}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Partner network</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                {division.name} partner brands
              </h2>
            </div>
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              View all partners
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisionPartners.map((partner) => (
              <Link
                key={partner.id}
                href={`/partners/${partner.id}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-24 items-center justify-center rounded-md bg-slate-50 p-4">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    width={160}
                    height={90}
                    className="max-h-16 object-contain"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
                  {partner.name}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{partner.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="container-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Product examples</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
                {getDivisionLabel(divisionId)} products
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
            >
              Search catalogue
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {divisionProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <ProductArtwork
                  name={product.name}
                  image={product.image}
                  division={product.division}
                  className="aspect-[4/3] rounded-md"
                />
                <h3 className="mt-4 text-lg font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
                  {product.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{product.partner}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2">
            {division.benefits.map((benefit) => (
              <article key={benefit.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="text-xl font-bold text-slate-950">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
