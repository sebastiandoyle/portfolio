'use client';

import { useState, useCallback } from 'react';

type Category = 'confidence' | 'gratitude' | 'growth' | 'peace' | 'strength';

interface AffirmationCardProps {
  affirmation?: string;
  category?: Category;
}

const affirmations: Record<Category, string[]> = {
  confidence: [
    'I am worthy of all the good things coming my way.',
    'I trust myself to make the right decisions.',
    'My confidence grows when I step outside my comfort zone.',
    'I am enough, exactly as I am right now.',
    'I believe in my abilities and express my true self with ease.',
  ],
  gratitude: [
    'I am grateful for this moment and all it contains.',
    'Every day brings new reasons to be thankful.',
    'I appreciate the simple things that make life beautiful.',
    'Gratitude transforms everything it touches.',
    'I choose to focus on what I have, not what I lack.',
  ],
  growth: [
    'Every challenge is an opportunity to grow stronger.',
    'I am constantly evolving into a better version of myself.',
    'Mistakes are proof that I am trying new things.',
    'I embrace change as a natural part of my growth.',
    'My potential is limitless, and I choose to explore it.',
  ],
  peace: [
    'I release what I cannot control and focus on what I can.',
    'Peace flows through me with every breath I take.',
    'I choose calm over chaos, presence over worry.',
    'My mind is quiet, my heart is open, my spirit is free.',
    'I am at peace with who I am and where I am going.',
  ],
  strength: [
    'I am resilient, brave, and stronger than I know.',
    'Difficult roads often lead to beautiful destinations.',
    'I have survived every hard day so far, and I will survive this one too.',
    'My strength does not come from what I can do, but from overcoming what I thought I could not.',
    'I am powerful beyond measure.',
  ],
};

const categoryGradients: Record<Category, { from: string; to: string; text: string }> = {
  confidence: { from: 'rgba(245, 158, 11, 0.15)', to: 'rgba(234, 88, 12, 0.08)', text: '#FBBF24' },
  gratitude: { from: 'rgba(34, 197, 94, 0.15)', to: 'rgba(16, 185, 129, 0.08)', text: '#4ADE80' },
  growth: { from: 'rgba(59, 130, 246, 0.15)', to: 'rgba(99, 102, 241, 0.08)', text: '#60A5FA' },
  peace: { from: 'rgba(6, 182, 212, 0.15)', to: 'rgba(139, 92, 246, 0.08)', text: '#22D3EE' },
  strength: { from: 'rgba(244, 63, 94, 0.15)', to: 'rgba(236, 72, 153, 0.08)', text: '#FB7185' },
};

export default function AffirmationCard({
  affirmation: initialAffirmation,
  category: initialCategory = 'confidence',
}: AffirmationCardProps) {
  const [category, setCategory] = useState<Category>(initialCategory);
  const [text, setText] = useState(
    initialAffirmation || affirmations[initialCategory][0]
  );

  const nextAffirmation = useCallback(() => {
    const list = affirmations[category];
    let next = list[Math.floor(Math.random() * list.length)];
    while (next === text && list.length > 1) {
      next = list[Math.floor(Math.random() * list.length)];
    }
    setText(next);
  }, [category, text]);

  const changeCategory = useCallback(
    (cat: Category) => {
      setCategory(cat);
      const list = affirmations[cat];
      setText(list[Math.floor(Math.random() * list.length)]);
    },
    []
  );

  const gradient = categoryGradients[category];

  return (
    <div className="flex flex-col gap-4">
      {/* Card */}
      <div
        className="rounded-lg p-5 text-center"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
          border: `1px solid ${gradient.text}15`,
        }}
      >
        <p
          className="text-sm leading-relaxed font-light"
          style={{ color: 'rgba(226, 232, 240, 0.9)' }}
        >
          {text}
        </p>
      </div>

      {/* Category label */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs uppercase tracking-wider"
          style={{ color: `${gradient.text}80` }}
        >
          {category}
        </span>
        <button
          onClick={nextAffirmation}
          className="text-xs px-3 py-1 rounded-md transition-colors"
          style={{
            background: `${gradient.text}12`,
            color: `${gradient.text}90`,
            border: `1px solid ${gradient.text}20`,
          }}
        >
          Next
        </button>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-1.5">
        {(Object.keys(affirmations) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className="text-xs px-2 py-1 rounded-md capitalize transition-colors"
            style={{
              background:
                category === cat
                  ? `${categoryGradients[cat].text}18`
                  : 'rgba(255,255,255,0.02)',
              color:
                category === cat
                  ? `${categoryGradients[cat].text}90`
                  : 'rgba(226, 232, 240, 0.3)',
              border: `1px solid ${
                category === cat
                  ? `${categoryGradients[cat].text}25`
                  : 'rgba(255,255,255,0.04)'
              }`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
