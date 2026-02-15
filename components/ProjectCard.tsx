'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? href.startsWith('/')
      ? { href }
      : { href, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <Wrapper
        {...wrapperProps}
        className="group block rounded-lg border border-[#27272a] bg-[#18181b] p-6 h-full transition-all duration-200 hover:border-[#3f3f46] hover:-translate-y-0.5"
      >
        <h3 className="text-base font-semibold text-[#fafafa] mb-2">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-[#71717a] mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-[#52525b]">
              {tag}
            </span>
          ))}
        </div>

        {href && (
          <div className="mt-4 text-xs font-medium text-[#3b82f6] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            View project
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </Wrapper>
    </motion.div>
  );
}
