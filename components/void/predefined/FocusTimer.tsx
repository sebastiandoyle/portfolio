'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface FocusTimerProps {
  workMinutes?: number;
  breakMinutes?: number;
}

type TimerMode = 'work' | 'break';

export default function FocusTimer({
  workMinutes = 25,
  breakMinutes = 5,
}: FocusTimerProps) {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds = mode === 'work' ? workMinutes * 60 : breakMinutes * 60;
  const progress = 1 - timeLeft / totalSeconds;

  const switchMode = useCallback(
    (newMode: TimerMode) => {
      setMode(newMode);
      setTimeLeft(newMode === 'work' ? workMinutes * 60 : breakMinutes * 60);
      setIsRunning(false);
    },
    [workMinutes, breakMinutes]
  );

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (mode === 'work') {
              setSessions((s) => s + 1);
              switchMode('break');
            } else {
              switchMode('work');
            }
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
  }, [isRunning, mode, switchMode]);

  const skip = useCallback(() => {
    if (mode === 'work') {
      setSessions((s) => s + 1);
      switchMode('break');
    } else {
      switchMode('work');
    }
  }, [mode, switchMode]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Progress ring
  const size = 160;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const modeColor = mode === 'work' ? 'rgba(59, 130, 246,' : 'rgba(34, 197, 94,';

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Mode indicator */}
      <div className="flex items-center gap-3">
        <span
          className="text-xs uppercase tracking-wider font-medium"
          style={{ color: `${modeColor}0.8)` }}
        >
          {mode === 'work' ? 'Focus' : 'Break'}
        </span>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  i < sessions
                    ? `${modeColor}0.6)`
                    : 'rgba(255,255,255,0.06)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Timer ring */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="absolute inset-0 -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`${modeColor}0.08)`}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`${modeColor}0.6)`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-light tabular-nums"
            style={{ color: '#e2e8f0' }}
          >
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </span>
          <span
            className="text-xs mt-1"
            style={{ color: 'rgba(226, 232, 240, 0.3)' }}
          >
            {mode === 'work' ? `${workMinutes} min session` : `${breakMinutes} min break`}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-5 py-1.5 text-xs rounded-lg transition-colors"
          style={{
            background: isRunning
              ? 'rgba(245, 158, 11, 0.12)'
              : `${modeColor}0.15)`,
            color: isRunning ? 'rgba(245, 158, 11, 0.7)' : `${modeColor}0.8)`,
            border: `1px solid ${
              isRunning ? 'rgba(245, 158, 11, 0.2)' : `${modeColor}0.2)`
            }`,
          }}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={skip}
          className="px-4 py-1.5 text-xs rounded-lg transition-colors"
          style={{
            background: 'rgba(255,255,255,0.03)',
            color: 'rgba(226, 232, 240, 0.4)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          Skip
        </button>
      </div>

      {/* Session count */}
      <p className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.2)' }}>
        {sessions} session{sessions !== 1 ? 's' : ''} completed
      </p>
    </div>
  );
}
