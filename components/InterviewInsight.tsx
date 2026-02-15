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
      className="border-l-2 border-[#3b82f6] pl-6 py-2"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      {/* Finding badge */}
      <span className="text-xs text-[#71717a] mb-3 block">Finding {id}</span>

      {/* Quote */}
      <p className="text-base leading-relaxed text-[#fafafa] mb-3">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Context */}
      <p className="text-sm leading-relaxed text-[#71717a] mb-4">
        {context}
      </p>

      {/* Implication */}
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wider text-[#a1a1aa] mb-1">Implication</p>
        <p className="text-sm leading-relaxed text-[#a1a1aa]">{implication}</p>
      </div>

      {/* Fix */}
      <div>
        <p className="text-xs uppercase tracking-wider text-[#3b82f6] mb-1">Fix Applied</p>
        <p className="text-sm leading-relaxed text-[#a1a1aa]">{fix}</p>
      </div>
    </motion.div>
  );
}
