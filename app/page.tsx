'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import CaseStudyCard from '@/components/CaseStudyCard';
import LiveCaseStudyCard from '@/components/LiveCaseStudyCard';
import ProjectCard from '@/components/ProjectCard';
import FeedbackWidget from '@/components/FeedbackWidget';
import ChangeMarker from '@/components/ChangeMarker';
import AmbientLoop from '@/components/AmbientLoop';
import { CASE_STUDIES, PROJECTS, ABOUT_COPY } from '@/lib/brand';

export default function Home() {
  return (
    <main className="relative">
      {/* ===== 1. HERO + NECKLACE LOOP ===== */}
      <div className="relative">
        <Hero />
        <AmbientLoop />
      </div>

      {/* ===== 2. CASE STUDIES ===== */}
      <section id="case-studies" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.2em] text-[#71717a] mb-10">
            Case Studies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Narrative Assembly — ChangeMarker #3 (subtitle reframed) */}
            <div className="relative">
              <span className="absolute top-4 right-4 z-10">
                <ChangeMarker number={3} />
              </span>
              <CaseStudyCard
                {...CASE_STUDIES[0]}
                screenshot="/screenshots/na-results.png"
              />
            </div>
            <CaseStudyCard {...CASE_STUDIES[1]} />
            <LiveCaseStudyCard />
          </div>
        </div>
      </section>

      {/* ===== FEEDBACK WIDGET ===== */}
      <FeedbackWidget />

      {/* ===== 3. PROJECTS GRID ===== */}
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

      {/* ===== LET'S TALK — added via Feedback Loop change #2 ===== */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#fafafa]">
              Let&apos;s talk
            </h2>
            <span className="absolute -top-2 -right-7">
              <ChangeMarker number={2} />
            </span>
          </div>
          <p className="text-sm text-[#71717a] mb-8 max-w-md mx-auto">
            If you need someone who can ship AI-powered products at startup speed, I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:sebastian.doyle@outlook.com"
              className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#1d4ed8] transition-colors duration-200"
            >
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/sebastiandoyle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#1d4ed8] hover:text-[#fafafa] transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
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
