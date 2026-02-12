'use client';

import { useState, useCallback } from 'react';

interface Habit {
  name: string;
  emoji: string;
}

interface HabitTrackerProps {
  habits?: Habit[];
}

const defaultHabits: Habit[] = [
  { name: 'Exercise', emoji: '💪' },
  { name: 'Read', emoji: '📖' },
  { name: 'Meditate', emoji: '🧘' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTracker({ habits: initialHabits }: HabitTrackerProps) {
  const displayHabits = initialHabits && initialHabits.length > 0 ? initialHabits : defaultHabits;

  const [checked, setChecked] = useState<Record<string, boolean[]>>(() => {
    const initial: Record<string, boolean[]> = {};
    for (const h of displayHabits) {
      initial[h.name] = new Array(7).fill(false);
    }
    return initial;
  });

  const toggle = useCallback((habitName: string, dayIdx: number) => {
    setChecked((prev) => {
      const next = { ...prev };
      const arr = [...(next[habitName] || new Array(7).fill(false))];
      arr[dayIdx] = !arr[dayIdx];
      next[habitName] = arr;
      return next;
    });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Day headers */}
      <div className="flex items-center gap-1 pl-[110px]">
        {days.map((d) => (
          <span
            key={d}
            className="flex-1 text-center text-xs"
            style={{ color: 'rgba(226, 232, 240, 0.3)', minWidth: 28 }}
          >
            {d}
          </span>
        ))}
      </div>

      {/* Habits */}
      {displayHabits.map((habit) => {
        const habitChecks = checked[habit.name] || new Array(7).fill(false);
        const completedCount = habitChecks.filter(Boolean).length;
        const progressPercent = (completedCount / 7) * 100;

        return (
          <div key={habit.name} className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              {/* Habit name */}
              <div
                className="flex items-center gap-1.5 shrink-0"
                style={{ width: 110 }}
              >
                <span style={{ fontSize: '14px' }}>{habit.emoji}</span>
                <span
                  className="text-xs truncate"
                  style={{ color: 'rgba(226, 232, 240, 0.7)' }}
                >
                  {habit.name}
                </span>
              </div>

              {/* Checkboxes */}
              {days.map((_, dayIdx) => (
                <button
                  key={dayIdx}
                  onClick={() => toggle(habit.name, dayIdx)}
                  className="flex-1 flex items-center justify-center transition-colors"
                  style={{ minWidth: 28, height: 28 }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                    style={{
                      background: habitChecks[dayIdx]
                        ? 'rgba(34, 197, 94, 0.25)'
                        : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${
                        habitChecks[dayIdx]
                          ? 'rgba(34, 197, 94, 0.4)'
                          : 'rgba(255,255,255,0.08)'
                      }`,
                    }}
                  >
                    {habitChecks[dayIdx] && (
                      <svg
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        stroke="rgba(34, 197, 94, 0.9)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 4L3.5 6.5L9 1" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-2 pl-[110px]">
              <div
                className="flex-1 h-1 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progressPercent}%`,
                    background: 'rgba(34, 197, 94, 0.5)',
                  }}
                />
              </div>
              <span
                className="text-xs shrink-0"
                style={{
                  color: 'rgba(226, 232, 240, 0.25)',
                  fontSize: '10px',
                  width: '28px',
                  textAlign: 'right',
                }}
              >
                {completedCount}/7
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
