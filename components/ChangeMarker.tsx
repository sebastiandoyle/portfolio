'use client';

import { motion } from 'framer-motion';

interface ChangeMarkerProps {
  number: 1 | 2 | 3;
}

export default function ChangeMarker({ number }: ChangeMarkerProps) {
  return (
    <motion.a
      href={`/case-studies/feedback-loop#change-${number}`}
      className="relative z-10 inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ef4444] text-white text-[10px] font-bold leading-none no-underline"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.3 }}
      title={`Change #${number} — driven by visitor feedback`}
    >
      {number}
      <span className="absolute inset-0 rounded-full bg-[#ef4444] animate-ping opacity-20" />
    </motion.a>
  );
}
