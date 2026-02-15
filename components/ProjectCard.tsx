'use client';

import { motion } from 'framer-motion';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
  icon: React.ReactNode;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  icon,
}: ProjectCardProps) {
  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <Wrapper
        {...wrapperProps}
        className="group block relative rounded-2xl border p-6 h-full transition-all duration-300 hover:translate-y-[-2px]"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderColor: 'var(--card-border)',
        }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(var(--primary-rgb), 0.06), transparent 70%)',
            boxShadow: '0 0 40px rgba(var(--primary-rgb), 0.08)',
          }}
        />

        {/* Hover border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            border: '1px solid rgba(var(--primary-rgb), 0.3)',
          }}
        />

        <div className="relative z-10">
          <div className="text-3xl mb-4">{icon}</div>

          <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
            {title}
          </h3>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--muted)' }}>
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
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

          {href && (
            <div
              className="mt-4 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: 'var(--primary-light)' }}
            >
              View project
              <svg
                className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
