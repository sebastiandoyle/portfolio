'use client';

import { motion } from 'framer-motion';
import PainPointStats from './PainPointStats';
import { HERO_COPY } from '@/lib/brand';

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Pain point cycling */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <PainPointStats />
        </motion.div>

        {/* Name */}
        <h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          style={{ color: 'var(--foreground)' }}
        >
          Sebastian
          <br />
          <span
            style={{
              background:
                'linear-gradient(135deg, var(--primary), var(--secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Doyle
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-xs uppercase tracking-[0.4em] mt-6 mb-4 font-medium"
          style={{ color: 'var(--muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {HERO_COPY.subtitle}
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          style={{ color: 'var(--muted-strong)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {HERO_COPY.tagline}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="/case-studies/narrative-assembly"
            className="text-sm font-medium px-6 py-3 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
              borderColor: 'rgba(var(--primary-rgb), 0.3)',
              color: 'var(--primary-light)',
            }}
          >
            {HERO_COPY.cta_primary}
          </a>
          <a
            href="https://github.com/sebastiandoyle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              borderColor: 'rgba(var(--secondary-rgb), 0.3)',
              color: 'var(--btn-secondary-color)',
              backgroundColor: 'rgba(var(--secondary-rgb), 0.08)',
            }}
          >
            {HERO_COPY.cta_secondary}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--muted-faint)' }}
        >
          Scroll
        </span>
        <motion.div
          className="w-px h-8"
          style={{ backgroundColor: 'rgba(var(--primary-rgb), 0.4)' }}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
