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
  screenshot?: string;
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
  screenshot,
}: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <a
        href={href}
        className="group block rounded-lg border border-[#27272a] bg-[#18181b] p-6 md:p-8 transition-all duration-200 hover:border-[#3f3f46] hover:-translate-y-0.5"
      >
        {/* Screenshot */}
        {screenshot && (
          <div className="mb-6 rounded-md overflow-hidden border border-[#27272a]">
            <img
              src={screenshot}
              alt={`${title} screenshot`}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        )}

        {/* Header */}
        <h3 className="text-xl font-semibold text-[#fafafa] mb-1">
          {title}
        </h3>
        <p className="text-sm text-[#a1a1aa] mb-4">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#71717a] mb-6">
          {description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-3 mb-6">
          {metrics.map((metric) => (
            <span
              key={metric.label}
              className="text-xs px-3 py-1.5 rounded-md bg-[#27272a] text-[#a1a1aa]"
            >
              <span className="font-semibold text-[#fafafa]">{metric.value}</span>
              {' '}{metric.label}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-[#71717a]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-[#3b82f6] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            Read case study
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>

          {github && (
            <span
              onClick={(e) => { e.preventDefault(); window.open(github, '_blank'); }}
              className="text-xs text-[#71717a] hover:text-[#a1a1aa] cursor-pointer"
            >
              GitHub
            </span>
          )}

          {demo && (
            <span
              onClick={(e) => { e.preventDefault(); window.open(demo, '_blank'); }}
              className="text-xs text-[#71717a] hover:text-[#a1a1aa] cursor-pointer"
            >
              Live Demo
            </span>
          )}
        </div>
      </a>
    </motion.div>
  );
}
