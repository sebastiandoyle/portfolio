import { create } from 'zustand';

export type VoidPhase = 'darkness' | 'onboarding' | 'apikey' | 'listening' | 'transformation' | 'showcase' | 'bridge';

export type ComponentMood = 'purple' | 'blue' | 'green' | 'amber' | 'rose' | 'cyan';

export type CanvasMode = 'normal' | 'accelerating' | 'settling' | 'fading';

export interface VoidComponent {
  id: string;
  type: 'predefined' | 'bespoke';
  name: string;
  props: Record<string, unknown>;
  mood: ComponentMood;
  html?: string;
  createdAt: number;
}

interface VoidState {
  phase: VoidPhase;
  apiKey: string;
  components: VoidComponent[];
  transcript: string;
  voidMessage: string | null;
  isProcessing: boolean;
  interactionCount: number;
  listeningStartedAt: number | null;
  canvasMode: CanvasMode;

  setPhase: (phase: VoidPhase) => void;
  setApiKey: (key: string) => void;
  addComponent: (component: VoidComponent) => void;
  removeComponent: (id: string) => void;
  setTranscript: (text: string) => void;
  setVoidMessage: (msg: string | null) => void;
  setIsProcessing: (v: boolean) => void;
  incrementInteraction: () => void;
  setListeningStartedAt: (time: number | null) => void;
  setCanvasMode: (mode: CanvasMode) => void;
}

export const useVoidStore = create<VoidState>((set) => ({
  phase: 'darkness',
  apiKey: '',
  components: [],
  transcript: '',
  voidMessage: null,
  isProcessing: false,
  interactionCount: 0,
  listeningStartedAt: null,
  canvasMode: 'normal',

  setPhase: (phase) => set({ phase }),
  setApiKey: (apiKey) => set({ apiKey }),
  addComponent: (component) =>
    set((s) => ({ components: [...s.components, component] })),
  removeComponent: (id) =>
    set((s) => ({ components: s.components.filter((c) => c.id !== id) })),
  setTranscript: (transcript) => set({ transcript }),
  setVoidMessage: (voidMessage) => set({ voidMessage }),
  setIsProcessing: (isProcessing) => set({ isProcessing }),
  incrementInteraction: () =>
    set((s) => ({ interactionCount: s.interactionCount + 1 })),
  setListeningStartedAt: (listeningStartedAt) => set({ listeningStartedAt }),
  setCanvasMode: (canvasMode) => set({ canvasMode }),
}));
