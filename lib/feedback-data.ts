// Feedback Loop — data layer
// Mock data for the live feedback system

export interface FeedbackPrompt {
  id: string;
  text: string;
  votes: number;
  implemented?: boolean;
}

export interface ImplementedChange {
  number: 1 | 2 | 3;
  promptId: string;
  promptText: string;
  votes: number;
  title: string;
  description: string;
  before: string;
  after: string;
}

export const VOTE_THRESHOLD = 50;

export const FEEDBACK_PROMPTS: FeedbackPrompt[] = [
  { id: 'show-process', text: 'Show me how you actually build things', votes: 87, implemented: true },
  { id: 'contact-cta', text: 'Make the contact CTA harder to miss', votes: 64, implemented: true },
  { id: 'lead-with-problem', text: 'Lead with the problem you solved, not the tech', votes: 51, implemented: true },
  { id: 'show-failures', text: 'Show a project that failed and what you learned', votes: 44 },
  { id: 'more-metrics', text: 'Add real metrics — downloads, revenue, retention', votes: 39 },
  { id: 'video-walkthrough', text: 'Add a 60-second video walkthrough of a build', votes: 35 },
  { id: 'testimonials', text: 'Include testimonials or references', votes: 31 },
  { id: 'dark-light-toggle', text: 'Add a light mode toggle', votes: 28 },
  { id: 'blog-posts', text: 'Write about your AI workflow in blog form', votes: 24 },
  { id: 'live-demo', text: 'Embed a live demo I can interact with', votes: 21 },
  { id: 'timeline', text: 'Show a timeline of what you built and when', votes: 18 },
  { id: 'code-snippets', text: 'Show real code, not just descriptions', votes: 15 },
  { id: 'comparison', text: 'Compare your approach to traditional development', votes: 13 },
  { id: 'mobile-app', text: 'Make this a PWA I can install', votes: 11 },
  { id: 'accessibility', text: 'Improve keyboard navigation and screen reader support', votes: 9 },
  { id: 'animations', text: 'Add more subtle animations and transitions', votes: 7 },
  { id: 'search', text: 'Add search across projects and case studies', votes: 5 },
  { id: 'rss', text: 'Add an RSS feed for updates', votes: 3 },
  { id: 'resume-pdf', text: 'Make the resume interactive instead of a PDF', votes: 2 },
  { id: 'newsletter', text: 'Start a newsletter about AI-native development', votes: 1 },
];

export const IMPLEMENTED_CHANGES: ImplementedChange[] = [
  {
    number: 1,
    promptId: 'show-process',
    promptText: 'Show me how you actually build things',
    votes: 87,
    title: 'Added "How I work" process line',
    description: 'Visitors wanted to see the actual workflow, not just the outputs. Added a one-liner under the hero tagline showing the build pipeline.',
    before: 'Hero section showed tagline only — no indication of process or tools.',
    after: 'One-liner below tagline: "ChatGPT for thinking → Claude Code for building → Test with real users → Ship"',
  },
  {
    number: 2,
    promptId: 'contact-cta',
    promptText: 'Make the contact CTA harder to miss',
    votes: 64,
    title: 'Added "Let\'s Talk" section',
    description: 'The only contact links were buried in the footer. Added a dedicated CTA section with email and LinkedIn between About and Footer.',
    before: 'Contact links only in footer — easy to miss, no clear invitation to connect.',
    after: 'Dedicated "Let\'s talk" section with prominent email and LinkedIn buttons.',
  },
  {
    number: 3,
    promptId: 'lead-with-problem',
    promptText: 'Lead with the problem you solved, not the tech',
    votes: 51,
    title: 'Reframed Narrative Assembly subtitle',
    description: 'The case study card led with the process ("AI-accelerated design thinking") instead of the problem it solved. Rewritten to lead with impact.',
    before: 'From idea to tested product in 7 days using AI-accelerated design thinking',
    after: 'Making media manipulation visible — from idea to tested product in 7 days',
  },
];

export function getTopPrompts(prompts: FeedbackPrompt[], count: number): FeedbackPrompt[] {
  return prompts
    .filter((p) => !p.implemented)
    .sort((a, b) => b.votes - a.votes)
    .slice(0, count);
}
