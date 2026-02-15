'use client';

import { motion } from 'framer-motion';
import { SHOWCASE_APPS } from '@/lib/app-data';

export default function AppIconWall() {
  return (
    <div className="mb-10">
      {/* Desktop: grid */}
      <div className="hidden sm:grid grid-cols-7 gap-4 justify-items-center">
        {SHOWCASE_APPS.map((app, i) => (
          <motion.div
            key={app.slug}
            className="flex flex-col items-center gap-1.5"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
          >
            <AppIcon app={app} />
          </motion.div>
        ))}
      </div>

      {/* Mobile: horizontally scrollable */}
      <div className="sm:hidden relative">
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-1">
          {SHOWCASE_APPS.map((app, i) => (
            <motion.div
              key={app.slug}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <AppIcon app={app} />
            </motion.div>
          ))}
        </div>
        {/* Fade edges */}
        <div
          className="absolute top-0 right-0 w-12 h-full pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(15,15,35,0.6), transparent)',
          }}
        />
      </div>
    </div>
  );
}

function AppIcon({ app }: { app: typeof SHOWCASE_APPS[number] }) {
  const inner = (
    <>
      <div
        className="w-14 h-14 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-lg"
        style={{
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span
        className="text-[10px] leading-tight text-center max-w-[56px] truncate"
        style={{ color: '#64748b' }}
      >
        {app.name}
      </span>
    </>
  );

  if (app.appStoreUrl) {
    return (
      <a
        href={app.appStoreUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center gap-1.5"
      >
        {inner}
      </a>
    );
  }

  return <div className="group flex flex-col items-center gap-1.5">{inner}</div>;
}
