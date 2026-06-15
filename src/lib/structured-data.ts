import type { NewsArticle } from '@/data/news';
import type { Product } from '@/data/products';
import { getDivisionLabel } from '@/lib/content';
import { absoluteUrl, siteConfig } from '@/lib/seo';

export const SITE_URL = siteConfig.url;

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${siteConfig.name} - ${siteConfig.legalName}`,
    alternateName: siteConfig.name,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo.png'),
    foundingDate: '2001',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kumari Marga, Tripureshwor',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati Province',
      addressCountry: 'NP',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-01-5362654',
      contactType: 'customer service',
      areaServed: 'NP',
      availableLanguage: ['English', 'Nepali'],
    },
    sameAs: [siteConfig.links.linkedin, siteConfig.links.facebook],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'WTC Nepal Kathmandu Office',
    image: absoluteUrl('/images/logo.png'),
    '@id': `${SITE_URL}/#headquarters`,
    url: SITE_URL,
    telephone: '+977-01-5362654',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kumari Marga, Tripureshwor',
      addressLocality: 'Kathmandu',
      addressRegion: 'Bagmati Province',
      addressCountry: 'NP',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
    ],
  };
}

export function getProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image ? absoluteUrl(product.image) : absoluteUrl('/images/logo.png'),
    brand: {
      '@type': 'Brand',
      name: product.partner,
    },
    category: `${getDivisionLabel(product.division)} medical equipment`,
    url: absoluteUrl(`/products/${product.id}`),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'NPR',
      seller: {
        '@type': 'Organization',
        name: siteConfig.legalName,
      },
    },
  };
}

export function getArticleSchema(article: NewsArticle) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: article.image ? [absoluteUrl(article.image)] : [absoluteUrl('/images/logo.png')],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/images/logo.png'),
      },
    },
    mainEntityOfPage: absoluteUrl(`/news-and-events/${article.slug}`),
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.item),
    })),
  };
}
