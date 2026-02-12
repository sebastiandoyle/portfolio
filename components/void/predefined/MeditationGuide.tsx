'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface MeditationGuideProps {
  duration?: number;
}

const phases = ['Breathe in...', 'Hold...', 'Breathe out...', 'Rest...'];
const phaseDurations = [4, 4, 6, 2]; // seconds per phase

export default function MeditationGuide({ duration = 5 }: MeditationGuideProps) {
  const [targetMinutes, setTargetMinutes] = useState(
    Math.max(1, Math.min(20, duration))
  );
  const [timeLeft, setTimeLeft] = useState(targetMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = targetMinutes * 60;
  const progress = 1 - timeLeft / totalSeconds;

  const startPhaseTimer = useCallback(() => {
    let elapsed = 0;
    const currentPhaseDuration = phaseDurations[0];
    let currentPhase = 0;

    phaseTimerRef.current = setInterval(() => {
      elapsed += 0.05;
      const pDur = phaseDurations[currentPhase];
      const p = elapsed / pDur;

      if (p >= 1) {
        currentPhase = (currentPhase + 1) % phases.length;
        setPhaseIndex(currentPhase);
        elapsed = 0;
        setPhaseProgress(0);
      } else {
        setPhaseProgress(p);
      }
    }, 50);
  }, []);

  const start = useCallback(() => {
    setIsRunning(true);
    setTimeLeft(targetMinutes * 60);
    setPhaseIndex(0);
    setPhaseProgress(0);
    startPhaseTimer();
  }, [targetMinutes, startPhaseTimer]);

  const pause = useCallback(() => {
    setIsRunning(false);
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(targetMinutes * 60);
    setPhaseIndex(0);
    setPhaseProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
  }, [targetMinutes]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            pause();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, pause]);

  useEffect(() => {
    return () => {
      if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
    };
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // SVG progress ring
  const size = 140;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Phase-based orb scale
  const orbScale = phaseIndex === 0
    ? 1 + phaseProgress * 0.4
    : phaseIndex === 1
    ? 1.4
    : phaseIndex === 2
    ? 1.4 - phaseProgress * 0.4
    : 1;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress ring with timer */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(139, 92, 246, 0.6)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>

        {/* Ambient orb */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <div
            className="rounded-full"
            style={{
              width: 50,
              height: 50,
              background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent)',
              transform: `scale(${orbScale})`,
              transition: 'transform 0.3s ease',
            }}
          />
        </div>

        {/* Time display */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-light tabular-nums" style={{ color: '#e2e8f0' }}>
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Breathing cue */}
      <p
        className="text-sm font-light h-6"
        style={{
          color: isRunning ? 'rgba(167, 139, 250, 0.8)' : 'rgba(226, 232, 240, 0.3)',
          transition: 'color 0.3s',
        }}
      >
        {isRunning ? phases[phaseIndex] : 'Ready when you are'}
      </p>

      {/* Duration selector (only when not running) */}
      {!isRunning && timeLeft === targetMinutes * 60 && (
        <div className="flex items-center gap-2">
          {[1, 3, 5, 10, 15, 20].map((m) => (
            <button
              key={m}
              onClick={() => {
                setTargetMinutes(m);
                setTimeLeft(m * 60);
              }}
              className="px-2 py-1 text-xs rounded transition-colors"
              style={{
                background:
                  targetMinutes === m
                    ? 'rgba(139, 92, 246, 0.25)'
                    : 'rgba(255,255,255,0.03)',
                color:
                  targetMinutes === m
                    ? '#A78BFA'
                    : 'rgba(226, 232, 240, 0.4)',
                border: `1px solid ${
                  targetMinutes === m
                    ? 'rgba(139, 92, 246, 0.3)'
                    : 'rgba(255,255,255,0.05)'
                }`,
              }}
            >
              {m}m
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-4 py-1.5 text-xs rounded-lg transition-colors"
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              color: '#A78BFA',
              border: '1px solid rgba(139, 92, 246, 0.3)',
            }}
          >
            {timeLeft < targetMinutes * 60 ? 'Resume' : 'Start'}
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-4 py-1.5 text-xs rounded-lg transition-colors"
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#FBBF24',
              border: '1px solid rgba(245, 158, 11, 0.2)',
            }}
          >
            Pause
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-1.5 text-xs rounded-lg transition-colors"
          style={{
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(226, 232, 240, 0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
