'use client';

import { motion } from 'framer-motion';
import { FEATURED_APP } from '@/lib/app-data';
import PhoneMockup from './PhoneMockup';

export default function AppSpotlight() {
  const app = FEATURED_APP;

  return (
    <motion.div
      className="rounded-2xl border p-6 md:p-8 mb-10"
      style={{
        backgroundColor: 'var(--card-bg-alpha)',
        borderColor: 'rgba(var(--primary-rgb), 0.1)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: 'var(--muted)' }}
      >
        Featured App
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        {/* Left: info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={app.icon}
              alt={app.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl"
              style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
            />
            <div>
              <h4 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
                {app.name}
              </h4>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                {app.category}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                <span
                  className="inline-flex items-center gap-1 text-[10px] sm:text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#4ade80',
                    border: '1px solid rgba(34, 197, 94, 0.2)',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Live on App Store
                </span>
                <span className="text-[10px] sm:text-xs" style={{ color: 'var(--muted-dim)' }}>
                  {app.version}
                </span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-6 my-5">
            {app.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-lg font-semibold" style={{ color: 'var(--primary-light)' }}>
                  {stat.value}
                </div>
                <div className="text-xs" style={{ color: 'var(--muted-dim)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted-strong)' }}>
            {app.description}
          </p>

          {app.appStoreUrl && (
            <a
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
              style={{
                borderColor: 'rgba(var(--primary-rgb), 0.3)',
                color: 'var(--primary-light)',
                backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
              }}
            >
              View on App Store
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Right: screenshots */}
        {app.screenshots && app.screenshots.length >= 2 && (
          <div className="flex items-center justify-center flex-shrink-0">
            <PhoneMockup
              src={app.screenshots[0]}
              alt={`${app.name} screenshot 1`}
              width={120}
              tilt={-3}
              className="sm:w-auto"
            />
            <PhoneMockup
              src={app.screenshots[1]}
              alt={`${app.name} screenshot 2`}
              width={120}
              tilt={3}
              className="-ml-4 mt-6 sm:w-auto"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
