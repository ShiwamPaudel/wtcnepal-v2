import type { Division } from '@/data/divisions';
import type { Partner } from '@/data/partners';
import type { Product } from '@/data/products';

export const divisionLabels: Record<Division, string> = {
  diagnostics: 'Diagnostics',
  disinfection: 'Disinfection',
  care: 'Care',
};

export const divisionTheme: Record<
  Division,
  {
    text: string;
    border: string;
    bg: string;
    badge: string;
    accent: string;
  }
> = {
  diagnostics: {
    text: 'text-[#004aad]',
    border: 'border-[#004aad]',
    bg: 'bg-blue-50',
    badge: 'bg-blue-50 text-[#004aad] ring-[#004aad]/25',
    accent: '#004aad',
  },
  disinfection: {
    text: 'text-[#ffbd59]',
    border: 'border-[#ffbd59]',
    bg: 'bg-[#fff4df]',
    badge: 'bg-[#fff4df] text-[#ffbd59] ring-[#ffbd59]/35',
    accent: '#ffbd59',
  },
  care: {
    text: 'text-[#38b6ff]',
    border: 'border-[#38b6ff]',
    bg: 'bg-[#e9f7ff]',
    badge: 'bg-[#e9f7ff] text-[#38b6ff] ring-[#38b6ff]/35',
    accent: '#38b6ff',
  },
};

export function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

export function hasUsableImage(src?: string): src is string {
  return Boolean(src && !src.includes('placeholder'));
}

export function getDivisionLabel(division: Division): string {
  return divisionLabels[division] ?? division;
}

export function getPartnerProducts(partner: Partner, products: Product[]): Product[] {
  const partnerName = normalizeText(partner.name);

  return products.filter((product) => {
    const productPartner = normalizeText(product.partner);
    return productPartner.includes(partnerName) || partnerName.includes(productPartner);
  });
}

export function getSearchableProductText(product: Product): string {
  return [product.name, product.partner, product.category, product.description, getDivisionLabel(product.division)]
    .join(' ')
    .toLowerCase();
}

function numericSortValue(value: unknown) {
  const number = Number(value);
  return Number.isFinite(number) ? number : Number.MAX_SAFE_INTEGER;
}

export function compareProductsForDisplay(
  first: Product,
  second: Product,
  options: { categoryMode?: boolean } = {},
) {
  const firstPrimary = options.categoryMode
    ? numericSortValue(first.categorySortOrder)
    : numericSortValue(first.sortOrder);
  const secondPrimary = options.categoryMode
    ? numericSortValue(second.categorySortOrder)
    : numericSortValue(second.sortOrder);

  if (firstPrimary !== secondPrimary) return firstPrimary - secondPrimary;

  const firstFallback = numericSortValue(first.sortOrder);
  const secondFallback = numericSortValue(second.sortOrder);
  if (firstFallback !== secondFallback) return firstFallback - secondFallback;

  return 0;
}

export function sortProductsForDisplay(
  products: Product[],
  options: { categoryMode?: boolean } = {},
) {
  return [...products].sort((first, second) => compareProductsForDisplay(first, second, options));
}
