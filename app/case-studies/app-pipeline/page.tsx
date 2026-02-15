import type { Metadata } from 'next';
import AppPipelineContent from './content';

export const metadata: Metadata = {
  title: 'App Pipeline — Case Study | Sebastian Doyle',
  description:
    '25 apps shipped autonomously while sleeping. An autonomous pipeline that handles code generation, builds, screenshots, and App Store submission.',
};

export default function AppPipelinePage() {
  return <AppPipelineContent />;
}
