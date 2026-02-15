'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export default function StatCard({ value, label, suffix = '', prefix = '' }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <div ref={ref} className="text-center py-4">
      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#fafafa]">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-[#71717a]">
        {label}
      </div>
    </div>
  );
}
