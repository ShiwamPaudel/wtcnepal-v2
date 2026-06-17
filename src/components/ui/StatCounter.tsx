interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export function StatCounter({ end, suffix = '', prefix = '', label }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[var(--color-primary)] mb-2">
        {prefix}{end}{suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">
        {label}
      </div>
    </div>
  );
}
