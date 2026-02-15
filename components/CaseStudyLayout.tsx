'use client';

interface CaseStudyLayoutProps {
  children: React.ReactNode;
}

export default function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return (
    <main className="relative min-h-screen bg-[#09090b]">
      {/* Back link */}
      <nav className="fixed top-6 left-6 z-50">
        <a
          href="/"
          className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border border-[#27272a] bg-[#18181b]/80 text-[#a1a1aa] backdrop-blur-sm hover:border-[#3f3f46] transition-colors duration-200"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
          Back
        </a>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        {children}
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#27272a]">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="/" className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors">
            &larr; Back to portfolio
          </a>
          <p className="text-xs text-[#52525b]">
            &copy; {new Date().getFullYear()} Sebastian Doyle
          </p>
        </div>
      </footer>
    </main>
  );
}
