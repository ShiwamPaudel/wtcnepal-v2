import type { Metadata } from 'next';
import { DivisionDetailPage } from '@/components/DivisionDetailPage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Disinfection and Sterilization Equipment in Nepal',
  description:
    'Explore WTC Nepal disinfection solutions for sterilization, infection control, medical waste treatment, validation support, and hospital hygiene workflows.',
  path: '/divisions/disinfection',
});

export const dynamic = 'force-dynamic';

export default function DisinfectionPage() {
  return <DivisionDetailPage divisionId="disinfection" />;
}
