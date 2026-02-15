import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume — Sebastian Doyle',
  description: 'Sebastian Doyle — AI Systems Engineer. Resume and professional background.',
};

export default function ResumePage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 bg-[#09090b] text-[#fafafa]">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Resume</h1>
        <p className="text-sm mb-6 text-[#71717a]">
          Coming soon.
        </p>
        <a
          href="/"
          className="text-sm font-medium px-5 py-2.5 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46] transition-colors duration-200"
        >
          &larr; Back to portfolio
        </a>
      </div>
    </main>
  );
}
