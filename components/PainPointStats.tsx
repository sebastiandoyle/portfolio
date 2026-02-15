'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAIN_POINTS, type PainPoint } from '@/lib/brand';

export default function PainPointStats() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_POINTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const point: PainPoint = PAIN_POINTS[index];

  return (
    <div className="relative h-24 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: 'var(--primary-light)' }}
            >
              {point.stat}
            </span>
            <span
              className="text-sm max-w-xs"
              style={{ color: 'var(--muted-strong)' }}
            >
              {point.description}
            </span>
          </div>
          <span
            className="text-xs uppercase tracking-widest"
            style={{ color: 'var(--muted-dim)' }}
          >
            {point.source}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-0 flex gap-2">
        {PAIN_POINTS.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                i === index
                  ? 'var(--primary-light)'
                  : 'rgba(var(--primary-rgb), 0.2)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
