import productsContent from '@/content/products.json';
import type { Division } from './divisions';

export interface Product {
  id: string;
  name: string;
  division: Division;
  category?: string;
  partner: string;
  description: string;
  image: string;
  images?: string[];
  featured?: boolean;
  brochure?: string;
}

export const products = productsContent.products as Product[];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}
