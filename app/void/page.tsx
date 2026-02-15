'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import { useVoidStore } from '@/lib/void-store';
import VoidCanvas from '@/components/void/VoidCanvas';
import Onboarding from '@/components/void/Onboarding';
import ApiKeyInput from '@/components/void/ApiKeyInput';
import TranscriptOverlay from '@/components/void/TranscriptOverlay';
import VoidMessage from '@/components/void/VoidMessage';
import ComponentGrid from '@/components/void/ComponentGrid';
import ShowcaseLayout from '@/components/void/ShowcaseLayout';
import VoidShowcase from '@/components/void/VoidShowcase';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useVoidAI } from '@/hooks/useVoidAI';

const FAREWELL_MESSAGES = [
  "What you've spoken into being... it's ready to become something more.",
  'The fragments converge. Watch what they become.',
  'From chaos, form. From voice, vision.',
  "You've given me enough. Now let me show you what it means.",
];

function randomFarewell() {
  return FAREWELL_MESSAGES[Math.floor(Math.random() * FAREWELL_MESSAGES.length)];
}

export default function VoidPage() {
  const router = useRouter();
  const phase = useVoidStore((s) => s.phase);
  const setPhase = useVoidStore((s) => s.setPhase);
  const transcript = useVoidStore((s) => s.transcript);
  const setTranscript = useVoidStore((s) => s.setTranscript);
  const voidMessage = useVoidStore((s) => s.voidMessage);
  const setVoidMessage = useVoidStore((s) => s.setVoidMessage);
  const isProcessing = useVoidStore((s) => s.isProcessing);
  const interactionCount = useVoidStore((s) => s.interactionCount);
  const components = useVoidStore((s) => s.components);
  const canvasMode = useVoidStore((s) => s.canvasMode);
  const setCanvasMode = useVoidStore((s) => s.setCanvasMode);
  const listeningStartedAt = useVoidStore((s) => s.listeningStartedAt);
  const setListeningStartedAt = useVoidStore((s) => s.setListeningStartedAt);

  const { amplitude, start: startMic, stop: stopMic } = useMicrophone();
  const { processTranscript } = useVoidAI();

  const transformingRef = useRef(false);
  const [bridgeFade, setBridgeFade] = useState(false);

  const onFinalTranscript = useCallback(
    (text: string) => {
      processTranscript(text);
    },
    [processTranscript]
  );

  const {
    transcript: speechTranscript,
    isListening,
    start: startSpeech,
    stop: stopSpeech,
  } = useSpeechRecognition(onFinalTranscript);

  // Keep store transcript in sync
  useEffect(() => {
    setTranscript(speechTranscript);
  }, [speechTranscript, setTranscript]);

  // Auto-advance from darkness to onboarding
  const advancedRef = useRef(false);
  useEffect(() => {
    if (phase === 'darkness' && !advancedRef.current) {
      advancedRef.current = true;
      const timer = setTimeout(() => setPhase('onboarding'), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, setPhase]);

  // Start mic + speech when entering listening phase + set timer
  useEffect(() => {
    if (phase === 'listening') {
      startMic();
      startSpeech();
      setListeningStartedAt(Date.now());
      return () => {
        stopMic();
        stopSpeech();
      };
    }
  }, [phase, startMic, stopMic, startSpeech, stopSpeech, setListeningStartedAt]);

  // Transformation trigger
  useEffect(() => {
    if (phase !== 'listening' || transformingRef.current) return;

    const enoughComponents = components.length >= 3;
    const enoughInteractions = interactionCount >= 5;
    const enoughTime = listeningStartedAt
      ? Date.now() - listeningStartedAt >= 90000
      : false;

    if (enoughComponents && (enoughInteractions || enoughTime)) {
      triggerTransformation();
    }

    // Also check on a timer for the 90-second condition
    if (!enoughComponents) return;

    const interval = setInterval(() => {
      if (transformingRef.current) return;
      const store = useVoidStore.getState();
      const hasEnough = store.components.length >= 3;
      const timeOk = store.listeningStartedAt
        ? Date.now() - store.listeningStartedAt >= 90000
        : false;
      const interOk = store.interactionCount >= 5;

      if (hasEnough && (interOk || timeOk)) {
        triggerTransformation();
      }
    }, 2000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, interactionCount, components.length, listeningStartedAt]);

  const triggerTransformation = useCallback(() => {
    if (transformingRef.current) return;
    transformingRef.current = true;

    // 0s: Stop mic/speech, show farewell
    stopMic();
    stopSpeech();
    setVoidMessage(randomFarewell());

    // 3s: Fade message, accelerate canvas
    setTimeout(() => {
      setVoidMessage(null);
      setCanvasMode('accelerating');
    }, 3000);

    // 4s: Phase → transformation (unmounts ComponentGrid, mounts ShowcaseLayout)
    setTimeout(() => {
      setPhase('transformation');
    }, 4000);

    // 7s: Settle canvas
    setTimeout(() => {
      setCanvasMode('settling');
    }, 7000);

    // 8s: Phase → showcase
    setTimeout(() => {
      setPhase('showcase');
    }, 8000);
  }, [stopMic, stopSpeech, setVoidMessage, setCanvasMode, setPhase]);

  const handleVoidMessageDone = useCallback(() => {
    // Only auto-clear in listening phase; transformation manages its own timing
    if (useVoidStore.getState().phase === 'listening') {
      setVoidMessage(null);
    }
  }, [setVoidMessage]);

  const handleBridge = useCallback(() => {
    setCanvasMode('fading');
    setBridgeFade(true);

    setTimeout(() => {
      sessionStorage.setItem('void-bridge', 'true');
      router.push('/#projects');
    }, 2000);
  }, [setCanvasMode, router]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#050510', cursor: 'default' }}
    >
      {/* Star field + orb - always visible */}
      <VoidCanvas amplitude={amplitude} isProcessing={isProcessing} canvasMode={canvasMode} />

      {/* Onboarding sequence */}
      {phase === 'onboarding' && <Onboarding />}

      {/* API key input */}
      {phase === 'apikey' && <ApiKeyInput />}

      {/* Active listening state + transformation layout morph */}
      <LayoutGroup>
        {phase === 'listening' && (
          <>
            <ComponentGrid />
            <VoidMessage message={voidMessage} onDone={handleVoidMessageDone} />
            <TranscriptOverlay transcript={transcript} isListening={isListening} />
          </>
        )}

        {(phase === 'transformation' || phase === 'showcase') && (
          <ShowcaseLayout />
        )}
      </LayoutGroup>

      {/* Farewell message during transformation */}
      {phase === 'transformation' && voidMessage && (
        <VoidMessage message={voidMessage} />
      )}

      {/* Showcase pitch overlay */}
      <AnimatePresence>
        {phase === 'showcase' && (
          <VoidShowcase onBridge={handleBridge} />
        )}
      </AnimatePresence>

      {/* Bridge fade-to-black overlay */}
      <AnimatePresence>
        {bridgeFade && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ background: '#050510' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Subtle back link */}
      {phase !== 'darkness' && phase !== 'onboarding' && phase !== 'showcase' && phase !== 'bridge' && !bridgeFade && (
        <a
          href="/"
          className="fixed top-4 left-4 z-40 text-xs transition-opacity"
          style={{
            color: 'rgba(226, 232, 240, 0.15)',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(226, 232, 240, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(226, 232, 240, 0.15)';
          }}
        >
          &larr; Back
        </a>
      )}
    </main>
  );
}
