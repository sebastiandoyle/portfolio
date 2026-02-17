'use client';

import { HERO_COPY } from '@/lib/brand';
import ChangeMarker from '@/components/ChangeMarker';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl">
        {/* Subtitle label */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#71717a] mb-4 font-medium">
          {HERO_COPY.subtitle}
        </p>

        {/* Name */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#fafafa]">
          Sebastian Doyle
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mt-6 text-[#a1a1aa]">
          {HERO_COPY.tagline}
        </p>

        {/* How I work — added via Feedback Loop change #1 */}
        {HERO_COPY.howIWork && (
          <div className="relative inline-block mt-4">
            <p className="text-sm text-[#71717a]">
              {HERO_COPY.howIWork}
            </p>
            <span className="absolute -top-2 -right-6">
              <ChangeMarker number={1} />
            </span>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href="#case-studies"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#1d4ed8] transition-colors duration-200"
          >
            Case Studies
          </a>
          <a
            href="/Sebastian_Doyle_Resume_2026.pdf"
            download
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#1d4ed8] hover:text-[#fafafa] transition-colors duration-200"
          >
            Resume
          </a>
          <a
            href="https://github.com/sebastiandoyle"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#1d4ed8] hover:text-[#fafafa] transition-colors duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
