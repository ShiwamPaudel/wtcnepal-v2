import teamContent from '@/content/team.json';

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  email: string;
}

export const team = teamContent.team as TeamMember[];
