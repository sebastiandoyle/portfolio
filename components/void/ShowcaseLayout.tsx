'use client';

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

function noop() {}

export default function ShowcaseLayout() {
  const components = useVoidStore((s) => s.components);

  if (components.length === 0) return null;

  const [hero, ...rest] = components;
  const features = rest.slice(0, 2);
  const cards = rest.slice(2);

  const renderComponent = (c: typeof components[0]) => {
    const Component = predefinedMap[c.name];
    return (
      <>
        {c.type === 'predefined' && Component && <Component {...c.props} />}
        {c.type === 'bespoke' && c.html && <BespokeRenderer html={c.html} />}
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto pt-12 pb-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero - first component, full width */}
        <ComponentShell
          key={hero.id}
          layoutId={hero.id}
          mood={hero.mood}
          name={hero.name}
          onRemove={noop}
          readOnly
        >
          {renderComponent(hero)}
        </ComponentShell>

        {/* Features - 2-column grid */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((c) => (
              <ComponentShell
                key={c.id}
                layoutId={c.id}
                mood={c.mood}
                name={c.name}
                onRemove={noop}
                readOnly
              >
                {renderComponent(c)}
              </ComponentShell>
            ))}
          </div>
        )}

        {/* Cards - 3-column grid */}
        {cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((c) => (
              <ComponentShell
                key={c.id}
                layoutId={c.id}
                mood={c.mood}
                name={c.name}
                onRemove={noop}
                readOnly
              >
                {renderComponent(c)}
              </ComponentShell>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
