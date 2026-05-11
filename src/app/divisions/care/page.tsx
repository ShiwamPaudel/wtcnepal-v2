import type { Metadata } from 'next';
import { DivisionDetailPage } from '@/components/DivisionDetailPage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Care, Dermatology, Aesthetic and Critical Care Equipment',
  description:
    'Explore WTC Nepal care solutions including dermatology lasers, aesthetic platforms, ICU monitors, ventilators, pumps, and clinical support.',
  path: '/divisions/care',
});

export default function CarePage() {
  return <DivisionDetailPage divisionId="care" />;
}
