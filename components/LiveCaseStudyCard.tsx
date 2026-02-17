'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CASE_STUDIES } from '@/lib/brand';
import { IMPLEMENTED_CHANGES } from '@/lib/feedback-data';

const study = CASE_STUDIES[2];

const SUBTITLES = [
  study.subtitle,
  'Watch how the feedback loop works',
  `${IMPLEMENTED_CHANGES.length} changes shipped from real votes`,
];

const VIDEO_CONFIGS = [
  { side: 'right' as const, width: 56 },
  { side: 'left' as const, width: 64 },
  { side: 'right' as const, width: 52 },
];

const DELETE_SPEED = 20;
const TYPE_SPEED = 30;
const COLOR_FADE_S = 0.6;

// ---- Typewriter hook ----
function useTypewriter(target: string) {
  const [display, setDisplay] = useState(target);
  const [phase, setPhase] = useState<'idle' | 'deleting' | 'typing' | 'fading'>('idle');
  const prev = useRef(target);
  const t = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (target === prev.current) return;
    const old = prev.current;
    prev.current = target;
    setPhase('deleting');

    let i = old.length;
    const del = () => {
      if (i > 0) {
        i--;
        setDisplay(old.slice(0, i));
        t.current = setTimeout(del, DELETE_SPEED);
      } else {
        setPhase('typing');
        let j = 0;
        const type = () => {
          if (j <= target.length) {
            setDisplay(target.slice(0, j));
            j++;
            t.current = setTimeout(type, TYPE_SPEED);
          } else {
            setPhase('fading');
            t.current = setTimeout(() => setPhase('idle'), COLOR_FADE_S * 1000);
          }
        };
        type();
      }
    };
    del();
    return () => { if (t.current) clearTimeout(t.current); };
  }, [target]);

  const isRed = phase === 'deleting' || phase === 'typing';
  return { text: display, isRed, isFading: phase === 'fading' };
}

// ---- Main component ----
export default function LiveCaseStudyCard() {
  const [subIdx, setSubIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoHighlight, setVideoHighlight] = useState(false);
  const reduced = useReducedMotion();

  const { text: subText, isRed, isFading } = useTypewriter(SUBTITLES[subIdx]);
  const vc = VIDEO_CONFIGS[subIdx];

  // Listen for iterate-pulse from AmbientLoop
  useEffect(() => {
    if (reduced) return;
    const handler = () => {
      setSubIdx((i) => (i + 1) % SUBTITLES.length);
      setVideoHighlight(true);
      setTimeout(() => setVideoHighlight(false), 800);
    };
    window.addEventListener('iterate-pulse', handler);
    return () => window.removeEventListener('iterate-pulse', handler);
  }, [reduced]);

  const subStyle: React.CSSProperties = {
    color: isRed ? '#ef4444' : '#a1a1aa',
    transition: isFading ? `color ${COLOR_FADE_S}s ease` : 'color 0s',
  };

  if (reduced) {
    return (
      <div className="h-full">
        <a href={study.href} className={CARD}>
          <h3 className="text-xl font-semibold text-[#fafafa] mb-1">{study.title}</h3>
          <p className="text-sm text-[#a1a1aa] mb-4">{study.subtitle}</p>
          <div className="flex gap-3 items-start mb-6 flex-1">
            <p className="flex-1 min-w-0 text-sm leading-relaxed text-[#71717a]">{study.description}</p>
            <div className="w-14 shrink-0 rounded-md overflow-hidden border border-[#27272a]">
              <video src="/videos/feedback-loop-demo.mp4" autoPlay muted loop playsInline className="w-full h-auto" />
            </div>
          </div>
          <Metrics />
          <Tags />
          <CardLink />
        </a>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <a
        href={study.href}
        className={CARD}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <h3 className="text-xl font-semibold text-[#fafafa] mb-1">{study.title}</h3>

        {/* Subtitle — typewriter, red while changing */}
        <p className="text-sm mb-4 min-h-[20px]" style={subStyle}>
          {subText}
          {isRed && (
            <span className="inline-block w-[1.5px] h-[13px] bg-current ml-px align-middle animate-pulse" />
          )}
        </p>

        {/* Body — description + video */}
        <div className="flex gap-3 items-start mb-6 flex-1">
          <motion.div
            layout
            className="shrink-0 rounded-md overflow-hidden border"
            style={{ order: vc.side === 'right' ? 2 : 0 }}
            animate={{
              width: vc.width,
              borderColor: videoHighlight ? '#ef4444' : '#27272a',
            }}
            transition={{
              layout: { type: 'spring', stiffness: 200, damping: 25 },
              borderColor: { duration: videoHighlight ? 0.05 : 0.6 },
              width: { type: 'spring', stiffness: 200, damping: 25 },
            }}
          >
            <video
              src="/videos/feedback-loop-demo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            />
          </motion.div>

          <p
            className="flex-1 min-w-0 text-sm leading-relaxed text-[#71717a]"
            style={{ order: 1 }}
          >
            {study.description}
          </p>
        </div>

        <Metrics />
        <Tags />
        <CardLink />
      </a>
    </motion.div>
  );
}

// ---- Card styling (matches CaseStudyCard) ----
const CARD =
  'group flex flex-col h-full rounded-lg border border-[#27272a] bg-[#18181b] p-6 md:p-8 transition-all duration-200 hover:border-[#3f3f46] hover:-translate-y-0.5';

function Metrics() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      {study.metrics.map((m) => (
        <span key={m.label} className="text-xs px-3 py-1.5 rounded-md bg-[#27272a] text-[#a1a1aa]">
          <span className="font-semibold text-[#fafafa]">{m.value}</span> {m.label}
        </span>
      ))}
    </div>
  );
}

function Tags() {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {study.tags.map((tag) => (
        <span key={tag} className="text-xs text-[#71717a]">{tag}</span>
      ))}
    </div>
  );
}

function CardLink() {
  return (
    <div className="flex items-center gap-4 mt-auto">
      <span className="text-xs font-medium text-[#1d4ed8] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
        Read case study
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </span>
    </div>
  );
}
