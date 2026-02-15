'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

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

          const duration = 1800;
          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
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
    <motion.div
      ref={ref}
      className="group relative rounded-2xl border p-3 sm:p-8 text-center transition-all duration-300 overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      whileHover={{
        borderColor: 'rgba(var(--primary-rgb), 0.4)',
        boxShadow: '0 0 40px rgba(var(--primary-rgb), 0.1)',
      }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(var(--primary-rgb), 0.06), transparent 70%)',
        }}
      />

      <div
        className="text-xl sm:text-5xl font-bold tracking-tight"
        style={{ color: 'var(--primary-light)' }}
      >
        {prefix}{count.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-1.5 sm:mt-3 text-[9px] sm:text-sm uppercase tracking-wider sm:tracking-widest leading-tight" style={{ color: 'var(--muted)' }}>
        {label}
      </div>
    </motion.div>
  );
}
