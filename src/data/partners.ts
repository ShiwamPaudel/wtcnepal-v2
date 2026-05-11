import partnersContent from '@/content/partners.json';

export type Division = 'diagnostics' | 'disinfection' | 'care';

export interface Partner {
  id: string;
  name: string;
  country: string;
  image: string;
  division: Division;
  description: string;
  website: string;
}

export const partners = partnersContent.partners as Partner[];

export function getPartnerById(id: string): Partner | undefined {
  return partners.find((partner) => partner.id === id);
}
