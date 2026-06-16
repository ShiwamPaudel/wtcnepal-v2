import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, HeartPulse, Microscope, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { divisions } from '@/data/divisions';
import type { Division } from '@/data/divisions';
import { partners } from '@/data/partners';
import { constructMetadata } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import { normalizeText } from '@/lib/content';
import { getProducts } from '@/lib/server-content';

type Props = {
  params: Promise<{ id: string }>;
};

const categoryIcons: Record<Division, LucideIcon> = {
  diagnostics: Microscope,
  disinfection: ShieldCheck,
  care: HeartPulse,
};

export function generateStaticParams() {
  return divisions.map((division) => ({ id: division.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const division = divisions.find((item) => item.id === id);

  if (!division) {
    return constructMetadata({
      title: 'Division Categories Not Found',
      description: 'The requested WTC Nepal division categories could not be found.',
      path: `/divisions/${id}/categories`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${division.name} Categories and Partner Brands`,
    description: `Browse ${division.name.toLowerCase()} product categories and partner brands available through WTC Nepal.`,
    path: `/divisions/${division.id}/categories`,
  });
}

export default async function DivisionCategoriesPage({ params }: Props) {
  const { id } = await params;
  const division = divisions.find((item) => item.id === id);
  const products = await getProducts();

  if (!division) {
    notFound();
  }

  const CategoryIcon = categoryIcons[division.id];
  const jsonLd = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Divisions', item: '/divisions' },
    { name: division.name, item: `/divisions/${division.id}` },
    { name: 'Categories', item: `/divisions/${division.id}/categories` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="container-xl">
          <Link
            href="/divisions"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to divisions
          </Link>
          <p className="mt-8 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
            Categories
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight text-slate-950 md:text-[34px]">
            {division.name}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
            
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {division.categories?.map((category) => {
              const partnerRecord = partners.find((partner) => {
                const categoryPartner = normalizeText(category.partner);
                const partnerName = normalizeText(partner.name);

                return categoryPartner.includes(partnerName) || partnerName.includes(categoryPartner);
              });
              const productCount = products.filter((product) => {
                if (product.division !== division.id) return false;
                if (product.category) return normalizeText(product.category) === normalizeText(category.name);

                return (
                  normalizeText(product.name).includes(normalizeText(category.name)) ||
                  normalizeText(product.description).includes(normalizeText(category.name))
                );
              }).length;

              return (
                <Link
                  key={`${category.name}-${category.partner}`}
                  href={`/products?division=${division.id}&category=${encodeURIComponent(category.name)}`}
                  className="group relative grid min-h-[168px] grid-cols-[72px_minmax(0,1fr)] gap-4 overflow-hidden rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg"
                  style={{ borderTopColor: division.color, borderTopWidth: 3 }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-100">
                    <CategoryIcon className="h-7 w-7 text-[var(--color-primary)]" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold uppercase tracking-wide text-[var(--color-primary)]">
                      
                    </p>
                    <h4 className="mt-1.5 line-clamp-3 max-w-full text-[13px] font-bold leading-[17px] text-slate-950">
                      {category.name}
                    </h4>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-slate-500">
                      
                    </p>
                  </div>

                  <div className="col-span-2 mt-2 flex items-end justify-between gap-4 border-t border-slate-100 pt-4">
                    <div className="flex h-10 min-w-0 items-center">
                      {partnerRecord ? (
                        <Image
                          src={partnerRecord.image}
                          alt={partnerRecord.name}
                          width={1500}
                          height={1500}
                          className="max-h-25 w-auto max-w-44 object-contain"
                        />
                      ) : (
                        <span className="truncate text-xs font-semibold text-slate-500">
                          {category.partner}
                        </span>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-xs font-medium text-slate-500 sm:inline">
                        {productCount > 0 ? `${productCount} product${productCount === 1 ? '' : 's'}` : 'View products'}
                      </span>
                      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-[var(--color-primary)] group-hover:text-white">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
