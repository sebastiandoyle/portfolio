'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoidShowcaseProps {
  onBridge: () => void;
}

const TAGLINE = 'From voice to vision in 90 seconds.';
const PITCH_LINES = [
  'Every idea deserves this level of craft.',
  'This is what I build.',
];

const CONTACTS = [
  { label: 'sebastian.doyle@outlook.com', href: 'mailto:sebastian.doyle@outlook.com' },
  { label: '+61 421 244 135', href: 'tel:+61421244135' },
  { label: 'github.com/sebastiandoyle', href: 'https://github.com/sebastiandoyle' },
  { label: '@itssebdoyle', href: 'https://twitter.com/itssebdoyle' },
];

export default function VoidShowcase({ onBridge }: VoidShowcaseProps) {
  const [taglineText, setTaglineText] = useState('');
  const [taglineDone, setTaglineDone] = useState(false);
  const [showPitch, setShowPitch] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const autoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Typewriter for tagline
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= TAGLINE.length) {
        setTaglineText(TAGLINE.slice(0, index));
      } else {
        clearInterval(interval);
        setTaglineDone(true);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Staggered reveals after tagline
  useEffect(() => {
    if (!taglineDone) return;

    const t1 = setTimeout(() => setShowPitch(true), 600);
    const t2 = setTimeout(() => setShowContacts(true), 1400);
    const t3 = setTimeout(() => setShowCta(true), 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [taglineDone]);

  // Auto-bridge after 15 seconds
  useEffect(() => {
    autoTimerRef.current = setTimeout(onBridge, 15000);
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    };
  }, [onBridge]);

  const handleCta = () => {
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    onBridge();
  };

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        background: 'rgba(5, 5, 16, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="max-w-lg w-full px-6 text-center">
        {/* Tagline - typewriter */}
        <p
          className="text-2xl md:text-3xl font-light tracking-tight min-h-[2.5rem]"
          style={{
            color: 'rgba(226, 232, 240, 0.9)',
            textShadow: '0 0 40px rgba(139, 92, 246, 0.3)',
          }}
        >
          {taglineText}
          {!taglineDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: 'rgba(139, 92, 246, 0.5)' }}
            >
              |
            </motion.span>
          )}
        </p>

        {/* Pitch lines */}
        <AnimatePresence>
          {showPitch && (
            <motion.div
              className="mt-8 space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {PITCH_LINES.map((line) => (
                <p
                  key={line}
                  className="text-base"
                  style={{ color: 'rgba(148, 163, 184, 0.9)' }}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact items */}
        <AnimatePresence>
          {showContacts && (
            <motion.div
              className="mt-10 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {CONTACTS.map((c, i) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block text-sm transition-colors duration-200"
                  style={{ color: 'rgba(167, 139, 250, 0.7)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'rgba(167, 139, 250, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(167, 139, 250, 0.7)';
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 200,
                    delay: i * 0.12,
                  }}
                >
                  {c.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA button */}
        <AnimatePresence>
          {showCta && (
            <motion.button
              onClick={handleCta}
              className="mt-12 inline-flex items-center gap-2 text-sm font-medium px-8 py-3.5 rounded-full cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                color: 'var(--primary-light, #c4b5fd)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{
                boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                borderColor: 'rgba(139, 92, 246, 0.6)',
              }}
            >
              {"Let's build something together"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
