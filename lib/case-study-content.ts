// Narrative Assembly — full case study content
// Structured for React components to consume section by section

export interface CaseStudySection {
  id: string;
  title: string;
  content: string | string[];
}

export interface InterviewFinding {
  id: number;
  quote: string;
  context: string;
  implication: string;
  fix: string;
}

export interface DesignPhase {
  name: string;
  description: string;
  detail: string;
}

export interface AIUsage {
  stage: string;
  tool: string;
  description: string;
}

export interface IterationRow {
  finding: string;
  quote: string;
  change: string;
  evidence: string;
}

export interface Reflection {
  title: string;
  body: string;
}

// Section 1: Impact Banner
export const IMPACT_BANNER = {
  title: "Narrative Assembly",
  subtitle:
    "From idea to tested product in 7 days using AI-accelerated design thinking",
  metrics: [
    { value: "66", label: "Tests Passing" },
    { value: "5", label: "User Issues → Fixes" },
    { value: "Live", label: "On Vercel" },
  ],
  cta_primary: { label: "Try the Demo", href: "https://narrative-assembly.vercel.app" },
  cta_secondary: { label: "View Source", href: "https://github.com/sebastiandoyle/narrative-assembly" },
};

// Section 2: The Problem
export const THE_PROBLEM = {
  headline: "The Problem",
  paragraphs: [
    "Every day, social media builds narratives by cherry-picking clips from legitimate news. A 4-second quote about immigration next to a 6-second quote about crime creates an implication no journalist intended. The clips are real. The narrative is manufactured. And most people can't tell the difference.",
    "This isn't a fringe concern. Ground News raised significant funding for bias detection tools. Media literacy is a growing sector. But most solutions tell you what to think about media — they don't show you how the machinery works.",
    "Narrative Assembly takes the opposite approach. Instead of flagging bias after the fact, it lets you build a narrative yourself — choose a topic, watch clips assemble, see how editorial framing emerges from selection alone. The insight isn't that media is biased. It's that you can feel the bias forming under your own hands.",
  ],
};

// Section 3: Design Thinking Process
export const DESIGN_PHASES: DesignPhase[] = [
  {
    name: "Empathize",
    description: "Understanding the audience",
    detail:
      "Recruited a politically engaged participant who consumes news daily and pays the BBC licence fee. Conducted a 45-minute semi-structured interview while they used the prototype, capturing reactions in real time rather than relying on retrospective feedback.",
  },
  {
    name: "Define",
    description: "Framing the core challenge",
    detail:
      "The core insight: people don't lack access to balanced news — they lack the tools to see how narratives are constructed. The problem isn't bias detection. It's bias legibility. Users need to feel the editorial process, not read about it.",
  },
  {
    name: "Ideate",
    description: "Generating solutions",
    detail:
      "Explored three directions: a passive news feed with bias overlays, an interactive narrative builder, and a debate simulator. The narrative builder won because it's the only approach where users experience editorial power directly — they become the editor, and the bias becomes theirs.",
  },
  {
    name: "Prototype",
    description: "Building fast",
    detail:
      "Built a working prototype in 72 hours using Next.js and NLP pipelines. AI handled boilerplate generation, component scaffolding, and test writing. I focused on the interaction design — how clips auto-advance, how topics connect, how the narrative arc feels.",
  },
  {
    name: "Test",
    description: "Real users, real feedback",
    detail:
      "Ran a moderated usability test with screen recording and think-aloud protocol. Every bug, confusion, and delight moment was captured verbatim. Five critical findings. All five were fixed in the same coding session — AI-transcribed interview to deployed fix in under 2 hours.",
  },
];

// Section 4: Customer Interview Deep Dive
export const INTERVIEW_FINDINGS: InterviewFinding[] = [
  {
    id: 1,
    quote: "I liked that I just sat there and it happened to me",
    context:
      "Participant A, a politically engaged viewer who pays the BBC licence fee, described their experience with the auto-advancing clip feed. They expected to need to click through content but found the passive consumption model engaging.",
    implication:
      "Passive consumption works. Auto-advancing clips created engagement without requiring decisions — mirroring the exact mechanism that makes social media narrative assembly so effective.",
    fix: "Kept the auto-advance as the default interaction model. This validated the core UX hypothesis: the tool works because it mirrors the experience it's trying to make visible.",
  },
  {
    id: 2,
    quote: "I'd like to click on the video and see the full thing",
    context:
      "After being shown a short clip about a political topic, the participant immediately wanted to access the full source video. The snippet had hooked them, but the product offered no way to go deeper.",
    implication:
      "Users want to drill down when a snippet hooks them. The teaser-to-source pipeline is a key trust mechanism — without it, the tool feels like it's doing the same cherry-picking it claims to expose.",
    fix: "Added source attribution links to every clip. Each snippet now links back to its full-length original, turning the tool from a narrative demonstrator into a research aid.",
  },
  {
    id: 3,
    quote: "'Coal' returned 'coalition' results",
    context:
      "The participant searched for clips about coal and received results about coalition politics. The search used naive substring matching, so 'coal' matched 'coalition', 'charcoal', and other unrelated terms.",
    implication:
      "A search bug exposed by a real-world query that unit tests hadn't anticipated. Substring matching seemed fine in development — it took a real user with a real question to break it.",
    fix: "Replaced substring matching with word-boundary search. Added tests specifically for this class of false positive. The fix took 10 minutes; finding it without user testing could have taken weeks.",
  },
  {
    id: 4,
    quote: "When you pause, it keeps moving",
    context:
      "The participant tried to pause the auto-advancing clip feed to read a caption, but the timer continued and the next clip loaded. There was no way to stop the flow.",
    implication:
      "Auto-resume broke user control. The same passive experience that worked for initial engagement became frustrating when the user wanted to slow down and think — the opposite of the tool's educational goal.",
    fix: "Added pause/resume controls with clear visual state. When paused, the progress bar freezes and a play icon appears. User control over pacing is now explicit.",
  },
  {
    id: 5,
    quote: "I don't know what r/ means",
    context:
      "Reddit content was displayed with its native r/subreddit notation. The participant — a daily news consumer who doesn't use Reddit — had no idea what the prefix meant.",
    implication:
      "Platform jargon alienated non-Reddit users. What's obvious to builders isn't obvious to the audience. This is a media literacy tool — it can't assume its users are already media-literate.",
    fix: "Replaced r/subreddit notation with human-readable source labels (e.g., 'Reddit - United Kingdom'). Removed all platform-specific jargon from the interface.",
  },
];

// Section 5: Iteration Evidence
export const ITERATION_TABLE: IterationRow[] = [
  {
    finding: "Passive consumption works",
    quote: "I liked that I just sat there and it happened to me",
    change: "Kept auto-advance as default",
    evidence: "Core UX hypothesis validated by user behavior",
  },
  {
    finding: "Users want full sources",
    quote: "I'd like to click on the video and see the full thing",
    change: "Added source attribution links to every clip",
    evidence: "Commit: add-source-links, 3 components updated",
  },
  {
    finding: "Substring search broken",
    quote: "'Coal' returned 'coalition' results",
    change: "Word-boundary matching + regression tests",
    evidence: "Commit: fix-search-matching, 2 test cases added",
  },
  {
    finding: "No pause control",
    quote: "When you pause, it keeps moving",
    change: "Pause/resume with visual state indicator",
    evidence: "Commit: add-pause-controls, PlaybackControls component",
  },
  {
    finding: "Platform jargon",
    quote: "I don't know what r/ means",
    change: "Human-readable source labels",
    evidence: "Commit: readable-sources, SourceLabel component",
  },
];

// Section 6: How AI Accelerated Every Stage
export const AI_USAGE: AIUsage[] = [
  {
    stage: "Research",
    tool: "Claude",
    description:
      "Literature review on media framing theory and narrative psychology. Synthesized 15+ academic papers into design principles in a single session.",
  },
  {
    stage: "Prototyping",
    tool: "Claude Code",
    description:
      "Generated Next.js boilerplate, API routes, and NLP pipeline scaffolding. I focused on interaction design while AI handled implementation details.",
  },
  {
    stage: "User Testing",
    tool: "AI Transcription",
    description:
      "Interview transcribed in real-time. I pasted the transcript directly into my development environment. Same session: every bug the user found was fixed.",
  },
  {
    stage: "Iteration",
    tool: "Claude Code",
    description:
      "Five user-reported issues converted to fixes in under 2 hours. AI wrote the regression tests. I verified the UX.",
  },
  {
    stage: "Testing",
    tool: "Vitest + Claude",
    description:
      "66 tests generated and passing. AI wrote the test suite based on component contracts. I wrote the edge cases that mattered.",
  },
  {
    stage: "Deployment",
    tool: "Vercel",
    description:
      "Push to main, live in 90 seconds. No CI pipeline to configure — the tool choices eliminated DevOps overhead entirely.",
  },
];

export const AI_ACCELERATION_NARRATIVE =
  "I pasted the AI-transcribed interview directly into my development environment. The same session, every bug the user found was fixed. That's not a workflow improvement. That's a category change in how products get built.";

// Section 7: Technical Architecture
export const TECHNICAL_ARCHITECTURE = {
  headline: "Technical Architecture",
  description:
    "A Next.js application with server-side NLP processing and client-side narrative assembly.",
  pipeline: [
    {
      step: "Ingest",
      detail: "News clips pulled from multiple sources via API, normalized into a common schema",
    },
    {
      step: "Analyze",
      detail: "NLP pipeline scores each clip for sentiment, extracts entities, identifies topics",
    },
    {
      step: "Assemble",
      detail: "User selects a topic; clips are ordered by editorial logic to form a narrative arc",
    },
    {
      step: "Present",
      detail: "Auto-advancing feed with source attribution, pause controls, and drill-down links",
    },
  ],
  decisions: [
    {
      decision: "Next.js over SPA",
      rationale:
        "Server-side NLP processing keeps the client lightweight. API routes handle the heavy lifting.",
    },
    {
      decision: "Vitest over Jest",
      rationale:
        "Native ESM support, faster execution, better DX. 66 tests run in under 3 seconds.",
    },
    {
      decision: "No database",
      rationale:
        "Clips are fetched and processed on demand. No persistence needed for the MVP — keeps deployment trivial.",
    },
  ],
};

// Section 8: Business Vision
export const BUSINESS_VISION = {
  headline: "Business Vision",
  paragraphs: [
    "Narrative Assembly is a proof of concept for a larger idea: that understanding media bias is an interactive problem, not an informational one. Telling people 'this source leans left' doesn't change behavior. Letting them feel editorial power does.",
    "The comparable products validate the market. Ground News built a business on bias labels. AllSides maps media positioning. But none of them let users construct narratives themselves. That's the gap.",
  ],
  evidence: [
    "Ground News: raised funding for media bias tools — proves market demand for bias visibility",
    "AllSides: media bias ratings adopted by educators — proves institutional appetite for literacy tools",
    "BBC Bitesize: media literacy curriculum growing year over year — proves educational sector expansion",
  ],
  expansion: [
    "Classroom integration: teacher dashboard with guided exercises on narrative construction",
    "API access: let researchers study narrative assembly patterns at scale",
    "Multi-language: bias operates differently across languages and cultures — internationalizing the tool opens new research questions",
  ],
};

// Section 9: What I'd Do Differently
export const REFLECTIONS: Reflection[] = [
  {
    title: "More participants, earlier",
    body: "One participant surfaced five critical issues. Three participants would have surfaced patterns. I'd run a guerrilla testing round before the first prototype — even paper prototypes catch navigation assumptions that code can't.",
  },
  {
    title: "Quantitative alongside qualitative",
    body: "Think-aloud protocols are rich but hard to scale. I'd add lightweight analytics from day one — time on clip, pause frequency, search-to-result ratio. The qualitative tells you why. The quantitative tells you how often.",
  },
  {
    title: "Accessibility as a first-class constraint",
    body: "The auto-advancing feed works for sighted users but creates problems for screen readers and keyboard navigation. I'd build the pause-first, opt-in-to-autoplay version from the start rather than bolting on accessibility after the interaction model was set.",
  },
];
