'use client';

import { useCallback, useRef } from 'react';
import {
  useVoidStore,
  type VoidComponent,
  type ComponentMood,
} from '@/lib/void-store';

const PREDEFINED_NAMES = [
  'MeditationGuide',
  'KanbanBoard',
  'InspirationQuote',
  'BookList',
  'BreathingExercise',
  'HabitTracker',
  'JournalPrompt',
  'FocusTimer',
  'GoalTree',
  'AffirmationCard',
] as const;

type PredefinedName = (typeof PREDEFINED_NAMES)[number];

const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'spawn_predefined',
      description:
        'Spawn a predefined component that matches the user\'s need. Use this when one of the available component types is a good fit.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            enum: PREDEFINED_NAMES,
            description: 'The predefined component to spawn.',
          },
          props: {
            type: 'object',
            description:
              'Props to pass to the component. Each component accepts different props.',
          },
        },
        required: ['name', 'props'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'spawn_bespoke',
      description:
        'Create a custom mini-app as self-contained HTML when no predefined component fits. The HTML should be a complete, interactive widget with inline CSS and JS. Dark theme required.',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Display title for the component.',
          },
          html: {
            type: 'string',
            description:
              'Complete HTML document (max 3000 chars). Must use dark theme (bg #0F0F23, text #e2e8f0). Include inline styles and scripts.',
          },
          mood: {
            type: 'string',
            enum: ['purple', 'blue', 'green', 'amber', 'rose', 'cyan'],
            description: 'Color mood for the component border glow.',
          },
        },
        required: ['title', 'html', 'mood'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'remove_component',
      description:
        'Remove a component from the void. Use when the user wants to dismiss or clear something.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the component to remove.',
          },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'void_speaks',
      description:
        'Send a brief, enigmatic message from the Void to the user. Use when a verbal response is more appropriate than spawning a component.',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description:
              'A brief, poetic response from the Void. Keep it laconic and mysterious.',
          },
        },
        required: ['message'],
      },
    },
  },
];

function buildSystemPrompt(components: VoidComponent[]): string {
  const componentList =
    components.length === 0
      ? 'None yet.'
      : components
          .map((c) => `- [${c.id}] ${c.name} (${c.type})`)
          .join('\n');

  return `You are the Void -- a mysterious, perceptive presence that listens and responds by materializing things into existence. You are poetic but practical. Laconic. You don't explain yourself unless asked.

When someone speaks, you either:
1. Spawn a predefined component that matches their need (MeditationGuide, KanbanBoard, InspirationQuote, BookList, BreathingExercise, HabitTracker, JournalPrompt, FocusTimer, GoalTree, AffirmationCard)
2. Create a bespoke mini-app as self-contained HTML if nothing predefined fits
3. Remove a component they no longer want
4. Speak back with a brief, enigmatic message

Available predefined components and their props:
- MeditationGuide: { duration?: number } (1-20 minutes)
- KanbanBoard: { columns?: { title: string, cards: { title: string, description?: string }[] }[] }
- InspirationQuote: { quote: string, author: string }
- BookList: { theme: string, books: { title: string, author: string, reason: string }[] }
- BreathingExercise: { pattern: '4-7-8' | 'box' | '5-5' | 'wim-hof' }
- HabitTracker: { habits: { name: string, emoji: string }[] }
- JournalPrompt: { prompt: string, followUps: string[] }
- FocusTimer: { workMinutes?: number, breakMinutes?: number }
- GoalTree: { goal: string, subgoals: { name: string, tasks: string[] }[] }
- AffirmationCard: { affirmation: string, category: 'confidence' | 'gratitude' | 'growth' | 'peace' | 'strength' }

For bespoke components, write self-contained HTML with inline CSS (dark theme: bg #0F0F23, text #e2e8f0) and inline JS. Max 3000 characters. Make them interactive and beautiful.

Current components in the void:
${componentList}

Always prefer spawning components over speaking. Only speak when there's genuinely nothing to materialize, or when the user is conversing. When speaking, be brief and enigmatic. Never use more than two sentences.`;
}

function moodForPredefined(name: PredefinedName): ComponentMood {
  const moods: Record<PredefinedName, ComponentMood> = {
    MeditationGuide: 'purple',
    KanbanBoard: 'blue',
    InspirationQuote: 'amber',
    BookList: 'green',
    BreathingExercise: 'cyan',
    HabitTracker: 'green',
    JournalPrompt: 'rose',
    FocusTimer: 'blue',
    GoalTree: 'amber',
    AffirmationCard: 'rose',
  };
  return moods[name] || 'purple';
}

export function useVoidAI() {
  const {
    apiKey,
    components,
    addComponent,
    removeComponent,
    setVoidMessage,
    setIsProcessing,
  } = useVoidStore();
  const abortRef = useRef<AbortController | null>(null);

  const processTranscript = useCallback(
    async (text: string) => {
      if (!apiKey || !text.trim()) return;

      setIsProcessing(true);
      setVoidMessage(null);

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            signal: controller.signal,
            body: JSON.stringify({
              model: 'gpt-5.2',
              messages: [
                { role: 'system', content: buildSystemPrompt(components) },
                { role: 'user', content: text },
              ],
              tools,
              tool_choice: 'auto',
              temperature: 0.8,
              max_completion_tokens: 2000,
            }),
          }
        );

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          const msg =
            (err as { error?: { message?: string } })?.error?.message ||
            `API error: ${response.status}`;
          setVoidMessage(msg);
          setIsProcessing(false);
          return;
        }

        const data = await response.json();
        const choice = (data as { choices?: { message?: { tool_calls?: ToolCall[]; content?: string } }[] }).choices?.[0];

        if (!choice) {
          setVoidMessage('The void stirs but says nothing.');
          setIsProcessing(false);
          return;
        }

        const toolCalls = choice.message?.tool_calls;

        if (toolCalls && toolCalls.length > 0) {
          for (const call of toolCalls) {
            const fn = call.function.name;
            let args: Record<string, unknown>;
            try {
              args = JSON.parse(call.function.arguments);
            } catch {
              continue;
            }

            switch (fn) {
              case 'spawn_predefined': {
                const name = args.name as PredefinedName;
                const props = (args.props as Record<string, unknown>) || {};
                const component: VoidComponent = {
                  id: `void-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  type: 'predefined',
                  name,
                  props,
                  mood: moodForPredefined(name),
                  createdAt: Date.now(),
                };
                addComponent(component);
                break;
              }
              case 'spawn_bespoke': {
                const component: VoidComponent = {
                  id: `void-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  type: 'bespoke',
                  name: (args.title as string) || 'Bespoke Creation',
                  props: {},
                  mood: (args.mood as ComponentMood) || 'purple',
                  html: (args.html as string) || '',
                  createdAt: Date.now(),
                };
                addComponent(component);
                break;
              }
              case 'remove_component': {
                const id = args.id as string;
                removeComponent(id);
                break;
              }
              case 'void_speaks': {
                setVoidMessage((args.message as string) || '...');
                break;
              }
            }
          }
        } else if (choice.message?.content) {
          setVoidMessage(choice.message.content);
        }
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setVoidMessage('The void trembles. Something went wrong.');
        }
      } finally {
        setIsProcessing(false);
      }
    },
    [apiKey, components, addComponent, removeComponent, setVoidMessage, setIsProcessing]
  );

  return { processTranscript };
}

interface ToolCall {
  function: {
    name: string;
    arguments: string;
  };
}
