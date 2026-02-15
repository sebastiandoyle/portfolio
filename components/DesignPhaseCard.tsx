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
      className="flex items-start gap-4 py-6 border-b border-[#27272a] last:border-b-0"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: phase * 0.05 }}
    >
      {/* Phase number */}
      <div className="w-8 h-8 rounded-full border border-[#27272a] flex items-center justify-center text-xs font-medium text-[#a1a1aa] shrink-0">
        {phase}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-[#fafafa] mb-1">
          {name}
        </h4>
        <p className="text-xs text-[#71717a] mb-2">{description}</p>
        <p className="text-sm leading-relaxed text-[#a1a1aa]">
          {detail}
        </p>
      </div>
    </motion.div>
  );
}
