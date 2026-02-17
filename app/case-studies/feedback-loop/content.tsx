'use client';

import { motion } from 'framer-motion';
import CaseStudyLayout from '@/components/CaseStudyLayout';
import MetricCard from '@/components/MetricCard';
import ChangeMarker from '@/components/ChangeMarker';
import FeedbackWidget from '@/components/FeedbackWidget';
import ProcessClip from '@/components/ProcessClip';
import {
  FEEDBACK_BANNER,
  FEEDBACK_PROBLEM,
  FEEDBACK_APPROACH,
  FEEDBACK_DATA_FLOW,
  FEEDBACK_ARCHITECTURE,
  FEEDBACK_REFLECTIONS,
} from '@/lib/feedback-loop-content';
import { IMPLEMENTED_CHANGES } from '@/lib/feedback-data';

export default function FeedbackLoopContent() {
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
            {FEEDBACK_BANNER.title}
          </h1>
          <p className="text-lg text-[#a1a1aa] mb-8">
            {FEEDBACK_BANNER.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {FEEDBACK_BANNER.metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {FEEDBACK_PROBLEM.headline}
        </h2>
        <div className="flex gap-5 items-start">
          <div className="flex-1 min-w-0 space-y-4">
            {FEEDBACK_PROBLEM.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? '#a1a1aa' : '#71717a' }}
              >
                {p}
              </p>
            ))}
          </div>
          <ProcessClip
            src="/videos/fl-problem.mp4"
            caption="Outcomes vs process"
          />
        </div>
      </section>

      {/* ===== THE APPROACH ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          {FEEDBACK_APPROACH.headline}
        </h2>
        <div className="flex gap-5 items-start mb-6">
          <ProcessClip
            src="/videos/fl-walk.mp4"
            caption="It starts with a walk"
          />
          <div className="flex-1 min-w-0 space-y-4">
            {FEEDBACK_APPROACH.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-sm leading-relaxed"
                style={{ color: i === 0 ? '#a1a1aa' : '#71717a' }}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
        <blockquote className="border-l-2 border-[#1d4ed8] pl-6 py-2">
          <p className="text-sm leading-relaxed text-[#a1a1aa]">
            {FEEDBACK_APPROACH.blockquote}
          </p>
        </blockquote>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="mb-20">
        <div className="flex gap-5 items-start mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] flex-1">
            How It Works
          </h2>
          <ProcessClip
            src="/videos/fl-workflow.mp4"
            caption="Walk → ChatGPT → Claude"
          />
        </div>
        <div className="space-y-4">
          {FEEDBACK_DATA_FLOW.map((step) => (
            <div
              key={step.number}
              className="flex gap-4 items-start rounded-lg border border-[#27272a] bg-[#18181b] p-5"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#1d4ed8] flex items-center justify-center text-sm font-semibold text-[#1d4ed8]">
                {step.number}
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#fafafa] mb-1">
                  {step.title}
                </h4>
                <p className="text-xs leading-relaxed text-[#71717a]">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== THE CHANGELOG ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          The Changelog
        </h2>
        <div className="flex gap-5 items-start mb-8">
          <ProcessClip
            src="/videos/fl-changelog.mp4"
            caption="Designing the red badges"
          />
          <p className="flex-1 min-w-0 text-sm leading-relaxed text-[#71717a]">
            Three prompts crossed the vote threshold. Three changes shipped. Each one is marked with a red badge on the live site.
          </p>
        </div>

        <div className="space-y-6">
          {IMPLEMENTED_CHANGES.map((change) => (
            <div
              key={change.number}
              id={`change-${change.number}`}
              className="rounded-lg border border-[#27272a] bg-[#18181b] p-6 scroll-mt-24"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <ChangeMarker number={change.number as 1 | 2 | 3} />
                    <h4 className="text-sm font-semibold text-[#fafafa]">
                      {change.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#52525b]">
                    &ldquo;{change.promptText}&rdquo; — {change.votes} votes
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#71717a] mb-4">
                {change.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-md border border-[#27272a] p-4">
                  <p className="text-xs uppercase tracking-wider text-[#52525b] mb-2">
                    Before
                  </p>
                  <p className="text-xs leading-relaxed text-[#71717a]">
                    {change.before}
                  </p>
                </div>
                <div className="rounded-md border border-[#ef4444]/30 bg-[#ef4444]/5 p-4">
                  <p className="text-xs uppercase tracking-wider text-[#ef4444] mb-2">
                    After
                  </p>
                  <p className="text-xs leading-relaxed text-[#fafafa]">
                    {change.after}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRY IT ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Try It
        </h2>
        <div className="rounded-lg border border-[#27272a] bg-[#18181b] p-6">
          <FeedbackWidget compact />
        </div>
      </section>

      {/* ===== ARCHITECTURE ===== */}
      <section className="mb-20">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Architecture
        </h2>
        <div className="space-y-3">
          {FEEDBACK_ARCHITECTURE.map((row) => (
            <div
              key={row.component}
              className="flex flex-col sm:flex-row gap-2 py-3 border-b border-[#27272a] last:border-b-0"
            >
              <div className="sm:w-40 shrink-0">
                <span className="text-sm font-medium text-[#fafafa]">
                  {row.component}
                </span>
                <span className="ml-2 text-xs px-2 py-0.5 rounded bg-[#27272a] text-[#71717a]">
                  {row.tech}
                </span>
              </div>
              <span className="text-sm leading-relaxed text-[#71717a]">
                {row.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== REFLECTIONS ===== */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold tracking-tight text-[#fafafa] mb-6">
          Reflections
        </h2>
        <div className="flex gap-5 items-start">
          <ProcessClip
            src="/videos/fl-wrapup.mp4"
            caption="You can see the process"
          />
          <div className="flex-1 min-w-0 space-y-6">
            {FEEDBACK_REFLECTIONS.map((r) => (
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
        </div>
      </section>
    </CaseStudyLayout>
  );
}
