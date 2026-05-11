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
    text: 'text-blue-700',
    border: 'border-blue-200',
    bg: 'bg-blue-50',
    badge: 'bg-blue-50 text-blue-700 ring-blue-200',
    accent: '#004aad',
  },
  disinfection: {
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    badge: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    accent: '#0f8f61',
  },
  care: {
    text: 'text-sky-700',
    border: 'border-sky-200',
    bg: 'bg-sky-50',
    badge: 'bg-sky-50 text-sky-700 ring-sky-200',
    accent: '#0284c7',
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
  return [product.name, product.partner, product.description, getDivisionLabel(product.division)]
    .join(' ')
    .toLowerCase();
}
