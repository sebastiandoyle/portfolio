'use client';

import { motion } from 'framer-motion';
import type { ComponentMood } from '@/lib/void-store';

const moodColors: Record<ComponentMood, string> = {
  purple: 'rgba(139, 92, 246, 0.3)',
  blue: 'rgba(59, 130, 246, 0.3)',
  green: 'rgba(34, 197, 94, 0.3)',
  amber: 'rgba(245, 158, 11, 0.3)',
  rose: 'rgba(244, 63, 94, 0.3)',
  cyan: 'rgba(6, 182, 212, 0.3)',
};

const moodColorsSubtle: Record<ComponentMood, string> = {
  purple: 'rgba(139, 92, 246, 0.12)',
  blue: 'rgba(59, 130, 246, 0.12)',
  green: 'rgba(34, 197, 94, 0.12)',
  amber: 'rgba(245, 158, 11, 0.12)',
  rose: 'rgba(244, 63, 94, 0.12)',
  cyan: 'rgba(6, 182, 212, 0.12)',
};

interface ComponentShellProps {
  mood: ComponentMood;
  name: string;
  onRemove: () => void;
  children: React.ReactNode;
  layoutId?: string;
  readOnly?: boolean;
}

export default function ComponentShell({
  mood,
  name,
  onRemove,
  children,
  layoutId,
  readOnly,
}: ComponentShellProps) {
  return (
    <motion.div
      layout
      layoutId={layoutId}
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="relative rounded-xl overflow-hidden break-inside-avoid mb-4"
      style={{
        background: '#0F0F23',
        border: `1px solid ${moodColorsSubtle[mood]}`,
        boxShadow: `0 0 20px ${moodColors[mood]}10, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{
          borderBottom: `1px solid ${moodColorsSubtle[mood]}`,
          background: `linear-gradient(180deg, ${moodColors[mood]}08 0%, transparent 100%)`,
        }}
      >
        <span
          className="text-xs font-medium tracking-wide uppercase"
          style={{ color: moodColors[mood].replace('0.3', '0.7') }}
        >
          {name}
        </span>
        {!readOnly && (
          <button
            onClick={onRemove}
            className="w-6 h-6 flex items-center justify-center rounded-md transition-colors duration-200"
            style={{
              color: 'rgba(226, 232, 240, 0.3)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(244, 63, 94, 0.15)';
              e.currentTarget.style.color = 'rgba(244, 63, 94, 0.8)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(226, 232, 240, 0.3)';
            }}
            aria-label="Remove component"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2 2L10 10M10 2L2 10" />
            </svg>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">{children}</div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${moodColors[mood]}, transparent)`,
        }}
      />
    </motion.div>
  );
}
