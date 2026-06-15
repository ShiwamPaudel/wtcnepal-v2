import type { MetadataRoute } from 'next';
import { divisions } from '@/data/divisions';
import { partners } from '@/data/partners';
import { siteConfig } from '@/lib/seo';
import { getPublishedNewsArticles, getProducts } from '@/lib/server-content';

const staticRoutes = [
  '',
  '/about',
  '/career',
  '/contact',
  '/divisions',
  '/news-and-events',
  '/partners',
  '/products',
  '/service-network',
  '/team',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, newsArticles] = await Promise.all([getProducts(), getPublishedNewsArticles()]);
  const now = new Date();

  const routes = [
    ...staticRoutes,
    ...divisions.map((division) => `/divisions/${division.id}`),
    ...divisions.map((division) => `/divisions/${division.id}/categories`),
    ...products.map((product) => `/products/${product.id}`),
    ...partners.map((partner) => `/partners/${partner.id}`),
    ...newsArticles.map((article) => `/news-and-events/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/products') ? 0.8 : 0.7,
  }));
}
