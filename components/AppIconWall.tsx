'use client';

import { SHOWCASE_APPS } from '@/lib/app-data';

export default function AppIconWall() {
  return (
    <div className="grid grid-cols-7 gap-3 justify-items-center">
      {SHOWCASE_APPS.map((app) => {
        const inner = (
          <>
            <div className="w-12 h-12 rounded-xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              <img
                src={app.icon}
                alt={app.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] leading-tight text-center max-w-[48px] truncate text-[#52525b]">
              {app.name}
            </span>
          </>
        );

        if (app.appStoreUrl) {
          return (
            <a
              key={app.slug}
              href={app.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5"
            >
              {inner}
            </a>
          );
        }

        return (
          <div key={app.slug} className="flex flex-col items-center gap-1.5">
            {inner}
          </div>
        );
      })}
    </div>
  );
}
