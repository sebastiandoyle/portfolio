'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Phase {
  id: string;
  name: string;
  description: string;
  tasks: string;
  icon: string;
}

const phases: Phase[] = [
  {
    id: '0',
    name: 'Collision Check',
    description: 'Market research & name validation',
    tasks: '2 tasks',
    icon: '\u{1F50D}',
  },
  {
    id: 'A',
    name: 'Build & Prep',
    description: 'Xcode project, SwiftUI, icons',
    tasks: '6 tasks',
    icon: '\u{1F528}',
  },
  {
    id: 'B',
    name: 'ASC Setup',
    description: 'Screenshots, metadata, upload',
    tasks: '6 tasks',
    icon: '\u{1F680}',
  },
  {
    id: 'C',
    name: 'Submit',
    description: 'Review & submission',
    tasks: '3 tasks',
    icon: '\u{2705}',
  },
];

export default function PipelineViz() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          phases.forEach((_, i) => {
            setTimeout(() => setActiveIndex(i), 400 * (i + 1));
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div ref={ref} className="w-full py-8">
      {/* Desktop view - horizontal */}
      <div className="hidden md:flex items-center justify-between gap-2">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex items-center flex-1">
            <motion.div
              className="flex-1 rounded-xl border p-5 text-center transition-all duration-500"
              style={{
                backgroundColor:
                  i <= activeIndex ? 'rgba(139, 92, 246, 0.08)' : 'var(--card-bg)',
                borderColor:
                  i <= activeIndex
                    ? 'rgba(139, 92, 246, 0.35)'
                    : 'var(--card-border)',
                boxShadow:
                  i <= activeIndex
                    ? '0 0 30px rgba(139, 92, 246, 0.08)'
                    : 'none',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={
                hasAnimated
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="text-2xl mb-2">{phase.icon}</div>
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#94a3b8' }}>
                Phase {phase.id}
              </div>
              <div className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>
                {phase.name}
              </div>
              <div className="text-xs mt-1" style={{ color: '#64748b' }}>
                {phase.description}
              </div>
              <div
                className="text-xs mt-2 font-mono"
                style={{
                  color: i <= activeIndex ? 'var(--primary-light)' : '#475569',
                }}
              >
                {phase.tasks}
              </div>
            </motion.div>

            {/* Connector line */}
            {i < phases.length - 1 && (
              <div className="w-8 flex items-center justify-center flex-shrink-0">
                <motion.div
                  className="h-px w-full"
                  style={{
                    backgroundColor:
                      i < activeIndex
                        ? 'rgba(139, 92, 246, 0.5)'
                        : 'rgba(139, 92, 246, 0.1)',
                  }}
                  initial={{ scaleX: 0 }}
                  animate={hasAnimated ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile view - vertical */}
      <div className="flex flex-col gap-3 md:hidden">
        {phases.map((phase, i) => (
          <div key={phase.id} className="flex items-start gap-4">
            {/* Vertical line + node */}
            <div className="flex flex-col items-center flex-shrink-0">
              <motion.div
                className="w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor:
                    i <= activeIndex ? 'var(--primary)' : 'transparent',
                  borderColor:
                    i <= activeIndex ? 'var(--primary)' : 'rgba(139, 92, 246, 0.2)',
                }}
                initial={{ scale: 0 }}
                animate={hasAnimated ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.3, delay: i * 0.2 }}
              />
              {i < phases.length - 1 && (
                <motion.div
                  className="w-px h-16"
                  style={{
                    backgroundColor:
                      i < activeIndex
                        ? 'rgba(139, 92, 246, 0.4)'
                        : 'rgba(139, 92, 246, 0.1)',
                  }}
                  initial={{ scaleY: 0 }}
                  animate={hasAnimated ? { scaleY: 1 } : { scaleY: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.2 + 0.15 }}
                  style-origin="top"
                />
              )}
            </div>

            {/* Phase card */}
            <motion.div
              className="flex-1 rounded-lg border p-4"
              style={{
                backgroundColor:
                  i <= activeIndex ? 'rgba(139, 92, 246, 0.06)' : 'var(--card-bg)',
                borderColor:
                  i <= activeIndex
                    ? 'rgba(139, 92, 246, 0.25)'
                    : 'var(--card-border)',
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={
                hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
              }
              transition={{ duration: 0.4, delay: i * 0.2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{phase.icon}</span>
                <span className="text-xs uppercase tracking-widest" style={{ color: '#94a3b8' }}>
                  Phase {phase.id}
                </span>
              </div>
              <div className="font-semibold text-sm">{phase.name}</div>
              <div className="text-xs mt-0.5" style={{ color: '#64748b' }}>
                {phase.description}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
