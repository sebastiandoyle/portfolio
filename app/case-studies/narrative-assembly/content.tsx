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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      className="text-2xl md:text-3xl font-bold tracking-tight mb-8"
      style={{ color: 'var(--foreground)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
}

export default function NarrativeAssemblyContent() {
  return (
    <CaseStudyLayout>
      {/* ===== IMPACT BANNER ===== */}
      <section className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            {IMPACT_BANNER.title}
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: 'var(--primary-light)' }}
          >
            {IMPACT_BANNER.subtitle}
          </p>
        </motion.div>

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
            className="text-sm font-medium px-6 py-3 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              background:
                'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
              borderColor: 'rgba(var(--primary-rgb), 0.3)',
              color: 'var(--primary-light)',
            }}
          >
            {IMPACT_BANNER.cta_primary.label}
          </a>
          <a
            href={IMPACT_BANNER.cta_secondary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-6 py-3 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
            style={{
              borderColor: 'rgba(var(--secondary-rgb), 0.3)',
              color: 'var(--btn-secondary-color)',
              backgroundColor: 'rgba(var(--secondary-rgb), 0.08)',
            }}
          >
            {IMPACT_BANNER.cta_secondary.label}
          </a>
        </div>
      </section>

      {/* ===== THE PROBLEM ===== */}
      <section className="mb-20">
        <SectionTitle>{THE_PROBLEM.headline}</SectionTitle>
        <div className="space-y-4">
          {THE_PROBLEM.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? 'var(--muted-strong)' : 'var(--muted)' }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ===== DESIGN THINKING PROCESS ===== */}
      <section className="mb-20">
        <SectionTitle>Design Thinking Process</SectionTitle>
        <div className="space-y-4">
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
        <SectionTitle>Customer Interview Deep Dive</SectionTitle>
        <div className="space-y-6">
          {INTERVIEW_FINDINGS.map((finding) => (
            <InterviewInsight key={finding.id} {...finding} />
          ))}
        </div>
      </section>

      {/* ===== ITERATION EVIDENCE ===== */}
      <section className="mb-20">
        <SectionTitle>Iteration Evidence</SectionTitle>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: 'var(--muted)' }}
        >
          Every piece of user feedback mapped to a code change. Nothing
          was hand-waved or deferred.
        </p>
        <IterationTable rows={ITERATION_TABLE} />
      </section>

      {/* ===== AI ACCELERATION ===== */}
      <section className="mb-20">
        <SectionTitle>How AI Accelerated Every Stage</SectionTitle>

        <motion.blockquote
          className="rounded-xl border-l-4 p-6 mb-8"
          style={{
            borderColor: 'var(--primary)',
            backgroundColor: 'rgba(var(--primary-rgb), 0.04)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-sm md:text-base italic leading-relaxed"
            style={{ color: 'var(--muted-strong)' }}
          >
            {AI_ACCELERATION_NARRATIVE}
          </p>
        </motion.blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AI_USAGE.map((item, i) => (
            <motion.div
              key={item.stage}
              className="rounded-xl border p-5"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--primary-light)' }}
                >
                  {item.stage}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(var(--secondary-rgb), 0.1)',
                    color: 'var(--btn-secondary-color)',
                  }}
                >
                  {item.tool}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== TECHNICAL ARCHITECTURE ===== */}
      <section className="mb-20">
        <SectionTitle>{TECHNICAL_ARCHITECTURE.headline}</SectionTitle>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: 'var(--muted)' }}
        >
          {TECHNICAL_ARCHITECTURE.description}
        </p>

        {/* Pipeline diagram */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {TECHNICAL_ARCHITECTURE.pipeline.map((step, i) => (
            <motion.div
              key={step.step}
              className="flex-1 rounded-xl border p-5 text-center"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="text-lg font-bold mb-1"
                style={{ color: 'var(--primary-light)' }}
              >
                {step.step}
              </div>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--muted)' }}>
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decisions */}
        <div className="space-y-3">
          {TECHNICAL_ARCHITECTURE.decisions.map((d, i) => (
            <motion.div
              key={d.decision}
              className="rounded-lg border p-4 flex flex-col sm:flex-row gap-2"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
            >
              <span
                className="text-sm font-medium shrink-0 sm:w-48"
                style={{ color: 'var(--foreground)' }}
              >
                {d.decision}
              </span>
              <span
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {d.rationale}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== BUSINESS VISION ===== */}
      <section className="mb-20">
        <SectionTitle>{BUSINESS_VISION.headline}</SectionTitle>

        <div className="space-y-4 mb-8">
          {BUSINESS_VISION.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? 'var(--muted-strong)' : 'var(--muted)' }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Market evidence */}
        <div
          className="rounded-xl border p-6 mb-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--primary-light)' }}
          >
            Market Evidence
          </p>
          <ul className="space-y-2">
            {BUSINESS_VISION.evidence.map((e, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed flex items-start gap-2"
                style={{ color: 'var(--muted)' }}
              >
                <span style={{ color: 'var(--primary-light)' }}>&#8226;</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* Expansion */}
        <div
          className="rounded-xl border p-6"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--card-border)',
          }}
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Expansion Opportunities
          </p>
          <ul className="space-y-2">
            {BUSINESS_VISION.expansion.map((e, i) => (
              <li
                key={i}
                className="text-sm leading-relaxed flex items-start gap-2"
                style={{ color: 'var(--muted)' }}
              >
                <span style={{ color: 'var(--accent)' }}>&#8226;</span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== WHAT I'D DO DIFFERENTLY ===== */}
      <section className="mb-10">
        <SectionTitle>What I&apos;d Do Differently</SectionTitle>
        <div className="space-y-4">
          {REFLECTIONS.map((r, i) => (
            <motion.div
              key={r.title}
              className="rounded-xl border p-6"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <h4
                className="text-base font-semibold mb-2"
                style={{ color: 'var(--foreground)' }}
              >
                {r.title}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {r.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
