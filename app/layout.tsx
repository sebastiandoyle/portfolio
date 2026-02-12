import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Sebastian Doyle - Product Engineer',
  description:
    'Product-minded engineer who automates everything. Builder of Foundry, an autonomous iOS app pipeline.',
  openGraph: {
    title: 'Sebastian Doyle',
    description: 'Product-minded engineer who automates everything.',
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
