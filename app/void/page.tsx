'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useVoidStore } from '@/lib/void-store';
import VoidCanvas from '@/components/void/VoidCanvas';
import Onboarding from '@/components/void/Onboarding';
import ApiKeyInput from '@/components/void/ApiKeyInput';
import TranscriptOverlay from '@/components/void/TranscriptOverlay';
import VoidMessage from '@/components/void/VoidMessage';
import ComponentGrid from '@/components/void/ComponentGrid';
import { useMicrophone } from '@/hooks/useMicrophone';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useVoidAI } from '@/hooks/useVoidAI';

export default function VoidPage() {
  const phase = useVoidStore((s) => s.phase);
  const setPhase = useVoidStore((s) => s.setPhase);
  const transcript = useVoidStore((s) => s.transcript);
  const setTranscript = useVoidStore((s) => s.setTranscript);
  const voidMessage = useVoidStore((s) => s.voidMessage);
  const setVoidMessage = useVoidStore((s) => s.setVoidMessage);
  const isProcessing = useVoidStore((s) => s.isProcessing);

  const { amplitude, start: startMic, stop: stopMic } = useMicrophone();
  const { processTranscript } = useVoidAI();

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

  // Start mic + speech when entering listening phase
  useEffect(() => {
    if (phase === 'listening') {
      startMic();
      startSpeech();
      return () => {
        stopMic();
        stopSpeech();
      };
    }
  }, [phase, startMic, stopMic, startSpeech, stopSpeech]);

  const handleVoidMessageDone = useCallback(() => {
    setVoidMessage(null);
  }, [setVoidMessage]);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#050510', cursor: 'default' }}
    >
      {/* Star field + orb - always visible */}
      <VoidCanvas amplitude={amplitude} isProcessing={isProcessing} />

      {/* Onboarding sequence */}
      {phase === 'onboarding' && <Onboarding />}

      {/* API key input */}
      {phase === 'apikey' && <ApiKeyInput />}

      {/* Active listening state */}
      {phase === 'listening' && (
        <>
          <ComponentGrid />
          <VoidMessage message={voidMessage} onDone={handleVoidMessageDone} />
          <TranscriptOverlay transcript={transcript} isListening={isListening} />
        </>
      )}

      {/* Subtle back link */}
      {phase !== 'darkness' && phase !== 'onboarding' && (
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
