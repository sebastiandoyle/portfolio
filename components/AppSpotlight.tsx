'use client';

import { FEATURED_APP } from '@/lib/app-data';

export default function AppSpotlight() {
  const app = FEATURED_APP;

  return (
    <div className="rounded-lg border border-[#27272a] bg-[#18181b] p-6">
      <p className="text-xs uppercase tracking-wider text-[#71717a] mb-5">
        Featured App
      </p>

      <div className="flex items-center gap-4 mb-4">
        <img
          src={app.icon}
          alt={app.name}
          className="w-14 h-14 rounded-xl"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
        />
        <div>
          <h4 className="text-lg font-semibold text-[#fafafa]">{app.name}</h4>
          <p className="text-xs text-[#71717a]">{app.category}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6 my-4">
        {app.stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-base font-semibold text-[#fafafa]">{stat.value}</div>
            <div className="text-xs text-[#52525b]">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-[#a1a1aa] mb-4">
        {app.description}
      </p>

      {app.appStoreUrl && (
        <a
          href={app.appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#3b82f6] hover:text-[#60a5fa] transition-colors"
        >
          View on App Store
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );
}
