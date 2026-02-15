'use client';

import { motion } from 'framer-motion';

interface DesignPhaseCardProps {
  phase: number;
  name: string;
  description: string;
  detail: string;
}

export default function DesignPhaseCard({
  phase,
  name,
  description,
  detail,
}: DesignPhaseCardProps) {
  return (
    <motion.div
      className="relative rounded-2xl border p-6 md:p-8"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: phase * 0.1 }}
    >
      <div className="flex items-start gap-4">
        {/* Phase number */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
          style={{
            background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
            color: 'var(--primary-light)',
            border: '1px solid rgba(var(--primary-rgb), 0.25)',
          }}
        >
          {phase}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="text-lg font-semibold mb-1"
            style={{ color: 'var(--foreground)' }}
          >
            {name}
          </h4>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-light)' }}
          >
            {description}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--muted)' }}
          >
            {detail}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
