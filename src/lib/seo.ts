import type { Metadata } from 'next';

export const siteConfig = {
  name: 'WTC Nepal',
  legalName: 'Web Trading Concern Pvt. Ltd.',
  description:
    "WTC Nepal supplies, installs, and services diagnostics, disinfection, and care medical equipment for healthcare providers across Nepal.",
  url: 'https://wtcnepal.com',
  ogImage: 'https://wtcnepal.com/images/logo.png',
  keywords: [
    'WTC Nepal',
    'medical equipment Nepal',
    'diagnostics equipment Nepal',
    'hospital equipment supplier Nepal',
    'medical equipment service Nepal',
    'disinfection equipment Nepal',
    'critical care equipment Nepal',
  ],
  links: {
    facebook: 'https://facebook.com/wtcnepal',
    linkedin: 'https://linkedin.com/company/wtcnepal',
  },
};

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  path: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = ''): string {
  if (path.startsWith('http')) return path;
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  path,
  noIndex = false,
}: SeoProps): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: '%s | WTC Nepal',
    },
    description,
    keywords: siteConfig.keywords,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
    creator: siteConfig.legalName,
    publisher: siteConfig.legalName,
    category: 'Healthcare technology',
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
      locale: 'en_NP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
