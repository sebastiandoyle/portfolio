'use client';

import { useState } from 'react';

interface JournalPromptProps {
  prompt?: string;
  followUps?: string[];
}

const defaultPrompt = 'What would you do today if you knew you could not fail?';
const defaultFollowUps = [
  'What fear is holding you back from this?',
  'What is one small step you could take right now?',
  'How would your life change if you pursued this?',
];

export default function JournalPrompt({
  prompt = defaultPrompt,
  followUps = defaultFollowUps,
}: JournalPromptProps) {
  const [text, setText] = useState('');
  const showFollowUps = text.length > 20;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="flex flex-col gap-4">
      {/* Main prompt */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2">
          <div
            className="w-1 h-full rounded-full shrink-0 mt-1"
            style={{
              background: 'rgba(244, 63, 94, 0.4)',
              minHeight: 16,
            }}
          />
          <p
            className="text-sm font-medium leading-relaxed"
            style={{ color: 'rgba(226, 232, 240, 0.85)' }}
          >
            {prompt}
          </p>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing..."
          rows={5}
          className="w-full text-sm rounded-lg px-3 py-2.5 resize-none"
          style={{
            background: 'rgba(255,255,255,0.02)',
            color: '#e2e8f0',
            border: '1px solid rgba(244, 63, 94, 0.1)',
            outline: 'none',
            lineHeight: 1.6,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.25)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.1)';
          }}
        />
        <span
          className="absolute bottom-2 right-3 text-xs"
          style={{ color: 'rgba(226, 232, 240, 0.2)' }}
        >
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
      </div>

      {/* Follow-up questions */}
      {showFollowUps && followUps.length > 0 && (
        <div
          className="flex flex-col gap-2 pt-2"
          style={{ borderTop: '1px solid rgba(244, 63, 94, 0.08)' }}
        >
          <p
            className="text-xs uppercase tracking-wider"
            style={{ color: 'rgba(244, 63, 94, 0.4)' }}
          >
            Go deeper
          </p>
          {followUps.map((q, i) => (
            <p
              key={i}
              className="text-xs pl-3"
              style={{
                color: 'rgba(226, 232, 240, 0.45)',
                borderLeft: '1px solid rgba(244, 63, 94, 0.15)',
              }}
            >
              {q}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
