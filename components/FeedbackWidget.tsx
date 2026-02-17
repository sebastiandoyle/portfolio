'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { FeedbackPrompt } from '@/lib/feedback-data';

interface FeedbackWidgetProps {
  compact?: boolean;
}

export default function FeedbackWidget({ compact }: FeedbackWidgetProps) {
  const [prompts, setPrompts] = useState<FeedbackPrompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());

  // Load voted IDs from sessionStorage on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('feedback-voted');
      if (stored) setVotedIds(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  // Fetch top prompts
  useEffect(() => {
    fetch('/api/feedback')
      .then((r) => r.json())
      .then((data) => {
        setPrompts(data.prompts);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const vote = useCallback(
    async (promptId: string) => {
      if (votedIds.has(promptId)) return;

      // Optimistic update
      setPrompts((prev) =>
        prev.map((p) => (p.id === promptId ? { ...p, votes: p.votes + 1 } : p))
      );

      const newVoted = new Set(votedIds).add(promptId);
      setVotedIds(newVoted);
      try {
        sessionStorage.setItem('feedback-voted', JSON.stringify([...newVoted]));
      } catch {}

      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId }),
      });
    },
    [votedIds]
  );

  const content = (
    <div className="flex flex-col items-center gap-4">
      {!compact && (
        <h2 className="text-lg font-semibold text-[#fafafa] text-center">
          Got 10 seconds? Tell me what you&apos;d change.
        </h2>
      )}
      {compact && (
        <h3 className="text-base font-semibold text-[#fafafa] text-center">
          Vote on what changes next
        </h3>
      )}

      <div className="flex flex-wrap justify-center gap-3">
        <AnimatePresence mode="wait">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-10 w-48 rounded-full bg-[#27272a] animate-pulse"
                />
              ))}
            </>
          ) : (
            prompts.map((prompt) => {
              const voted = votedIds.has(prompt.id);
              return (
                <motion.button
                  key={prompt.id}
                  onClick={() => vote(prompt.id)}
                  disabled={voted}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm transition-colors duration-200
                    ${
                      voted
                        ? 'border-[#27272a] bg-[#18181b] text-[#52525b] cursor-default'
                        : 'border-[#27272a] bg-[#18181b] text-[#a1a1aa] hover:border-[#1d4ed8] hover:text-[#fafafa] cursor-pointer'
                    }
                  `}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {voted && (
                    <svg className="w-3.5 h-3.5 text-[#52525b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {prompt.text}
                  <span className={`text-xs ${voted ? 'text-[#3f3f46]' : 'text-[#52525b]'}`}>
                    {prompt.votes}
                  </span>
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {!compact && (
        <p className="text-xs text-[#52525b] text-center mt-1">
          Top-voted prompts get implemented.{' '}
          <a href="/case-studies/feedback-loop" className="text-[#1d4ed8] hover:underline">
            See how it works
          </a>
        </p>
      )}
    </div>
  );

  if (compact) return content;

  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">{content}</div>
    </section>
  );
}
