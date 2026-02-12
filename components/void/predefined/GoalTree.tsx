'use client';

import { useState, useCallback } from 'react';

interface SubGoal {
  name: string;
  tasks: string[];
}

interface GoalTreeProps {
  goal?: string;
  subgoals?: SubGoal[];
}

const defaultGoal = 'Launch a product';
const defaultSubgoals: SubGoal[] = [
  { name: 'Design', tasks: ['Wireframes', 'Visual design', 'Prototyping'] },
  { name: 'Development', tasks: ['Frontend', 'Backend', 'Testing'] },
  { name: 'Launch', tasks: ['Marketing page', 'Announce', 'Gather feedback'] },
];

export default function GoalTree({
  goal = defaultGoal,
  subgoals = defaultSubgoals,
}: GoalTreeProps) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  const toggleTask = useCallback((subgoalIdx: number, taskIdx: number) => {
    const key = `${subgoalIdx}-${taskIdx}`;
    setCompleted((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const totalTasks = subgoals.reduce((sum, sg) => sum + sg.tasks.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      {/* Root goal */}
      <div className="flex flex-col items-center gap-1">
        <div
          className="px-4 py-2 rounded-lg text-center"
          style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          <span className="text-sm font-medium" style={{ color: 'rgba(245, 158, 11, 0.9)' }}>
            {goal}
          </span>
        </div>
        <span className="text-xs" style={{ color: 'rgba(226, 232, 240, 0.2)' }}>
          {completedCount}/{totalTasks} tasks
        </span>
        {/* Connector line down */}
        <div
          className="w-px h-4"
          style={{ background: 'rgba(245, 158, 11, 0.15)' }}
        />
      </div>

      {/* Sub-goals */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {subgoals.map((sg, sIdx) => {
          const sgCompleted = sg.tasks.filter((_, tIdx) => completed[`${sIdx}-${tIdx}`]).length;
          const sgProgress = sg.tasks.length > 0 ? sgCompleted / sg.tasks.length : 0;

          return (
            <div key={sIdx} className="flex-1 min-w-[130px] flex flex-col items-center gap-2">
              {/* Connector line up */}
              <div
                className="w-px h-2"
                style={{ background: 'rgba(245, 158, 11, 0.15)' }}
              />

              {/* Sub-goal node */}
              <div
                className="w-full px-3 py-1.5 rounded-md text-center"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid rgba(245, 158, 11, ${0.08 + sgProgress * 0.15})`,
                }}
              >
                <span className="text-xs font-medium" style={{ color: 'rgba(226, 232, 240, 0.7)' }}>
                  {sg.name}
                </span>
              </div>

              {/* Connector line */}
              <div
                className="w-px h-2"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              />

              {/* Tasks */}
              <div className="flex flex-col gap-1.5 w-full">
                {sg.tasks.map((task, tIdx) => {
                  const key = `${sIdx}-${tIdx}`;
                  const isDone = completed[key];

                  return (
                    <button
                      key={tIdx}
                      onClick={() => toggleTask(sIdx, tIdx)}
                      className="flex items-center gap-2 text-left w-full px-2 py-1 rounded transition-colors"
                      style={{
                        background: isDone
                          ? 'rgba(34, 197, 94, 0.06)'
                          : 'transparent',
                      }}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded shrink-0 flex items-center justify-center"
                        style={{
                          border: `1px solid ${
                            isDone
                              ? 'rgba(34, 197, 94, 0.4)'
                              : 'rgba(255,255,255,0.1)'
                          }`,
                          background: isDone ? 'rgba(34, 197, 94, 0.15)' : 'transparent',
                        }}
                      >
                        {isDone && (
                          <svg
                            width="8"
                            height="6"
                            viewBox="0 0 8 6"
                            fill="none"
                            stroke="rgba(34, 197, 94, 0.9)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 3L3 5L7 1" />
                          </svg>
                        )}
                      </div>
                      <span
                        className="text-xs"
                        style={{
                          color: isDone
                            ? 'rgba(226, 232, 240, 0.35)'
                            : 'rgba(226, 232, 240, 0.55)',
                          textDecoration: isDone ? 'line-through' : 'none',
                        }}
                      >
                        {task}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
