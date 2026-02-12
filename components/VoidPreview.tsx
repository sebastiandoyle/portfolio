'use client';

import { motion } from 'framer-motion';

export default function VoidPreview() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outermost glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.15, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Core orb */}
      <motion.div
        className="absolute inset-8 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.3), transparent)',
          boxShadow:
            '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15), inset 0 0 20px rgba(139, 92, 246, 0.2)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15), inset 0 0 20px rgba(139, 92, 246, 0.2)',
            '0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.3)',
            '0 0 40px rgba(139, 92, 246, 0.3), 0 0 80px rgba(59, 130, 246, 0.15), inset 0 0 20px rgba(139, 92, 246, 0.2)',
          ],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center bright spot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 8,
          height: 8,
          top: '50%',
          left: '50%',
          marginTop: -4,
          marginLeft: -4,
          background: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
