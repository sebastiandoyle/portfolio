'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarField from '@/components/StarField';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import Hero from '@/components/Hero';
import CaseStudyCard from '@/components/CaseStudyCard';
import SectionHeading from '@/components/SectionHeading';
import StatCard from '@/components/StatCard';
import PipelineViz from '@/components/PipelineViz';
import ProjectCard from '@/components/ProjectCard';
import AppIconWall from '@/components/AppIconWall';
import AppSpotlight from '@/components/AppSpotlight';
import { CASE_STUDIES, PROJECTS, ABOUT_COPY } from '@/lib/brand';
import { FOUNDRY_STATS } from '@/lib/app-data';

const IconPropaganda = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38a.75.75 0 01-1.021-.27 12.577 12.577 0 01-1.819-4.404m5-5.72a11.648 11.648 0 00-1.819-4.404.75.75 0 00-1.021-.27l-.657.38a.75.75 0 00-.463 1.511 12.58 12.58 0 01.985 2.783m5.09.053A12.04 12.04 0 0118 12a12.04 12.04 0 01-1.41 5.68M16.5 12l5 3V9l-5 3z" />
  </svg>
);
const IconDebate = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);
const IconVoid = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);
const IconImposter = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
);
const IconVideo = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 19 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.75 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.75 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5 5.496 4.5 4.875 4.5h-1.5m1.5 5.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5m0 0c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125m0 3.75c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m0 0h-1.5" />
  </svg>
);
const IconBridge = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
);

const ICON_MAP: Record<string, React.ReactNode> = {
  propaganda: <IconPropaganda />,
  debate: <IconDebate />,
  void: <IconVoid />,
  imposter: <IconImposter />,
  video: <IconVideo />,
  bridge: <IconBridge />,
};

export default function Home() {
  const [bridgeFadeIn, setBridgeFadeIn] = useState(false);
  const [bridgeReady, setBridgeReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const fromVoid = sessionStorage.getItem('void-bridge');
    if (fromVoid) {
      sessionStorage.removeItem('void-bridge');
      setBridgeFadeIn(true);
      requestAnimationFrame(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView();
        requestAnimationFrame(() => setBridgeReady(true));
      });
    }
  }, []);

  return (
    <main
      className="relative"
      style={bridgeFadeIn ? {
        opacity: bridgeReady ? 1 : 0,
        transition: 'opacity 1.5s ease-in-out',
      } : undefined}
    >
      <StarField />
      <ThemeSwitcher />

      {/* ===== 1. HERO ===== */}
      <Hero />

      {/* ===== 2. CASE STUDIES ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Case Studies" subtitle="End-to-end builds with real evidence." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyCard {...CASE_STUDIES[0]} featured />
            <CaseStudyCard {...CASE_STUDIES[1]} />
          </div>
        </div>
      </section>

      {/* ===== 3. APP PIPELINE ===== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="App Pipeline" subtitle="Results without the overhead." />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Card 1: Pipeline Identity */}
            <motion.div
              className="rounded-2xl border p-6 md:p-8"
              style={{
                backgroundColor: 'var(--card-bg-alpha)',
                borderColor: 'var(--card-border)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
                      border: '1px solid rgba(var(--primary-rgb), 0.25)',
                    }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="var(--icon-stroke)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085" />
                    </svg>
                  </div>
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
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                      Autonomous iOS app pipeline
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://github.com/sebastiandoyle/foundry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                    style={{
                      borderColor: 'rgba(var(--primary-rgb), 0.3)',
                      color: 'var(--primary-light)',
                      backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                    }}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>

              <div className="max-w-2xl mb-6">
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-strong)' }}>
                  One prompt. A live app on the App Store by morning. An autonomous pipeline that handles code generation, asset creation, build, signing, screenshots, and App Store submission — no human in the loop.
                </p>
                <p className="text-sm mt-3 leading-relaxed" style={{ color: 'var(--muted-dim)' }}>
                  I designed the system. AI writes the code, generates the assets,
                  and submits to the App Store. Zero manual builds.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Swift', 'Claude Code', 'Fastlane', 'xcodegen', 'ASC API', 'Python', 'Bash'].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{
                        backgroundColor: 'rgba(var(--secondary-rgb), 0.08)',
                        color: 'var(--tag-color)',
                        border: '1px solid rgba(var(--secondary-rgb), 0.15)',
                      }}
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </motion.div>

            {/* Card 2: App Icons + Stats */}
            <motion.div
              className="rounded-2xl border p-6 md:p-8"
              style={{
                backgroundColor: 'var(--card-bg-alpha)',
                borderColor: 'var(--card-border)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <AppIconWall />
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {FOUNDRY_STATS.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </motion.div>

            {/* Card 3: Featured App Spotlight */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AppSpotlight />
            </motion.div>

            {/* Card 4: Pipeline */}
            <motion.div
              className="rounded-2xl border p-6 md:p-8"
              style={{
                backgroundColor: 'var(--card-bg-alpha)',
                borderColor: 'var(--card-border)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--muted)' }}>
                Pipeline Architecture
              </h4>
              <PipelineViz />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== 4. PROJECTS GRID ===== */}
      <section id="projects" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Projects" subtitle="More things I've built." />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                href={project.href}
                icon={ICON_MAP[project.iconType]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== 5. ABOUT ===== */}
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
            {ABOUT_COPY.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? 'var(--muted-strong)' : 'var(--muted)' }}
              >
                {p}
              </p>
            ))}

            <div className="flex gap-4 pt-6">
              <a
                href="https://github.com/sebastiandoyle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  borderColor: 'rgba(var(--primary-rgb), 0.3)',
                  color: 'var(--primary-light)',
                  backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                }}
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sebastiandoyle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  borderColor: 'rgba(var(--secondary-rgb), 0.3)',
                  color: 'var(--btn-secondary-color)',
                  backgroundColor: 'rgba(var(--secondary-rgb), 0.08)',
                }}
              >
                LinkedIn
              </a>
              <a
                href="mailto:sebastian.doyle@outlook.com"
                className="text-sm font-medium px-5 py-2.5 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
                style={{
                  borderColor: 'rgba(var(--secondary-rgb), 0.3)',
                  color: 'var(--tag-color)',
                  backgroundColor: 'rgba(var(--secondary-rgb), 0.08)',
                }}
              >
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== 6. FOOTER ===== */}
      <footer className="relative z-10 py-12 px-6 border-t" style={{ borderColor: 'rgba(var(--primary-rgb), 0.08)' }}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--muted-faint)' }}>
            Built with Next.js + Tailwind CSS. Deployed on Vercel.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/sebastiandoyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: 'var(--muted-dim)' }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/sebastiandoyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:underline"
              style={{ color: 'var(--muted-dim)' }}
            >
              GitHub
            </a>
          </div>
          <p className="text-xs" style={{ color: 'var(--muted-faint)' }}>
            &copy; {new Date().getFullYear()} Sebastian Doyle
          </p>
        </div>
      </footer>
    </main>
  );
}
