'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PAIN_POINTS } from '@/lib/brand';

export default function PainPointStats() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_POINTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const point = PAIN_POINTS[index];

  return (
    <div className="relative h-6">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="absolute inset-0 text-sm text-[#71717a] text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {point.stat} {point.description}
          <span className="ml-2 text-xs text-[#52525b]">— {point.source}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
