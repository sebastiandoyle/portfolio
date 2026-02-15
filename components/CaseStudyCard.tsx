'use client';

import { motion } from 'framer-motion';
import type { CaseStudyMetric } from '@/lib/brand';

interface CaseStudyCardProps {
  title: string;
  subtitle: string;
  description: string;
  metrics: CaseStudyMetric[];
  tags: string[];
  href: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export default function CaseStudyCard({
  title,
  subtitle,
  description,
  metrics,
  tags,
  href,
  github,
  demo,
  featured = false,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <a
        href={href}
        className="group block relative rounded-2xl border p-6 md:p-8 transition-all duration-300 hover:translate-y-[-2px]"
        style={{
          backgroundColor: featured
            ? 'rgba(var(--primary-rgb), 0.04)'
            : 'var(--card-bg)',
          borderColor: featured
            ? 'rgba(var(--primary-rgb), 0.25)'
            : 'var(--card-border)',
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(var(--primary-rgb), 0.08), transparent 70%)',
            boxShadow: '0 0 60px rgba(var(--primary-rgb), 0.1)',
          }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-4">
            {featured && (
              <span
                className="text-xs uppercase tracking-widest font-medium mb-3 block"
                style={{ color: 'var(--primary-light)' }}
              >
                Featured Case Study
              </span>
            )}
            <h3
              className={`font-bold tracking-tight mb-2 ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`}
              style={{ color: 'var(--foreground)' }}
            >
              {title}
            </h3>
            <p
              className="text-sm"
              style={{ color: 'var(--primary-light)' }}
            >
              {subtitle}
            </p>
          </div>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'var(--muted)' }}
          >
            {description}
          </p>

          {/* Metrics row */}
          <div className="flex gap-6 mb-6">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <div
                  className="text-xl font-bold"
                  style={{ color: 'var(--primary-light)' }}
                >
                  {metric.value}
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={{ color: 'var(--muted-dim)' }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                  color: 'var(--primary-light)',
                  border: '1px solid rgba(var(--primary-rgb), 0.15)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4">
            <span
              className="text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
              style={{ color: 'var(--primary-light)' }}
            >
              Read case study
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>

            {github && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(github, '_blank');
                }}
                className="text-xs font-medium cursor-pointer hover:underline"
                style={{ color: 'var(--muted)' }}
              >
                GitHub
              </span>
            )}

            {demo && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  window.open(demo, '_blank');
                }}
                className="text-xs font-medium cursor-pointer hover:underline"
                style={{ color: 'var(--muted)' }}
              >
                Live Demo
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}
