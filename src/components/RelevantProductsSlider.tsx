'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductArtwork } from '@/components/ui/ProductArtwork';

type RelevantProductsSliderProps = {
  products: Product[];
};

export function RelevantProductsSlider({ products }: RelevantProductsSliderProps) {
  const railProducts = products.length > 3 ? [...products, ...products] : products;

  return (
    <section className="bg-slate-50 py-16">
      <div className="container-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-primary)]"></p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">Relevant Products</h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:text-[var(--color-accent)]"
          >
            Browse all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 overflow-hidden">
            <div className={`flex gap-6 ${products.length > 3 ? 'animate-marquee' : ''}`}>
              {railProducts.map((item, index) => (
                <Link
                  key={`${item.id}-${index}`}
                  href={`/products/${item.id}`}
                  className="group w-[min(78vw,300px)] shrink-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <ProductArtwork
                    name={item.name}
                    image={item.image}
                    division={item.division}
                    className="aspect-[4/3] rounded-md"
                  />
                  <h3 className="mt-4 line-clamp-2 min-h-12 font-bold leading-6 text-slate-950 transition group-hover:text-[var(--color-primary)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">{item.partner}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            Relevant products will appear here once more products are published.
          </div>
        )}
      </div>
    </section>
  );
}
