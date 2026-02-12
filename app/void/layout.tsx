import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Voice Void - Speak and Create',
  description:
    'An interactive demo where you speak into a dark void and components materialize from your words.',
};

export default function VoidLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
