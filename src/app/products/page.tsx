import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { ProductBrowser } from '@/components/ProductBrowser';
import { divisions } from '@/data/divisions';
import { getProducts } from '@/lib/server-content';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Medical Equipment and Healthcare Solutions in Nepal',
  description:
    'Search WTC Nepal medical equipment by division, partner, and product category. Browse diagnostics, disinfection, and care solutions with nationwide service support.',
  path: '/products',
});

type ProductsPageProps = {
  searchParams: Promise<{ division?: string; category?: string; partner?: string; q?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="container-xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-sm font-bold text-[var(--color-primary)]">Our Products & Solutions</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                Medical Equipments and Service
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                Browse advanecd technologies and solutions 
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-950">Need help selecting equipment?</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Tell us your facility type, expected workload, and service location. Our team can
                shortlist compatible systems.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
              >
                Talk to an expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductBrowser
        products={products}
        divisions={divisions}
        initialDivision={filters.division}
        initialCategory={filters.category}
        initialPartner={filters.partner}
        initialQuery={filters.q}
      />
    </main>
  );
}
