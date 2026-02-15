'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import CaseStudyCard from '@/components/CaseStudyCard';
import ProjectCard from '@/components/ProjectCard';
import AppIconWall from '@/components/AppIconWall';
import AppSpotlight from '@/components/AppSpotlight';
import StatCard from '@/components/StatCard';
import { CASE_STUDIES, PROJECTS, ABOUT_COPY } from '@/lib/brand';
import { FOUNDRY_STATS } from '@/lib/app-data';

export default function Home() {
  return (
    <main className="relative">
      {/* ===== 1. HERO ===== */}
      <Hero />

      {/* ===== 2. CASE STUDIES ===== */}
      <section id="case-studies" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#71717a] mb-10">
            Case Studies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CaseStudyCard
              {...CASE_STUDIES[0]}
              screenshot="/screenshots/na-results.png"
            />
            <CaseStudyCard {...CASE_STUDIES[1]} />
          </div>
        </div>
      </section>

      <hr className="border-[#27272a] max-w-5xl mx-auto" />

      {/* ===== 3. APP PIPELINE EVIDENCE ===== */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#71717a] mb-10">
            App Pipeline
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: App icons */}
            <div className="rounded-lg border border-[#27272a] bg-[#18181b] p-6">
              <AppIconWall />
              <div className="grid grid-cols-3 gap-4 mt-6">
                {FOUNDRY_STATS.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>
            </div>

            {/* Right: Featured app */}
            <AppSpotlight />
          </div>
        </div>
      </section>

      <hr className="border-[#27272a] max-w-5xl mx-auto" />

      {/* ===== 4. PROJECTS GRID ===== */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#71717a] mb-10">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </section>

      <hr className="border-[#27272a] max-w-5xl mx-auto" />

      {/* ===== 5. ABOUT ===== */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#71717a] mb-10">
            About
          </h2>

          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4 }}
          >
            {ABOUT_COPY.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? '#a1a1aa' : '#71717a' }}
              >
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 6. FOOTER ===== */}
      <footer className="py-12 px-6 border-t border-[#27272a]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/sebastiandoyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sebastiandoyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:sebastian.doyle@outlook.com"
              className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors"
            >
              Email
            </a>
          </div>
          <p className="text-xs text-[#52525b]">
            &copy; {new Date().getFullYear()} Sebastian Doyle
          </p>
        </div>
      </footer>
    </main>
  );
}
