// App Pipeline (Foundry) — case study content

export interface VersionEvolution {
  version: string;
  successRate: string;
  changes: string;
}

export interface ArchitectureStep {
  name: string;
  description: string;
}

export const PIPELINE_BANNER = {
  title: "App Pipeline",
  subtitle: "25 apps shipped autonomously while sleeping",
  metrics: [
    { value: "25", label: "Apps Shipped" },
    { value: "100%", label: "Success Rate (v9+)" },
    { value: "~2h", label: "Per App" },
  ],
  cta_primary: {
    label: "View on GitHub",
    href: "https://github.com/sebastiandoyle/foundry",
  },
};

export const PIPELINE_INTRO = {
  headline: "What It Does",
  paragraphs: [
    "One prompt. A live app on the App Store by morning.",
    "Foundry is an autonomous pipeline that takes a single app idea and handles everything: code generation, asset creation, Xcode project setup, build, signing, screenshot generation, App Store metadata, and submission. No human in the loop. You describe the app. It ships.",
    "This isn't a code generator that outputs a project you then massage into shape. It's a complete factory: prompt in, App Store listing out. The pipeline handles Swift code, app icons (generated with PIL), Info.plist configuration, provisioning, fastlane integration, and the App Store Connect submission flow — including screenshots for every required device size.",
  ],
};

export const ARCHITECTURE: ArchitectureStep[] = [
  {
    name: "Fresh Session",
    description:
      "Each iteration spawns a new Claude Code instance. No context pollution from previous runs. The AI starts clean every time, reading only the project state on disk.",
  },
  {
    name: "State on Disk",
    description:
      "All progress is tracked in prd.json and committed to git. The loop reads task status from the file, not from memory. This makes the system crash-resistant — kill it at any point and it resumes from the last commit.",
  },
  {
    name: "Circuit Breaker",
    description:
      "If the same task fails 3 consecutive times, the pipeline skips it and moves on. Without this, a single flaky API call could stall the entire run. The circuit breaker pattern keeps the factory moving.",
  },
  {
    name: "Build & Sign",
    description:
      "xcodegen generates the Xcode project from a YAML template. xcodebuild archives and exports with automatic provisioning. No manual certificate management.",
  },
  {
    name: "Screenshot Factory",
    description:
      "Boots iOS simulators, installs the built app, takes raw screenshots, then composites them with marketing headlines using Python and PIL. Handles both iPhone (6.5\") and iPad (13\") sizes.",
  },
  {
    name: "Submission",
    description:
      "Fastlane uploads screenshots and metadata via the App Store Connect API. Chrome browser automation handles the final submission steps that the API can't reach.",
  },
];

export const VERSION_EVOLUTION: VersionEvolution[] = [
  {
    version: "v1–v3",
    successRate: "~30%",
    changes:
      "Naive single-pass approach. No error recovery. Failed on signing issues, screenshot sizing, and ASC API quirks. Most runs died at the build step.",
  },
  {
    version: "v4–v6",
    successRate: "~45%",
    changes:
      "Added retry logic and better error messages. Separated build from submission. But context pollution between tasks caused cascading failures — fixing one bug would break a previously working step.",
  },
  {
    version: "v7–v8",
    successRate: "~75%",
    changes:
      "Introduced fresh sessions per iteration (the key insight). Each task gets a clean AI context. Added circuit breaker pattern. Screenshot generation became reliable.",
  },
  {
    version: "v9+",
    successRate: "100%",
    changes:
      "Mature pipeline. Dynamic simulator detection (no hardcoded device names). Pre-granted permissions to avoid dialog popups in screenshots. iPad screenshot handling. Subscription pricing via API instead of browser automation. Every app ships.",
  },
];

export const RESULTS = {
  headline: "Results",
  stats: [
    { value: "28", label: "Total experiments" },
    { value: "25", label: "Apps on the App Store" },
    { value: "100%", label: "Success rate since v9" },
    { value: "~2h", label: "Average time per app" },
    { value: "0", label: "Manual builds" },
    { value: "35", label: "Languages (Imposter)" },
  ],
  narrative:
    "The first 10 experiments taught the pipeline how to fail gracefully. The next 15 shipped without intervention. The version evolution tells the real story: this isn't a tool that worked on the first try. It's a system that learned from 28 iterations of real-world failure.",
};

export const TECH_STACK = [
  { name: "Swift / SwiftUI", role: "App code generation" },
  { name: "xcodegen", role: "Project file generation from YAML" },
  { name: "xcodebuild", role: "Build, archive, and export" },
  { name: "Fastlane", role: "Screenshot upload and metadata" },
  { name: "App Store Connect API", role: "App creation and pricing" },
  { name: "Claude Code", role: "AI coding agent (fresh sessions)" },
  { name: "Python / PIL", role: "App icon and screenshot generation" },
  { name: "Bash", role: "Orchestration loop and state management" },
];

export const LESSONS_LEARNED = [
  {
    title: "Context pollution is the silent killer",
    body: "The single biggest improvement came from spawning fresh AI sessions per task. Accumulated context from previous steps didn't help — it created interference. Clean state beats rich history.",
  },
  {
    title: "The API can't do everything",
    body: "App Store Connect's API can update apps but can't create them. Subscription pricing requires a specific call order. Some fields only exist on certain sub-resources. You learn the API's real shape by hitting its walls, not reading its docs.",
  },
  {
    title: "Ship the failures",
    body: "The early apps aren't great. Some are trivial utilities. But they're live, and each one taught the pipeline something. v1 apps are the cost of v9 reliability. You can't skip the learning by planning harder.",
  },
];
