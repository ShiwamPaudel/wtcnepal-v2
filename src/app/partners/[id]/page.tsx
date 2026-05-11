import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { getPartnerById, partners } from '@/data/partners';
import { products } from '@/data/products';
import { ProductArtwork } from '@/components/ui/ProductArtwork';
import { getDivisionLabel, getPartnerProducts } from '@/lib/content';
import { constructMetadata, siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema } from '@/lib/structured-data';

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return partners.map((partner) => ({ id: partner.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const partner = getPartnerById(id);

  if (!partner) {
    return constructMetadata({
      title: 'Partner Not Found',
      description: 'The requested WTC Nepal partner could not be found.',
      path: `/partners/${id}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${partner.name} | WTC Nepal Partner`,
    description: `${partner.description} Learn about ${partner.name} products and WTC Nepal support in Nepal.`,
    image: partner.image || siteConfig.ogImage,
    path: `/partners/${partner.id}`,
  });
}

export default async function PartnerPage({ params }: Props) {
  const { id } = await params;
  const partner = getPartnerById(id);

  if (!partner) {
    notFound();
  }

  const partnerProducts = getPartnerProducts(partner, products);
  const jsonLd = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Partners', item: '/partners' },
    { name: partner.name, item: `/partners/${partner.id}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="container-xl">
          <Link
            href="/partners"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to partners
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-center">
            <div className="flex aspect-[4/3] items-center justify-center rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
              <Image
                src={partner.image}
                alt={partner.name}
                width={240}
                height={140}
                className="max-h-32 object-contain"
                priority
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--color-primary)]">
                {getDivisionLabel(partner.division)} partner
              </p>
              <h1 className="mt-4 text-4xl font-bold text-slate-950 md:text-5xl">{partner.name}</h1>
              <p className="mt-2 text-sm font-medium text-slate-500">{partner.country}</p>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {partner.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {partner.website !== '#' && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                  >
                    Visit website
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Ask about this partner
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">Product portfolio</p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">Products by {partner.name}</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
              {partnerProducts.length} products
            </span>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {partnerProducts.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-600">
                Products for this partner can be added from the CMS once the final catalogue is ready.
              </div>
            )}

            {partnerProducts.map((product) => (
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
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{product.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)]">
                  View product
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
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
