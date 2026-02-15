'use client';

import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/CaseStudyLayout';
import MetricCard from '@/components/MetricCard';
import DesignPhaseCard from '@/components/DesignPhaseCard';
import InterviewInsight from '@/components/InterviewInsight';
import IterationTable from '@/components/IterationTable';
import {
  IMPACT_BANNER,
  THE_PROBLEM,
  DESIGN_PHASES,
  INTERVIEW_FINDINGS,
  ITERATION_TABLE,
  AI_USAGE,
  AI_ACCELERATION_NARRATIVE,
  TECHNICAL_ARCHITECTURE,
  BUSINESS_VISION,
  REFLECTIONS,
} from '@/lib/case-study-content';

export default function NarrativeAssemblyContent() {
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
            {IMPACT_BANNER.title}
          </h1>
          <p className="text-lg text-[#a1a1aa] mb-8">
            {IMPACT_BANNER.subtitle}
          </p>
        </motion.div>

        {/* Screenshot */}
        <div className="mb-8 rounded-lg overflow-hidden border border-[#27272a]">
          <img
            src="/screenshots/na-results.png"
            alt="Narrative Assembly showing search results for immigration"
            className="w-full h-auto"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {IMPACT_BANNER.metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={IMPACT_BANNER.cta_primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#fafafa] hover:border-[#3b82f6] transition-colors duration-200"
          >
            {IMPACT_BANNER.cta_primary.label}
          </a>
          <a
            href={IMPACT_BANNER.cta_secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46] transition-colors duration-200"
          >
            {IMPACT_BANNER.cta_secondary.label}
          </a>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {THE_PROBLEM.headline}
        </h2>
        <div className="space-y-4">
          {THE_PROBLEM.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? '#a1a1aa' : '#71717a' }}
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ===== DESIGN THINKING PROCESS ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Design Thinking Process
        </h2>
        <div>
          {DESIGN_PHASES.map((phase, i) => (
            <DesignPhaseCard
              key={phase.name}
              phase={i + 1}
              name={phase.name}
              description={phase.description}
              detail={phase.detail}
            />
          ))}
        </div>
      </section>

      {/* ===== CUSTOMER INTERVIEW DEEP DIVE ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Customer Interview Deep Dive
        </h2>
        <div className="space-y-8">
          {INTERVIEW_FINDINGS.map((finding) => (
            <InterviewInsight key={finding.id} {...finding} />
          ))}
        </div>
      </section>

      {/* ===== ITERATION EVIDENCE ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Iteration Evidence
        </h2>
        <p className="text-sm leading-relaxed text-[#71717a] mb-6">
          Every piece of user feedback mapped to a code change. Nothing was hand-waved or deferred.
        </p>
        <IterationTable rows={ITERATION_TABLE} />
      </section>

      {/* ===== AI ACCELERATION ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          How AI Accelerated Every Stage
        </h2>

        <blockquote className="border-l-2 border-[#3b82f6] pl-6 py-2 mb-8">
          <p className="text-sm leading-relaxed text-[#a1a1aa]">
            {AI_ACCELERATION_NARRATIVE}
          </p>
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_USAGE.map((item) => (
            <div
              key={item.stage}
              className="rounded-lg border border-[#27272a] bg-[#18181b] p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#fafafa]">
                  {item.stage}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-[#27272a] text-[#71717a]">
                  {item.tool}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-[#71717a]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TECHNICAL ARCHITECTURE ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {TECHNICAL_ARCHITECTURE.headline}
        </h2>
        <p className="text-sm leading-relaxed text-[#71717a] mb-8">
          {TECHNICAL_ARCHITECTURE.description}
        </p>

        {/* Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {TECHNICAL_ARCHITECTURE.pipeline.map((step) => (
            <div
              key={step.step}
              className="rounded-lg border border-[#27272a] p-4 text-center"
            >
              <div className="text-sm font-semibold text-[#fafafa] mb-1">
                {step.step}
              </div>
              <p className="text-xs leading-relaxed text-[#71717a]">
                {step.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Decisions */}
        <div className="space-y-3">
          {TECHNICAL_ARCHITECTURE.decisions.map((d) => (
            <div
              key={d.decision}
              className="flex flex-col sm:flex-row gap-2 py-3 border-b border-[#27272a] last:border-b-0"
            >
              <span className="text-sm font-medium text-[#fafafa] shrink-0 sm:w-48">
                {d.decision}
              </span>
              <span className="text-sm leading-relaxed text-[#71717a]">
                {d.rationale}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== BUSINESS VISION ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {BUSINESS_VISION.headline}
        </h2>

        <div className="space-y-4 mb-8">
          {BUSINESS_VISION.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? '#a1a1aa' : '#71717a' }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Market evidence */}
        <div className="rounded-lg border border-[#27272a] p-6 mb-6">
          <p className="text-xs uppercase tracking-wider text-[#a1a1aa] mb-3">
            Market Evidence
          </p>
          <ul className="space-y-2">
            {BUSINESS_VISION.evidence.map((e, i) => (
              <li key={i} className="text-sm leading-relaxed text-[#71717a] flex items-start gap-2">
                <span className="text-[#3b82f6]">&#8226;</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Expansion */}
        <div className="rounded-lg border border-[#27272a] p-6">
          <p className="text-xs uppercase tracking-wider text-[#a1a1aa] mb-3">
            Expansion Opportunities
          </p>
          <ul className="space-y-2">
            {BUSINESS_VISION.expansion.map((e, i) => (
              <li key={i} className="text-sm leading-relaxed text-[#71717a] flex items-start gap-2">
                <span className="text-[#3b82f6]">&#8226;</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== WHAT I'D DO DIFFERENTLY ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          What I&apos;d Do Differently
        </h2>
        <div className="space-y-6">
          {REFLECTIONS.map((r) => (
            <div key={r.title} className="border-b border-[#27272a] pb-6 last:border-b-0">
              <h4 className="text-sm font-semibold text-[#fafafa] mb-2">
                {r.title}
              </h4>
              <p className="text-sm leading-relaxed text-[#71717a]">
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
