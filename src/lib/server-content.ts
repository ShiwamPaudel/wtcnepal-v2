import 'server-only';

import type { NewsArticle } from '@/data/news';
import type { Product } from '@/data/products';
import type { TeamMember } from '@/data/team';
import type { JobOpening } from '@/data/jobs';
import {
  getPublishedHomeBanners,
  getPublishedJobs as getCmsPublishedJobs,
  getPublishedNews,
  getPublishedAboutPageContent,
  getPublishedPageAsset,
  getPublishedProducts,
  getPublishedTeam as getCmsPublishedTeam,
} from '@/lib/cms';

export async function getProducts(): Promise<Product[]> {
  return getPublishedProducts();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}

export async function getPublishedNewsArticles(): Promise<NewsArticle[]> {
  return getPublishedNews();
}

export async function getPublishedArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  const articles = await getPublishedNewsArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getPublishedTeam(): Promise<TeamMember[]> {
  return getCmsPublishedTeam();
}

export async function getPublishedJobs(): Promise<JobOpening[]> {
  return getCmsPublishedJobs();
}

export async function getHomeBanners() {
  return getPublishedHomeBanners();
}

export async function getPageAsset(id: string) {
  return getPublishedPageAsset(id);
}

export async function getAboutPageContent() {
  return getPublishedAboutPageContent();
}
