'use client';

interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <div className="text-center py-4">
      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa]">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-[#71717a]">
        {label}
      </div>
    </div>
  );
}
