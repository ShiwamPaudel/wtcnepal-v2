import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { divisions } from '@/data/divisions';
import { partners } from '@/data/partners';
import { constructMetadata } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import { normalizeText } from '@/lib/content';

type Props = {
  params: Promise<{ id: string }>;
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

  if (!division) {
    notFound();
  }

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
          <p className="mt-8 text-sm font-bold text-[var(--color-primary)]">Categories</p>
          <h1 className="mt-4 text-3xl font-bold text-slate-950 md:text-4xl">
            {division.name} categories and partner brands
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Explore the core product categories WTC Nepal supports through the {division.name}
            division.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {division.categories?.map((category) => {
              const partnerRecord = partners.find((partner) => {
                const categoryPartner = normalizeText(category.partner);
                const partnerName = normalizeText(partner.name);

                return categoryPartner.includes(partnerName) || partnerName.includes(categoryPartner);
              });

              return (
                <Link
                  key={`${category.name}-${category.partner}`}
                  href={`/products?division=${division.id}&category=${encodeURIComponent(category.name)}`}
                  className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-lg"
                >
                  <div className="flex h-36 items-center justify-center bg-slate-50 p-6">
                    {partnerRecord ? (
                      <Image
                        src={partnerRecord.image}
                        alt={partnerRecord.name}
                        width={210}
                        height={118}
                        className="max-h-24 w-auto object-contain transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-500">{category.partner}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                      {category.partner}
                    </p>
                    <h2 className="mt-2 text-sm font-bold leading-5 text-slate-950 md:text-[15px]">
                      {category.name}
                    </h2>
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
