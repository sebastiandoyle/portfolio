// Feedback Loop — case study content
// Following the pattern of case-study-content.ts

export interface Reflection {
  title: string;
  body: string;
}

export interface DataFlowStep {
  number: number;
  title: string;
  detail: string;
}

export interface ArchRow {
  component: string;
  tech: string;
  role: string;
}

// Section 1: Impact Banner
export const FEEDBACK_BANNER = {
  title: 'Feedback Loop',
  subtitle:
    'A live feedback system that lets visitors shape the portfolio they\'re looking at — structured prompts, ranked by votes, implemented in real time.',
  metrics: [
    { value: '20', label: 'Prompt Pool' },
    { value: '3', label: 'Changes Shipped' },
    { value: 'Live', label: 'Status' },
  ],
};

// Section 2: The Problem
export const FEEDBACK_PROBLEM = {
  headline: 'The Problem',
  paragraphs: [
    'Portfolios are one-way broadcasts. You build what you think matters, visitors judge silently, and the gap between what you show and what they want to see stays invisible. Analytics tell you where people drop off. They don\'t tell you what would have kept them.',
    'Traditional contact forms and feedback widgets collect noise — open-ended text boxes produce everything from "looks cool" to spam. And most visitors won\'t type anything at all. The friction is too high and the signal is too low.',
  ],
};

// Section 3: The Approach
export const FEEDBACK_APPROACH = {
  headline: 'The Approach',
  paragraphs: [
    'Instead of asking "what do you think?", ask "which of these would you change?" — 20 specific, actionable prompts that visitors vote on with a single click. No text box, no account, no friction. Each prompt is a real change I\'d actually make.',
    'When a prompt crosses the vote threshold, it becomes a task. I implement the change, mark it with a red badge on the site, and it becomes part of the case study itself. The portfolio evolves in public, and the feedback system is simultaneously a feature, a case study, and proof of how I work.',
  ],
  blockquote:
    'The best feedback systems don\'t ask people what they want. They offer specific options and let the crowd rank them.',
};

// Section 4: How It Works (data flow)
export const FEEDBACK_DATA_FLOW: DataFlowStep[] = [
  {
    number: 1,
    title: 'See',
    detail: 'Visitor scrolls past case studies and hits the feedback widget — 3 rotating prompts shown as clickable pills.',
  },
  {
    number: 2,
    title: 'Click',
    detail: 'One click to vote. No sign-up, no text input. sessionStorage prevents double-voting in the same session.',
  },
  {
    number: 3,
    title: 'Store',
    detail: 'Vote count incremented via API route. In production, persisted to Vercel KV. Currently in-memory with mock data.',
  },
  {
    number: 4,
    title: 'Rank',
    detail: 'Prompts sorted by vote count. Top 3 non-implemented prompts rotate into the widget. Implemented prompts are retired from voting.',
  },
  {
    number: 5,
    title: 'Implement',
    detail: 'When a prompt crosses the threshold (50 votes), Claude Code implements the change. A red ChangeMarker badge appears on the site linking back to the changelog.',
  },
];

// Section 5: Architecture
export const FEEDBACK_ARCHITECTURE: ArchRow[] = [
  {
    component: 'Frontend Widget',
    tech: 'React + Framer Motion',
    role: 'Pill buttons with optimistic updates, skeleton loading, voted state tracking',
  },
  {
    component: 'Vote API',
    tech: 'Next.js API Routes',
    role: 'GET returns top 3 prompts, POST increments vote count',
  },
  {
    component: 'Storage',
    tech: 'In-memory Map (→ Vercel KV)',
    role: 'Vote persistence layer. Mock data pre-populated for demo.',
  },
  {
    component: 'Deduplication',
    tech: 'sessionStorage',
    role: 'Prevents double-voting within a browser session without requiring auth',
  },
  {
    component: 'Change Markers',
    tech: 'React + CSS',
    role: 'Red (#ef4444) circle badges linking implemented changes back to changelog',
  },
  {
    component: 'Automation (future)',
    tech: 'Claude Code + cron',
    role: 'Periodic threshold check → auto-implement → commit → deploy',
  },
];

// Section 6: Reflections
export const FEEDBACK_REFLECTIONS: Reflection[] = [
  {
    title: 'Constraints beat open-endedness',
    body: '20 specific prompts generate better signal than a blank text box ever could. Visitors don\'t have to think about what to say — they just react to options. The structured format means every vote is actionable.',
  },
  {
    title: 'The meta is the message',
    body: 'The feedback system is its own case study. It demonstrates exactly the kind of thinking the portfolio is trying to showcase — shipping fast, iterating based on real input, and building systems that evolve. The medium is the proof.',
  },
  {
    title: 'Red as a signal, not a theme',
    body: 'The portfolio is deliberately black, white, and blue. Red appears only on implemented changes — it\'s a signal that something here was driven by visitor feedback. That constraint makes every red badge meaningful.',
  },
];
