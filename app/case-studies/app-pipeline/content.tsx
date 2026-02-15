'use client';

import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/CaseStudyLayout';
import MetricCard from '@/components/MetricCard';
import {
  PIPELINE_BANNER,
  PIPELINE_INTRO,
  ARCHITECTURE,
  VERSION_EVOLUTION,
  RESULTS,
  TECH_STACK,
  LESSONS_LEARNED,
} from '@/lib/app-pipeline-content';

export default function AppPipelineContent() {
  return (
    <CaseStudyLayout>
      {/* ===== IMPACT BANNER ===== */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#fafafa] mb-3">
            {PIPELINE_BANNER.title}
          </h1>
          <p className="text-lg text-[#a1a1aa] mb-8">
            {PIPELINE_BANNER.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {PIPELINE_BANNER.metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <a
          href={PIPELINE_BANNER.cta_primary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#3b82f6] transition-colors duration-200"
        >
          {PIPELINE_BANNER.cta_primary.label}
        </a>
      </section>

      {/* ===== WHAT IT DOES ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {PIPELINE_INTRO.headline}
        </h2>
        <div className="space-y-4">
          {PIPELINE_INTRO.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? '#fafafa' : '#71717a' }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Architecture
        </h2>
        <div className="space-y-0">
          {ARCHITECTURE.map((step, i) => (
            <div
              key={step.name}
              className="flex items-start gap-4 py-5 border-b border-[#27272a] last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full border border-[#27272a] flex items-center justify-center text-xs font-medium text-[#a1a1aa] shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#fafafa] mb-1">
                  {step.name}
                </h4>
                <p className="text-sm leading-relaxed text-[#71717a]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== VERSION EVOLUTION ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Version Evolution
        </h2>
        <div className="space-y-4">
          {VERSION_EVOLUTION.map((v) => (
            <div
              key={v.version}
              className="border-b border-[#27272a] pb-4 last:border-b-0"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-[#fafafa]">
                  {v.version}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#27272a] text-[#a1a1aa]">
                  {v.successRate}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-[#71717a]">
                {v.changes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {RESULTS.headline}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {RESULTS.stats.map((s) => (
            <MetricCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-[#71717a]">
          {RESULTS.narrative}
        </p>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH_STACK.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-3 py-3 border-b border-[#27272a] last:border-b-0"
            >
              <span className="text-sm font-medium text-[#fafafa]">
                {item.name}
              </span>
              <span className="text-xs text-[#52525b]">
                {item.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LESSONS LEARNED ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Lessons Learned
        </h2>
        <div className="space-y-6">
          {LESSONS_LEARNED.map((lesson) => (
            <div key={lesson.title} className="border-b border-[#27272a] pb-6 last:border-b-0">
              <h4 className="text-sm font-semibold text-[#fafafa] mb-2">
                {lesson.title}
              </h4>
              <p className="text-sm leading-relaxed text-[#71717a]">
                {lesson.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
