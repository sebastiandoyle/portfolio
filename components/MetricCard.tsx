'use client';

import { motion } from 'framer-motion';

interface MetricCardProps {
  value: string;
  label: string;
}

export default function MetricCard({ value, label }: MetricCardProps) {
  return (
    <motion.div
      className="rounded-2xl border p-6 text-center"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        borderColor: 'rgba(var(--primary-rgb), 0.4)',
        boxShadow: '0 0 40px rgba(var(--primary-rgb), 0.1)',
      }}
    >
      <div
        className="text-4xl sm:text-5xl font-bold tracking-tight"
        style={{ color: 'var(--primary-light)' }}
      >
        {value}
      </div>
      <div
        className="mt-2 text-xs sm:text-sm uppercase tracking-widest"
        style={{ color: 'var(--muted)' }}
      >
        {label}
      </div>
    </motion.div>
  );
}
