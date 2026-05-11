import type { Division } from '@/data/divisions';
import { divisionTheme, getDivisionLabel } from '@/lib/content';

interface DivisionBadgeProps {
  division: Division;
  className?: string;
  size?: 'sm' | 'md';
}

export function DivisionBadge({ division, className = '', size = 'sm' }: DivisionBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm';

  return (
    <span
      className={`inline-flex rounded-full font-semibold ring-1 ${divisionTheme[division].badge} ${sizeClasses} ${className}`}
    >
      {getDivisionLabel(division)}
    </span>
  );
}
