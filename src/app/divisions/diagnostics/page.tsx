import type { Metadata } from 'next';
import { DivisionDetailPage } from '@/components/DivisionDetailPage';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: 'Diagnostics Equipment and IVD Solutions in Nepal',
  description:
    'Explore WTC Nepal diagnostics solutions including IVD analyzers, laboratory equipment, point-of-care testing, reagents, training, and service support.',
  path: '/divisions/diagnostics',
});

export default function DiagnosticsPage() {
  return <DivisionDetailPage divisionId="diagnostics" />;
}
