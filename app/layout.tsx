import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sebastian Doyle — AI Systems Engineer',
  description:
    "I close the gap between 'we should use AI' and 'it's in production.' Portfolio, case studies, and projects.",
  openGraph: {
    title: 'Sebastian Doyle — AI Systems Engineer',
    description:
      "I close the gap between 'we should use AI' and 'it's in production.'",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
