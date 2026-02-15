import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume — Sebastian Doyle',
  description: 'Sebastian Doyle — AI Systems Engineer. Resume and professional background.',
};

export default function ResumePage() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Resume</h1>
        <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
          Coming soon.
        </p>
        <a
          href="/"
          className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
          style={{
            borderColor: 'rgba(var(--primary-rgb), 0.3)',
            color: 'var(--primary-light)',
            backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
          }}
        >
          &larr; Back to portfolio
        </a>
      </div>
    </main>
  );
}
