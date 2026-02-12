'use client';

import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import StatCard from '@/components/StatCard';
import PipelineViz from '@/components/PipelineViz';
import ProjectCard from '@/components/ProjectCard';
import SectionHeading from '@/components/SectionHeading';
import VoidPreview from '@/components/VoidPreview';

const projects = [
  {
    title: 'Ultradian Cycle Calendar',
    description:
      'Optimize your 90-minute focus blocks around your biology. Based on Huberman\'s circadian protocol.',
    tags: ['React', 'Chronobiology', 'Productivity'],
    icon: '\u{1F9E0}',
    href: '#',
  },
  {
    title: 'Imposter',
    description:
      'A real-time party word game. Built with Next.js, WebRTC, and Agora for seamless multiplayer.',
    tags: ['Next.js', 'WebRTC', 'Agora', 'Real-time'],
    icon: '\u{1F3AD}',
    href: 'https://apps.apple.com/app/id6756529558',
  },
  {
    title: 'Video Generation Pipeline',
    description:
      'Automated TikTok video creation with MoviePy, text-to-speech, and scheduled posting via Metricool.',
    tags: ['Python', 'MoviePy', 'TTS', 'Automation'],
    icon: '\u{1F3AC}',
  },
  {
    title: 'Meditation API',
    description:
      'REST API for guided meditation content. Clean resource-based design with session management.',
    tags: ['Python', 'Flask', 'REST API'],
    icon: '\u{1F9D8}',
  },
  {
    title: 'Debate Analysis',
    description:
      'NLP analysis of presidential debate transcripts. Sentiment, topic modeling, and rhetoric pattern detection.',
    tags: ['NLP', 'Python', 'Sentiment Analysis'],
    icon: '\u{1F4CA}',
  },
];

export default function Home() {
  return (
    <main className="relative">
      <StarField />

      {/* ===== HERO SECTION ===== */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.p
            className="text-xs uppercase tracking-[0.4em] mb-6 font-medium"
            style={{ color: '#94a3b8' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Product Engineer
          </motion.p>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            Sebastian
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Doyle
            </span>
          </h1>

          <motion.p
            className="mt-6 text-lg md:text-xl max-w-md mx-auto leading-relaxed"
            style={{ color: '#94a3b8' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Product-minded engineer who automates everything.
          </motion.p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: '#475569' }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-8"
            style={{ backgroundColor: 'rgba(139, 92, 246, 0.4)' }}
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ===== FOUNDRY SECTION ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Featured Project" subtitle="The machine that builds apps while I sleep." />

          <motion.div
            className="rounded-3xl border overflow-hidden"
            style={{
              backgroundColor: 'rgba(15, 15, 35, 0.6)',
              borderColor: 'var(--card-border)',
              backdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
                <div>
                  <h3
                    className="text-3xl md:text-4xl font-bold tracking-tight"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary-light), var(--accent))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Foundry
                  </h3>
                  <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                    An autonomous app factory
                  </p>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://github.com/sebastiandoyle"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                    style={{
                      borderColor: 'rgba(139, 92, 246, 0.3)',
                      color: 'var(--primary-light)',
                      backgroundColor: 'rgba(139, 92, 246, 0.08)',
                    }}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
                <StatCard value={28} label="Experiments" />
                <StatCard value={25} label="Apps Shipped" />
                <StatCard value={100} label="Success Rate" suffix="%" />
              </div>

              {/* Description */}
              <motion.div
                className="mb-10 max-w-2xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-base leading-relaxed" style={{ color: '#cbd5e1' }}>
                  I built a pipeline that ships iOS apps to the App Store while I sleep.
                  A single prompt triggers a 17-task autonomous workflow: market research,
                  Xcode project generation, SwiftUI development, icon creation, screenshot
                  capture, App Store Connect configuration, and final submission.
                </p>
                <p className="text-sm mt-4 leading-relaxed" style={{ color: '#94a3b8' }}>
                  Each iteration is a fresh Claude Code instance with no context pollution.
                  State persists through git commits and a structured PRD. The system handles
                  authentication gates, subscription pricing across 175 territories, and
                  screenshot generation for all device classes.
                </p>
              </motion.div>

              {/* Pipeline Visualization */}
              <div
                className="rounded-2xl border p-6 md:p-8"
                style={{
                  backgroundColor: 'rgba(5, 5, 16, 0.5)',
                  borderColor: 'rgba(139, 92, 246, 0.1)',
                }}
              >
                <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#94a3b8' }}>
                  Pipeline Architecture
                </h4>
                <PipelineViz />
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['Swift', 'Claude Code', 'Fastlane', 'xcodegen', 'ASC API', 'Python', 'Bash'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        color: '#93c5fd',
                        border: '1px solid rgba(59, 130, 246, 0.15)',
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== VOICE VOID SECTION ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="text-xs uppercase tracking-[0.3em] font-medium mb-8"
              style={{ color: 'var(--primary-light)' }}
            >
              Experiment
            </h2>

            <h3
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
              style={{ color: 'var(--foreground)' }}
            >
              Voice into the Void
            </h3>

            <p className="text-base mb-12 max-w-md mx-auto leading-relaxed" style={{ color: '#94a3b8' }}>
              Speak, and the void answers. An interactive experience where your voice
              materializes AI-generated components in real-time.
            </p>

            <VoidPreview />

            <motion.a
              href="/void"
              className="inline-flex items-center gap-2 mt-10 text-sm font-medium px-6 py-3 rounded-full transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15))',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                color: 'var(--primary-light)',
              }}
              whileHover={{
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.2)',
                borderColor: 'rgba(139, 92, 246, 0.5)',
              }}
            >
              Enter the Void
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS GRID ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Projects" subtitle="Other things I've built." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title="About" />

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-relaxed" style={{ color: '#cbd5e1' }}>
              I'm a product-minded engineer based in Australia. I build systems that
              run autonomously -- from iOS app pipelines to content creation workflows.
              If it can be automated, I've probably tried.
            </p>

            <p className="text-base leading-relaxed" style={{ color: '#94a3b8' }}>
              My background is in Economics and Law (dual degree), which gives me a
              different lens on building products. I think in systems, feedback loops,
              and incentive structures. I write Python, TypeScript, and Swift, and I
              have a working knowledge of machine learning and NLP.
            </p>

            <p className="text-base leading-relaxed" style={{ color: '#94a3b8' }}>
              I've traveled solo across 18 countries, and I'm driven by a fascination
              with how technology can redirect addictive mechanics toward genuine growth.
              The same patterns that keep people scrolling could just as easily help
              them learn, build, and connect.
            </p>

            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com/sebastiandoyle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  color: 'var(--primary-light)',
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                }}
              >
                GitHub
              </a>
              <a
                href="mailto:sebastian.doyle@outlook.com"
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  borderColor: 'rgba(59, 130, 246, 0.3)',
                  color: '#93c5fd',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                }}
              >
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative z-10 py-12 px-6 border-t" style={{ borderColor: 'rgba(139, 92, 246, 0.08)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: '#475569' }}>
            Built with Next.js + Tailwind CSS. Deployed on Vercel.
          </p>
          <p className="text-xs" style={{ color: '#475569' }}>
            &copy; {new Date().getFullYear()} Sebastian Doyle
          </p>
        </div>
      </footer>
    </main>
  );
}
