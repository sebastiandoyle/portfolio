'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xs uppercase tracking-[0.3em] font-medium mb-3" style={{ color: 'var(--primary-light)' }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-2xl md:text-3xl font-semibold max-w-2xl leading-snug" style={{ color: 'var(--foreground)' }}>
          {subtitle}
        </p>
      )}
      <motion.div
        className="h-px w-16 mt-6"
        style={{ backgroundColor: 'var(--primary)' }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </motion.div>
  );
}
