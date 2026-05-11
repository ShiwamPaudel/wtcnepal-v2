import newsContent from '@/content/news.json';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: number;
  division: 'diagnostics' | 'disinfection' | 'care' | 'general';
  image: string;
  author: string;
}

export const newsArticles = newsContent.newsArticles as NewsArticle[];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}
