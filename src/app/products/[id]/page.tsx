import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProductArtwork } from '@/components/ui/ProductArtwork';
import { divisions } from '@/data/divisions';
import { getProductById, products } from '@/data/products';
import { constructMetadata, siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getProductSchema } from '@/lib/structured-data';
import { getDivisionLabel } from '@/lib/content';

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return constructMetadata({
      title: 'Product Not Found',
      description: 'The requested WTC Nepal product could not be found.',
      path: `/products/${id}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${product.name} | ${getDivisionLabel(product.division)} Equipment`,
    description: `${product.description} Available through WTC Nepal with consultation, installation, and service support across Nepal.`,
    image: product.image || siteConfig.ogImage,
    path: `/products/${product.id}`,
  });
}

export default async function ProductSinglePage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const division = divisions.find((item) => item.id === product.division);
  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.division === product.division)
    .slice(0, 3);

  const jsonLd = [
    getProductSchema(product),
    getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'Products', item: '/products' },
      { name: product.name, item: `/products/${product.id}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-slate-200 bg-slate-50 py-16">
        <div className="container-xl">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to products
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:items-center">
            <ProductArtwork
              name={product.name}
              image={product.image}
              division={product.division}
              priority
              className="aspect-[4/3] rounded-lg border border-slate-200 bg-white shadow-sm"
            />

            <div>
              <p className="text-sm font-bold text-[var(--color-primary)]">
                {getDivisionLabel(product.division)} equipment
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-lg leading-8 text-slate-600">{product.description}</p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <dt className="text-xs font-semibold uppercase text-slate-500">Partner</dt>
                  <dd className="mt-1 font-semibold text-slate-950">{product.partner}</dd>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <dt className="text-xs font-semibold uppercase text-slate-500">Division</dt>
                  <dd className="mt-1 font-semibold text-slate-950">
                    {getDivisionLabel(product.division)}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
                >
                  Request product consultation
                </Link>
                <Link
                  href="/service-network"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Service support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">How WTC Nepal supports this product</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {[
                  'Product consultation and configuration guidance',
                  'Installation coordination and operator training',
                  'Preventive maintenance and technical service support',
                ].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-white p-5">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-primary)]" />
                    <p className="mt-4 text-sm font-medium leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {division && (
              <aside className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold text-[var(--color-primary)]">Division overview</p>
                <h3 className="mt-2 text-2xl font-bold text-slate-950">{division.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{division.description}</p>
                <Link
                  href={`/divisions/${division.id}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                >
                  Explore division
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </aside>
            )}
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-slate-50 py-16">
          <div className="container-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold text-[var(--color-primary)]">Related products</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">
                  More in {getDivisionLabel(product.division)}
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
              >
                Browse all products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.id}`}
                  className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <ProductArtwork
                    name={item.name}
                    image={item.image}
                    division={item.division}
                    className="aspect-[4/3] rounded-md"
                  />
                  <h3 className="mt-4 font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{item.partner}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
