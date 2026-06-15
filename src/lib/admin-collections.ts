import { BriefcaseBusiness, FileText, ImageIcon, Images, Newspaper, Package, Users } from 'lucide-react';
import type { CmsCollection } from '@/lib/cms';

export const adminCollections: Record<
  CmsCollection,
  {
    label: string;
    singular: string;
    description: string;
    icon: typeof Package;
    publicPath: string;
  }
> = {
  products: {
    label: 'Products',
    singular: 'Product',
    description: 'Catalogue entries displayed across product, partner, division, and homepage sections.',
    icon: Package,
    publicPath: '/products',
  },
  news: {
    label: 'News and Events',
    singular: 'Article',
    description: 'Published updates, events, announcements, and editorial content.',
    icon: Newspaper,
    publicPath: '/news-and-events',
  },
  team: {
    label: 'Team',
    singular: 'Team member',
    description: 'People profiles shown on the public team page.',
    icon: Users,
    publicPath: '/team',
  },
  jobs: {
    label: 'Careers',
    singular: 'Job opening',
    description: 'Career posts shown on the public career page with application forms.',
    icon: BriefcaseBusiness,
    publicPath: '/career',
  },
  'home-banners': {
    label: 'Home Banners',
    singular: 'Home banner',
    description: 'Hero banner images shown on the landing page. Add multiple banners for the homepage carousel.',
    icon: Images,
    publicPath: '/',
  },
  'page-assets': {
    label: 'Page Assets',
    singular: 'Page asset',
    description: 'One-off page images such as the team hero photo.',
    icon: ImageIcon,
    publicPath: '/team',
  },
  'about-page': {
    label: 'About Page',
    singular: 'About page content',
    description: 'Mission, vision, goals, and director message shown on the about page.',
    icon: FileText,
    publicPath: '/about',
  },
};

export function isCmsCollection(value: string): value is CmsCollection {
  return (
    value === 'products' ||
    value === 'news' ||
    value === 'team' ||
    value === 'jobs' ||
    value === 'home-banners' ||
    value === 'page-assets' ||
    value === 'about-page'
  );
}

export function emptyCmsItem(collection: CmsCollection) {
  if (collection === 'products') {
    return {
      id: '',
      name: '',
      division: 'diagnostics',
      partner: '',
      description: '',
      image: '',
      images: [],
      brochure: '',
      featured: false,
      published: true,
    };
  }

  if (collection === 'news') {
    return {
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().slice(0, 10),
      readingTime: 4,
      division: 'general',
      image: '',
      author: 'WTC Nepal Editorial Team',
      published: true,
    };
  }

  if (collection === 'team') {
    return {
      id: '',
      sortOrder: 0,
      name: '',
      title: '',
      bio: '',
      email: '',
      image: '',
      published: true,
    };
  }

  if (collection === 'home-banners') {
    return {
      id: '',
      title: '',
      image: '',
      alt: '',
      sortOrder: 0,
      published: true,
    };
  }

  if (collection === 'page-assets') {
    return {
      id: 'team-hero',
      title: 'Team hero photo',
      image: '',
      alt: 'WTC Nepal team',
      published: true,
    };
  }

  if (collection === 'about-page') {
    return {
      id: 'about-page',
      missionTitle: 'Raise equipment reliability',
      mission: '',
      visionTitle: "Be Nepal's trusted partner",
      vision: '',
      goalsTitle: 'Deliver measurable support',
      goals: '',
      directorName: '',
      directorTitle: '',
      directorMessage: '',
      directorImage: '',
      directorImageAlt: 'WTC Nepal director',
      published: true,
    };
  }

  return {
    id: '',
    title: '',
    department: '',
    location: 'Kathmandu',
    type: 'Full-time',
    summary: '',
    responsibilities: [],
    requirements: [],
    published: true,
  };
}
