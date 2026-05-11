import type { MetadataRoute } from 'next';
import { divisions } from '@/data/divisions';
import { newsArticles } from '@/data/news';
import { partners } from '@/data/partners';
import { products } from '@/data/products';
import { siteConfig } from '@/lib/seo';

const staticRoutes = [
  '',
  '/about',
  '/career',
  '/contact',
  '/divisions',
  '/news',
  '/partners',
  '/products',
  '/service-network',
  '/team',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = [
    ...staticRoutes,
    ...divisions.map((division) => `/divisions/${division.id}`),
    ...divisions.map((division) => `/divisions/${division.id}/categories`),
    ...products.map((product) => `/products/${product.id}`),
    ...partners.map((partner) => `/partners/${partner.id}`),
    ...newsArticles.map((article) => `/news/${article.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/products') ? 0.8 : 0.7,
  }));
}
