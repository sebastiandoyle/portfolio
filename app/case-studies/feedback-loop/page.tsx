import type { Metadata } from 'next';
import FeedbackLoopContent from './content';

export const metadata: Metadata = {
  title: 'Feedback Loop — Case Study | Sebastian Doyle',
  description:
    'A live feedback system that lets visitors shape the portfolio they\'re looking at. Structured prompts, ranked by votes, implemented in real time.',
};

export default function FeedbackLoopPage() {
  return <FeedbackLoopContent />;
}
