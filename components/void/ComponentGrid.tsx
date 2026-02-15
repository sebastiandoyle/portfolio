'use client';

import { AnimatePresence } from 'framer-motion';
import { useVoidStore } from '@/lib/void-store';
import ComponentShell from './ComponentShell';
import BespokeRenderer from './BespokeRenderer';

import MeditationGuide from './predefined/MeditationGuide';
import KanbanBoard from './predefined/KanbanBoard';
import InspirationQuote from './predefined/InspirationQuote';
import BookList from './predefined/BookList';
import BreathingExercise from './predefined/BreathingExercise';
import HabitTracker from './predefined/HabitTracker';
import JournalPrompt from './predefined/JournalPrompt';
import FocusTimer from './predefined/FocusTimer';
import GoalTree from './predefined/GoalTree';
import AffirmationCard from './predefined/AffirmationCard';

/* eslint-disable @typescript-eslint/no-explicit-any */
const predefinedMap: Record<string, React.ComponentType<any>> = {
  MeditationGuide,
  KanbanBoard,
  InspirationQuote,
  BookList,
  BreathingExercise,
  HabitTracker,
  JournalPrompt,
  FocusTimer,
  GoalTree,
  AffirmationCard,
};

export default function ComponentGrid() {
  const { components, removeComponent } = useVoidStore();

  if (components.length === 0) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto pt-20 pb-24 px-4 md:px-8">
      <style>{`
        .void-masonry {
          columns: 1;
          column-gap: 1rem;
        }
        @media (min-width: 640px) {
          .void-masonry { columns: 2; }
        }
        @media (min-width: 1024px) {
          .void-masonry { columns: 3; }
        }
      `}</style>
      <div className="void-masonry max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {components.map((component) => {
            const Component = predefinedMap[component.name];
            return (
              <ComponentShell
                key={component.id}
                layoutId={component.id}
                mood={component.mood}
                name={component.name}
                onRemove={() => removeComponent(component.id)}
              >
                {component.type === 'predefined' && Component && (
                  <Component {...component.props} />
                )}
                {component.type === 'bespoke' && component.html && (
                  <BespokeRenderer html={component.html} />
                )}
              </ComponentShell>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
