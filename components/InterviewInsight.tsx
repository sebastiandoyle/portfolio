'use client';

import { motion } from 'framer-motion';

interface InterviewInsightProps {
  id: number;
  quote: string;
  context: string;
  implication: string;
  fix: string;
}

export default function InterviewInsight({
  id,
  quote,
  context,
  implication,
  fix,
}: InterviewInsightProps) {
  return (
    <motion.div
      className="rounded-2xl border p-6 md:p-8 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--card-border)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {/* Finding number badge */}
      <div
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
        style={{
          backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
          color: 'var(--primary-light)',
          border: '1px solid rgba(var(--primary-rgb), 0.25)',
        }}
      >
        {id}
      </div>

      {/* Quote */}
      <div className="mb-4">
        <svg
          className="w-6 h-6 mb-2 opacity-30"
          fill="var(--primary-light)"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
        <p
          className="text-lg md:text-xl font-medium italic leading-relaxed"
          style={{ color: 'var(--foreground)' }}
        >
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Context */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: 'var(--muted)' }}
      >
        {context}
      </p>

      {/* Implication */}
      <div
        className="rounded-lg p-4 mb-3"
        style={{
          backgroundColor: 'rgba(var(--primary-rgb), 0.05)',
          border: '1px solid rgba(var(--primary-rgb), 0.1)',
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--primary-light)' }}>
          Implication
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-strong)' }}>
          {implication}
        </p>
      </div>

      {/* Fix */}
      <div
        className="rounded-lg p-4"
        style={{
          backgroundColor: 'rgba(var(--secondary-rgb), 0.05)',
          border: '1px solid rgba(var(--secondary-rgb), 0.1)',
        }}
      >
        <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--accent)' }}>
          Fix Applied
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-strong)' }}>
          {fix}
        </p>
      </div>
    </motion.div>
  );
}
