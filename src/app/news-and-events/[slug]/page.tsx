import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import type { NewsArticle } from '@/data/news';
import { constructMetadata, siteConfig } from '@/lib/seo';
import { getArticleSchema, getBreadcrumbSchema } from '@/lib/structured-data';
import { getDivisionLabel } from '@/lib/content';
import { getPublishedArticleBySlug, getPublishedNewsArticles } from '@/lib/server-content';

type Props = {
  params: Promise<{ slug: string }>;
};

type ArticleBlock =
  | { type: 'paragraph'; text: string; key: string }
  | { type: 'image'; src: string; alt: string; caption?: string; key: string };

const inlineImagePattern = /^\[image:\s*([^|\]]+)(?:\|([^|\]]*))?(?:\|([^|\]]*))?\]$/i;

function parseContentImages(value?: string) {
  if (!value) return new Map<number, ArticleBlock[]>();

  const imagesByParagraph = new Map<number, ArticleBlock[]>();

  value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line, index) => {
      const [paragraphNumber, src, alt, caption] = line.split('|').map((part) => part.trim());
      const afterParagraph = Number(paragraphNumber);

      if (!afterParagraph || !src) return;

      const current = imagesByParagraph.get(afterParagraph) ?? [];
      current.push({
        type: 'image',
        src,
        alt: alt || 'Web Trading Concern Pvt. Ltd. news and events photo',
        caption,
        key: `cms-image-${afterParagraph}-${index}`,
      });
      imagesByParagraph.set(afterParagraph, current);
    });

  return imagesByParagraph;
}

function getArticleBlocks(article: NewsArticle): ArticleBlock[] {
  const blocks: ArticleBlock[] = [];
  const imagesByParagraph = parseContentImages(article.contentImages);
  let paragraphIndex = 0;

  article.content
    .split('\n\n')
    .map((block) => block.trim())
    .filter(Boolean)
    .forEach((block, index) => {
      const inlineImage = block.match(inlineImagePattern);

      if (inlineImage) {
        blocks.push({
          type: 'image',
          src: inlineImage[1].trim(),
          alt: inlineImage[2]?.trim() || 'Web Trading Concern Pvt. Ltd. news and events photo',
          caption: inlineImage[3]?.trim(),
          key: `inline-image-${index}`,
        });
        return;
      }

      paragraphIndex += 1;
      blocks.push({ type: 'paragraph', text: block, key: `paragraph-${paragraphIndex}` });
      blocks.push(...(imagesByParagraph.get(paragraphIndex) ?? []));
    });

  return blocks;
}

export async function generateStaticParams() {
  const newsArticles = await getPublishedNewsArticles();

  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    return constructMetadata({
      title: 'Article Not Found',
      description: 'The requested Web Trading Concern Pvt. Ltd. article could not be found.',
      path: `/news-and-events/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: article.title,
    description: article.excerpt,
    image: article.image || siteConfig.ogImage,
    path: `/news-and-events/${article.slug}`,
  });
}

export default async function NewsAndEventsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getPublishedArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const blocks = getArticleBlocks(article);
  const jsonLd = [
    getArticleSchema(article),
    getBreadcrumbSchema([
      { name: 'Home', item: '/' },
      { name: 'News and Events', item: '/news-and-events' },
      { name: article.title, item: `/news-and-events/${article.slug}` },
    ]),
  ];

  return (
    <main className="min-h-screen bg-white">
      <article>
        <section className="border-b border-slate-200 bg-slate-50 py-16">
          <div className="container-xl">
            <Link
              href="/news-and-events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-[var(--color-primary)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to news and events
            </Link>

            <div className="mt-8 max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.date}>{article.date}</time>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </span>
                {article.division !== 'general' && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--color-primary)] ring-1 ring-blue-100">
                    {getDivisionLabel(article.division)}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 md:text-5xl">
                {article.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-slate-600">{article.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-xl">
            <div className="mx-auto max-w-3xl">
              {blocks.map((block) => {
                if (block.type === 'image') {
                  return (
                    <figure key={block.key} className="my-10 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                      <div className="relative aspect-[16/10] bg-white">
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          sizes="(max-width: 768px) 92vw, 768px"
                          className="object-cover"
                          unoptimized={block.src.startsWith('/api/media/')}
                        />
                      </div>
                      {block.caption && (
                        <figcaption className="px-5 py-3 text-sm leading-6 text-slate-500">
                          {block.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                return (
                  <p key={block.key} className="mb-6 text-justify text-lg leading-8 text-slate-700">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
