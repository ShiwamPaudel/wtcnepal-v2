import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductGallery } from '@/components/ProductGallery';
import { RelevantProductsSlider } from '@/components/RelevantProductsSlider';
import ProductBrochureModal from '@/components/ui/ProductBrochureModal';
import { RichText } from '@/components/ui/RichText';
import type { Product } from '@/data/products';
import { constructMetadata, siteConfig } from '@/lib/seo';
import { getBreadcrumbSchema, getProductSchema } from '@/lib/structured-data';
import { getDivisionLabel, hasUsableImage } from '@/lib/content';
import { getProductById, getProducts } from '@/lib/server-content';

type Props = {
  params: Promise<{ id: string }>;
};

function getProductImages(product: Product) {
  const images = Array.isArray(product.images) ? product.images : [];
  return [product.image, ...images].filter(hasUsableImage).filter((image, index, list) => list.indexOf(image) === index);
}

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

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
  const product = await getProductById(id);
  const products = await getProducts();

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id && item.division === product.division)
    .slice(0, 10);
  const productImages = getProductImages(product);

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
            <div>
              <ProductGallery
                name={product.name}
                images={productImages}
                division={product.division}
                priority
              />

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase text-slate-500">Partner</dt>
                    <dd className="mt-1 font-semibold text-slate-950">{product.partner}</dd>
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <dt className="text-xs font-semibold uppercase text-slate-500">Division</dt>
                    <dd className="mt-1 font-semibold text-slate-950">
                      {getDivisionLabel(product.division)}
                    </dd>
                  </div>
                </dl>

                <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-slate-500">Catalogue</p>
                  <div className="mt-3">
                    <ProductBrochureModal
                      productId={product.id}
                      productName={product.name}
                      brochure={product.brochure ?? ''}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--color-primary)]">
                {getDivisionLabel(product.division)} equipment
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {product.name}
              </h1>
              <RichText
                content={product.description}
                className="mt-5 text-lg leading-8 text-slate-600"
              />

            </div>
          </div>
        </div>
      </section>

      <RelevantProductsSlider products={relatedProducts} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
