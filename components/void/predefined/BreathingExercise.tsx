'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type Pattern = '4-7-8' | 'box' | '5-5' | 'wim-hof';

interface BreathingExerciseProps {
  pattern?: Pattern;
}

const patterns: Record<Pattern, { name: string; phases: { label: string; duration: number }[] }> = {
  '4-7-8': {
    name: '4-7-8 Calm',
    phases: [
      { label: 'Breathe in', duration: 4 },
      { label: 'Hold', duration: 7 },
      { label: 'Breathe out', duration: 8 },
    ],
  },
  box: {
    name: 'Box Breathing',
    phases: [
      { label: 'Breathe in', duration: 4 },
      { label: 'Hold', duration: 4 },
      { label: 'Breathe out', duration: 4 },
      { label: 'Hold', duration: 4 },
    ],
  },
  '5-5': {
    name: '5-5 Balance',
    phases: [
      { label: 'Breathe in', duration: 5 },
      { label: 'Breathe out', duration: 5 },
    ],
  },
  'wim-hof': {
    name: 'Wim Hof',
    phases: [
      { label: 'Deep breath in', duration: 2 },
      { label: 'Let go', duration: 2 },
    ],
  },
};

export default function BreathingExercise({ pattern: initialPattern = '4-7-8' }: BreathingExerciseProps) {
  const [selectedPattern, setSelectedPattern] = useState<Pattern>(initialPattern);
  const [isRunning, setIsRunning] = useState(true);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { phases, name } = patterns[selectedPattern];
  const currentPhase = phases[phaseIdx];

  // Scale the orb based on breathing phase
  const isInhale = currentPhase.label.includes('in') || currentPhase.label.includes('Deep');
  const isExhale = currentPhase.label.includes('out') || currentPhase.label.includes('Let');
  const isHold = currentPhase.label === 'Hold';

  let orbScale = 1;
  if (isInhale) orbScale = 1 + progress * 0.6;
  else if (isExhale) orbScale = 1.6 - progress * 0.6;
  else if (isHold) orbScale = phaseIdx === 1 ? 1.6 : 1;

  const tick = useCallback(() => {
    setProgress((prev) => {
      const step = 0.05 / currentPhase.duration;
      const next = prev + step;
      if (next >= 1) {
        setPhaseIdx((pi) => (pi + 1) % phases.length);
        return 0;
      }
      return next;
    });
  }, [currentPhase.duration, phases.length]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(tick, 50);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, tick]);

  // Reset when pattern changes
  useEffect(() => {
    setPhaseIdx(0);
    setProgress(0);
  }, [selectedPattern]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Animated orb */}
      <div
        className="relative flex items-center justify-center"
        style={{ width: 120, height: 120 }}
      >
        {/* Outer ring */}
        <div
          className="absolute rounded-full"
          style={{
            width: 120,
            height: 120,
            border: '1px solid rgba(6, 182, 212, 0.15)',
          }}
        />
        {/* Inner orb */}
        <div
          className="rounded-full"
          style={{
            width: 60,
            height: 60,
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.05))',
            transform: `scale(${orbScale})`,
            transition: 'transform 0.15s ease-out',
            boxShadow: `0 0 ${30 * orbScale}px rgba(6, 182, 212, ${0.15 * orbScale})`,
          }}
        />
      </div>

      {/* Phase label */}
      <div className="text-center">
        <p className="text-sm font-light" style={{ color: 'rgba(6, 182, 212, 0.8)' }}>
          {currentPhase.label}
        </p>
        <p className="text-xs mt-1" style={{ color: 'rgba(226, 232, 240, 0.3)' }}>
          {currentPhase.duration}s
        </p>
      </div>

      {/* Pattern selector */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {(Object.keys(patterns) as Pattern[]).map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPattern(p)}
            className="text-xs px-2.5 py-1 rounded-md transition-colors"
            style={{
              background:
                selectedPattern === p
                  ? 'rgba(6, 182, 212, 0.2)'
                  : 'rgba(255,255,255,0.03)',
              color:
                selectedPattern === p
                  ? 'rgba(6, 182, 212, 0.9)'
                  : 'rgba(226, 232, 240, 0.35)',
              border: `1px solid ${
                selectedPattern === p
                  ? 'rgba(6, 182, 212, 0.25)'
                  : 'rgba(255,255,255,0.05)'
              }`,
            }}
          >
            {patterns[p].name}
          </button>
        ))}
      </div>

      {/* Pause/resume */}
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="text-xs px-4 py-1.5 rounded-lg transition-colors"
        style={{
          background: isRunning ? 'rgba(245, 158, 11, 0.1)' : 'rgba(6, 182, 212, 0.15)',
          color: isRunning ? 'rgba(245, 158, 11, 0.6)' : 'rgba(6, 182, 212, 0.8)',
          border: `1px solid ${isRunning ? 'rgba(245, 158, 11, 0.15)' : 'rgba(6, 182, 212, 0.2)'}`,
        }}
      >
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
