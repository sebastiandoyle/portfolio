import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume — Sebastian Doyle',
  description: 'Sebastian Doyle — AI Systems Engineer. Resume and professional background.',
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 bg-[#09090b] text-[#fafafa]">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Resume</h1>
        <p className="text-sm mb-8 text-[#71717a]">
          Sebastian Doyle — AI Systems Engineer
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/Sebastian_Doyle_Resume_2026.pdf"
            download
            className="text-sm font-medium px-6 py-2.5 rounded-lg bg-[#fafafa] text-[#09090b] hover:bg-[#e4e4e7] transition-colors duration-200"
          >
            Download PDF
          </a>
          <a
            href="/Sebastian_Doyle_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-2.5 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46] transition-colors duration-200"
          >
            View in browser
          </a>
        </div>
        <a
          href="/"
          className="inline-block mt-8 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors duration-200"
        >
          &larr; Back to portfolio
        </a>
      </div>
    </main>
  );
}
