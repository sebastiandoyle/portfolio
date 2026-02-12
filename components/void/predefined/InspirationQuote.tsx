'use client';

import { useState, useCallback } from 'react';

interface InspirationQuoteProps {
  quote?: string;
  author?: string;
}

const quotes = [
  { quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { quote: 'In the middle of difficulty lies opportunity.', author: 'Albert Einstein' },
  { quote: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' },
  { quote: 'It is during our darkest moments that we must focus to see the light.', author: 'Aristotle' },
  { quote: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
  { quote: 'What you get by achieving your goals is not as important as what you become by achieving your goals.', author: 'Zig Ziglar' },
  { quote: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt' },
  { quote: 'The mind is everything. What you think you become.', author: 'Buddha' },
  { quote: 'Strive not to be a success, but rather to be of value.', author: 'Albert Einstein' },
  { quote: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.', author: 'Thomas Edison' },
  { quote: 'The only impossible journey is the one you never begin.', author: 'Tony Robbins' },
  { quote: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
  { quote: 'The purpose of our lives is to be happy.', author: 'Dalai Lama' },
  { quote: 'You miss 100% of the shots you don\'t take.', author: 'Wayne Gretzky' },
  { quote: 'Whether you think you can or you think you can\'t, you\'re right.', author: 'Henry Ford' },
  { quote: 'Everything you\'ve ever wanted is on the other side of fear.', author: 'George Addair' },
  { quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', author: 'Aristotle' },
  { quote: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela' },
  { quote: 'Your time is limited, don\'t waste it living someone else\'s life.', author: 'Steve Jobs' },
  { quote: 'If you look at what you have in life, you\'ll always have more.', author: 'Oprah Winfrey' },
];

export default function InspirationQuote({ quote: initialQuote, author: initialAuthor }: InspirationQuoteProps) {
  const [current, setCurrent] = useState(() => {
    if (initialQuote) return { quote: initialQuote, author: initialAuthor || 'Unknown' };
    return quotes[Math.floor(Math.random() * quotes.length)];
  });

  const nextQuote = useCallback(() => {
    let next = quotes[Math.floor(Math.random() * quotes.length)];
    while (next.quote === current.quote && quotes.length > 1) {
      next = quotes[Math.floor(Math.random() * quotes.length)];
    }
    setCurrent(next);
  }, [current]);

  return (
    <div className="flex flex-col items-center text-center gap-4 py-2">
      {/* Decorative quote mark */}
      <span
        className="text-5xl leading-none font-serif"
        style={{ color: 'rgba(245, 158, 11, 0.2)' }}
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <p
        className="text-base italic leading-relaxed px-2"
        style={{ color: 'rgba(226, 232, 240, 0.85)', maxWidth: '320px' }}
      >
        {current.quote}
      </p>

      {/* Author */}
      <p className="text-xs" style={{ color: 'rgba(245, 158, 11, 0.6)' }}>
        -- {current.author}
      </p>

      {/* New quote button */}
      <button
        onClick={nextQuote}
        className="text-xs px-3 py-1.5 rounded-lg transition-colors"
        style={{
          background: 'rgba(245, 158, 11, 0.1)',
          color: 'rgba(245, 158, 11, 0.6)',
          border: '1px solid rgba(245, 158, 11, 0.15)',
        }}
      >
        New quote
      </button>
    </div>
  );
}
