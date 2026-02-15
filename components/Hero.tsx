'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { HERO_COPY, PAIN_POINTS } from '@/lib/brand';

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PAIN_POINTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const point = PAIN_POINTS[index];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        {/* Pain point cycling — subtle crossfade */}
        <div className="relative h-6 mb-10">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="absolute inset-0 text-sm text-[#71717a]"
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

        {/* Subtitle label */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#71717a] mb-4 font-medium">
          {HERO_COPY.subtitle}
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fafafa]">
          Sebastian Doyle
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mt-6 text-[#a1a1aa]">
          {HERO_COPY.tagline}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#case-studies"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#3b82f6] transition-colors duration-200"
          >
            Case Studies
          </a>
          <a
            href="https://github.com/sebastiandoyle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#3b82f6] hover:text-[#fafafa] transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
