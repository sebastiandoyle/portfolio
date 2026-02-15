'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  { id: 'cosmos', label: 'Cosmos', color: '#8B5CF6' },
  { id: 'cloud-dancer', label: 'Cloud Dancer', color: '#F0EDE5' },
  { id: 'midnight', label: 'Midnight', color: '#00D4FF' },
  { id: 'ember', label: 'Ember', color: '#E8772E' },
];

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('cosmos');

  const switchTheme = (id: string) => {
    setActive(id);
    document.documentElement.setAttribute('data-theme', id);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute bottom-14 right-0 flex flex-col gap-2 p-3 rounded-xl border"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderColor: 'var(--card-border)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => switchTheme(theme.id)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-80 whitespace-nowrap"
                style={{
                  color: active === theme.id ? 'var(--primary-light)' : 'var(--muted)',
                  backgroundColor: active === theme.id ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                }}
              >
                <span
                  className="w-4 h-4 rounded-full border"
                  style={{
                    backgroundColor: theme.color,
                    borderColor: theme.id === 'cloud-dancer' ? '#ccc' : theme.color,
                  }}
                />
                {theme.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
        }}
        title="Switch theme"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      </button>
    </div>
  );
}
