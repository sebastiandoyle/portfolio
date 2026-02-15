// Brand messaging framework
// Single source of truth for all copy across the portfolio

export const POSITIONING =
  "I help you navigate AI adoption and ship products in a world where technology changes faster than your team can keep up.";

export interface PainPoint {
  stat: string;
  description: string;
  source: string;
}

export const PAIN_POINTS: PainPoint[] = [
  {
    stat: "68%",
    description:
      "of organizations report lack of AI talent as a high-impact challenge",
    source: "Deloitte",
  },
  {
    stat: "42%",
    description: "say AI adoption is 'tearing their company apart'",
    source: "McKinsey",
  },
  {
    stat: "8.6%",
    description: "have AI agents in production",
    source: "BCG",
  },
  {
    stat: "⅔",
    description:
      "are stuck in pilot stage — can't scale to production",
    source: "BCG",
  },
];

export const HERO_COPY = {
  subtitle: "AI Systems Engineer",
  tagline:
    "I close the gap between 'we should use AI' and 'it's in production.'",
  cta_primary: "See the case study",
  cta_secondary: "View GitHub",
} as const;

export const ABOUT_COPY = {
  paragraphs: [
    "Most companies know they should be using AI. Few know how to go from experiment to production. I close that gap — designing systems that turn AI capabilities into shipped products, not slide decks.",
    "My background is in Law and Economics, which means I think in systems: incentives, constraints, second-order effects. I don't study AI tools. I build with them. The pipeline that shipped 25 apps to the App Store while I slept? That's not a demo. That's how I work.",
    "If you need someone who can ship AI-powered products at startup speed, let's talk.",
  ],
} as const;

export interface CaseStudyMetric {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: CaseStudyMetric[];
  tags: string[];
  href: string;
  github?: string;
  demo?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "narrative-assembly",
    title: "Narrative Assembly",
    subtitle:
      "From idea to tested product in 7 days using AI-accelerated design thinking",
    description:
      "Social media builds narratives by cherry-picking clips from real news. Narrative Assembly makes that machinery visible — and I built it in a week, with real user testing baked into the process.",
    metrics: [
      { value: "66", label: "Tests Passing" },
      { value: "5", label: "User Issues → Fixes" },
      { value: "Live", label: "On Vercel" },
    ],
    tags: ["Next.js", "NLP", "Vitest", "Design Thinking"],
    href: "/case-studies/narrative-assembly",
    github: "https://github.com/sebastiandoyle/narrative-assembly",
    demo: "https://narrative-assembly.vercel.app",
  },
  {
    slug: "app-pipeline",
    title: "App Pipeline",
    subtitle: "25 apps shipped autonomously while sleeping",
    description:
      "One prompt. A live app on the App Store by morning. An autonomous loop that handles code generation, asset creation, build, signing, screenshots, and App Store submission — no human in the loop.",
    metrics: [
      { value: "25", label: "Apps Shipped" },
      { value: "100%", label: "Success Rate (v9+)" },
      { value: "~2h", label: "Per App" },
    ],
    tags: ["Swift", "Claude Code", "Fastlane", "ASC API"],
    href: "/case-studies/app-pipeline",
    github: "https://github.com/sebastiandoyle/foundry",
  },
];

export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  iconType:
    | "propaganda"
    | "debate"
    | "void"
    | "imposter"
    | "video"
    | "bridge";
  href?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "propaganda-machine",
    title: "Propaganda Machine",
    description:
      "Proves that country-comparison propaganda works in any direction. Feed it any two countries and a bias, and it generates a convincing argument. Educational tool that makes rhetorical manipulation legible.",
    tags: ["Python", "LLM", "Rhetoric", "Education"],
    iconType: "propaganda",
  },
  {
    slug: "debate-analysis",
    title: "Debate Analysis",
    description:
      "NLP analysis of 60+ years of US presidential debates. Every word scored for sentiment, topic modeled, rhetoric patterns detected.",
    tags: ["NLP", "Python", "Sentiment Analysis", "Data Viz"],
    iconType: "debate",
  },
  {
    slug: "voice-void",
    title: "Voice Void",
    description:
      "Speak a description, watch it materialize as a live React component. Built in an afternoon — that's how fast this moves now.",
    tags: ["Next.js", "OpenAI", "Web Speech API"],
    iconType: "void",
    href: "/void",
  },
  {
    slug: "imposter",
    title: "Imposter",
    description:
      "Real-time multiplayer party game. 1,400+ downloads on the App Store. Built, localized into 35 languages, and shipped entirely by the autonomous pipeline.",
    tags: ["Swift", "WebRTC", "Agora", "Real-time"],
    iconType: "imposter",
    href: "https://apps.apple.com/app/id6756529558",
  },
  {
    slug: "video-pipeline",
    title: "Video Pipeline",
    description:
      "Automated TikTok creation with TTS, editing, and scheduled posting. End-to-end content generation.",
    tags: ["Python", "MoviePy", "TTS", "Automation"],
    iconType: "video",
  },
  {
    slug: "claude-bridge",
    title: "Claude Bridge",
    description:
      "Flask bridge that lets ChatGPT talk to Claude Code CLI. Because sometimes you need two AIs to argue.",
    tags: ["Python", "Flask", "OpenAPI", "CLI"],
    iconType: "bridge",
  },
];
