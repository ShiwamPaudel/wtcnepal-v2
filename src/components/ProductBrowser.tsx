'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Grid3X3,
  List as ListIcon,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import type { DivisionInfo } from '@/data/divisions';
import type { Product } from '@/data/products';
import {
  divisionTheme,
  getDivisionLabel,
  getSearchableProductText,
  normalizeText,
  sortProductsForDisplay,
} from '@/lib/content';
import { ProductArtwork } from '@/components/ui/ProductArtwork';

type ViewMode = 'grid' | 'list';

interface ProductBrowserProps {
  products: Product[];
  divisions: DivisionInfo[];
  initialDivision?: string;
  initialCategory?: string;
  initialPartner?: string;
  initialQuery?: string;
}

export function ProductBrowser({
  products,
  divisions,
  initialDivision,
  initialCategory,
  initialQuery,
}: ProductBrowserProps) {
  const normalizedInitialDivision = divisions.some((item) => item.id === initialDivision) ? initialDivision! : 'all';
  const [query, setQuery] = useState(initialQuery ?? '');
  const [division, setDivision] = useState(normalizedInitialDivision);
  const [category, setCategory] = useState(initialCategory ?? 'all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const categoryOptions = useMemo(() => {
    const divisionCategories =
      division === 'all'
        ? divisions.flatMap((item) => item.categories ?? [])
        : divisions.find((item) => item.id === division)?.categories ?? [];

    return Array.from(new Set(divisionCategories.map((item) => item.name))).sort();
  }, [division, divisions]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const matches = products.filter((product) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        getSearchableProductText(product).includes(normalizedQuery);
      const matchesDivision = division === 'all' || product.division === division;
      const matchesCategory =
        category === 'all' ||
        normalizeText(product.category ?? '') === normalizeText(category) ||
        (!product.category &&
          (normalizeText(product.name).includes(normalizeText(category)) ||
            normalizeText(product.description).includes(normalizeText(category))));

      return matchesQuery && matchesDivision && matchesCategory;
    });

    return sortProductsForDisplay(matches, { categoryMode: category !== 'all' });
  }, [category, division, products, query]);

  const resetFilters = () => {
    setQuery('');
    setDivision('all');
    setCategory('all');
  };

  return (
    <section className="bg-white">
      <div className="border-y border-slate-200 bg-slate-50/70 py-8">
        <div className="container-xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-[var(--color-primary)]"></p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950"></h2>
              <p className="mt-2 text-sm text-slate-600">
                
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-1">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                className={`flex h-10 w-10 items-center justify-center rounded-md transition ${
                  viewMode === 'grid'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                className={`flex h-10 w-10 items-center justify-center rounded-md transition ${
                  viewMode === 'list'
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <ListIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_190px_240px_auto]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search products, partners, or capabilities"
                className="h-12 w-full rounded-lg border border-slate-300 bg-white pl-12 pr-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label>
              <span className="sr-only">Division</span>
              <select
                value={division}
                onChange={(event) => {
                  setDivision(event.target.value);
                  setCategory('all');
                }}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">All divisions</option>
                {divisions.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="sr-only">Category</span>
              <select
                value={categoryOptions.includes(category) ? category : 'all'}
                onChange={(event) => setCategory(event.target.value)}
                className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-100"
              >
                <option value="all">All categories</option>
                {categoryOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
              <SlidersHorizontal className="h-4 w-4 text-[var(--color-primary)]" />
              {filteredProducts.length} of {products.length} products
            </span>
            {division !== 'all' && (
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">
                {getDivisionLabel(division as Product['division'])}
              </span>
            )}
            {category !== 'all' && (
              <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">{category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="container-xl py-16">
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3'
                : 'grid gap-5'
            }
          >
            {filteredProducts.map((product) => (
              <ProductResultCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex max-w-lg flex-col items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
            <PackageSearch className="h-10 w-10 text-slate-400" />
            <h3 className="mt-4 text-xl font-bold text-slate-950">No matching products</h3>
            <p className="mt-2 text-sm text-slate-600">
              Try a broader keyword, choose another division, or reset all filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductResultCard({ product, viewMode }: { product: Product; viewMode: ViewMode }) {
  const theme = divisionTheme[product.division];

  if (viewMode === 'list') {
    return (
      <article className="group grid gap-5 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center">
        <ProductArtwork
          name={product.name}
          image={product.image}
          division={product.division}
          className="aspect-[4/3] rounded-md"
        />
        <div className="min-w-0">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${theme.badge}`}>
            {getDivisionLabel(product.division)}
          </span>
          <h3 className="mt-3 text-xl font-bold text-slate-950 transition group-hover:text-[var(--color-primary)]">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{product.partner}</p>
          {product.category && <p className="mt-1 text-xs font-semibold text-slate-400">{product.category}</p>}
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{product.description}</p>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-accent)]"
        >
          Details
          <ArrowRight className="h-4 w-4" />
        </Link>
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <ProductArtwork
        name={product.name}
        image={product.image}
        division={product.division}
        className="aspect-[4/3]"
      />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${theme.badge}`}>
            {getDivisionLabel(product.division)}
          </span>
          <span className="text-xs font-medium text-slate-500">{product.partner}</span>
        </div>
        {product.category && <p className="mt-3 text-xs font-semibold text-slate-400">{product.category}</p>}
        <h3 className="mt-4 text-xl font-bold leading-snug text-slate-950 transition group-hover:text-[var(--color-primary)]">
          {product.name}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{product.description}</p>
        <Link
          href={`/products/${product.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
        >
          View details
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
