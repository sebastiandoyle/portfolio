import type { Metadata } from 'next';
import NarrativeAssemblyContent from './content';

export const metadata: Metadata = {
  title: 'Narrative Assembly — Case Study | Sebastian Doyle',
  description:
    'From idea to tested product in 7 days using AI-accelerated design thinking. A case study in rapid prototyping with real user testing.',
};

export default function NarrativeAssemblyPage() {
  return <NarrativeAssemblyContent />;
}
