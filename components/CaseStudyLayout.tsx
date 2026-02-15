'use client';

import StarField from './StarField';
import ThemeSwitcher from './ThemeSwitcher';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <StarField />
      <ThemeSwitcher />

      {/* Back link */}
      <nav className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
            color: 'var(--muted)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </a>
      </nav>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24">
        {children}
      </div>

      {/* Footer */}
      <footer
        className="relative z-10 py-12 px-6 border-t"
        style={{ borderColor: 'rgba(var(--primary-rgb), 0.08)' }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="/"
            className="text-xs hover:underline"
            style={{ color: 'var(--muted)' }}
          >
            &larr; Back to portfolio
          </a>
          <p className="text-xs" style={{ color: 'var(--muted-faint)' }}>
            &copy; {new Date().getFullYear()} Sebastian Doyle
          </p>
        </div>
      </footer>
    </main>
  );
}
