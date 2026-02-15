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

export default function AppPipelineContent() {
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
            {PIPELINE_BANNER.title}
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: 'var(--primary-light)' }}
          >
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
          className="inline-block text-sm font-medium px-6 py-3 rounded-lg border transition-all duration-300 hover:translate-y-[-1px]"
          style={{
            background:
              'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
            borderColor: 'rgba(var(--primary-rgb), 0.3)',
            color: 'var(--primary-light)',
          }}
        >
          {PIPELINE_BANNER.cta_primary.label}
        </a>
      </section>

      {/* ===== WHAT IT DOES ===== */}
      <section className="mb-20">
        <SectionTitle>{PIPELINE_INTRO.headline}</SectionTitle>
        <div className="space-y-4">
          {PIPELINE_INTRO.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              className="text-sm leading-relaxed"
              style={{ color: i === 0 ? 'var(--foreground)' : 'var(--muted)' }}
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

      {/* ===== ARCHITECTURE ===== */}
      <section className="mb-20">
        <SectionTitle>Architecture</SectionTitle>
        <div className="space-y-4">
          {ARCHITECTURE.map((step, i) => (
            <motion.div
              key={step.name}
              className="rounded-xl border p-5 flex items-start gap-4"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(var(--primary-rgb), 0.15), rgba(var(--secondary-rgb), 0.15))',
                  color: 'var(--primary-light)',
                  border: '1px solid rgba(var(--primary-rgb), 0.25)',
                }}
              >
                {i + 1}
              </div>
              <div>
                <h4
                  className="text-sm font-semibold mb-1"
                  style={{ color: 'var(--foreground)' }}
                >
                  {step.name}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'var(--muted)' }}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== VERSION EVOLUTION ===== */}
      <section className="mb-20">
        <SectionTitle>Version Evolution</SectionTitle>
        <div className="space-y-3">
          {VERSION_EVOLUTION.map((v, i) => (
            <motion.div
              key={v.version}
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
              <div className="flex items-center gap-4 mb-2">
                <span
                  className="text-base font-bold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {v.version}
                </span>
                <span
                  className="text-sm font-mono px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                    color: 'var(--primary-light)',
                  }}
                >
                  {v.successRate}
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {v.changes}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="mb-20">
        <SectionTitle>{RESULTS.headline}</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {RESULTS.stats.map((s) => (
            <MetricCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--muted)' }}
        >
          {RESULTS.narrative}
        </p>
      </section>

      {/* ===== TECH STACK ===== */}
      <section className="mb-20">
        <SectionTitle>Tech Stack</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TECH_STACK.map((item, i) => (
            <motion.div
              key={item.name}
              className="rounded-lg border p-4 flex items-center gap-3"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--foreground)' }}
              >
                {item.name}
              </span>
              <span
                className="text-xs"
                style={{ color: 'var(--muted-dim)' }}
              >
                {item.role}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== LESSONS LEARNED ===== */}
      <section className="mb-10">
        <SectionTitle>Lessons Learned</SectionTitle>
        <div className="space-y-4">
          {LESSONS_LEARNED.map((lesson, i) => (
            <motion.div
              key={lesson.title}
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
                {lesson.title}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted)' }}
              >
                {lesson.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </CaseStudyLayout>
  );
}
