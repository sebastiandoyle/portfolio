'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface TranscriptOverlayProps {
  transcript: string;
  isListening: boolean;
}

export default function TranscriptOverlay({
  transcript,
  isListening,
}: TranscriptOverlayProps) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none">
      {/* Microphone indicator */}
      {isListening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(139, 92, 246, 0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            <motion.div
              className="absolute -inset-1 rounded-full"
              style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          {!transcript && (
            <span
              className="text-xs"
              style={{ color: 'rgba(139, 92, 246, 0.5)' }}
            >
              Listening...
            </span>
          )}
        </motion.div>
      )}

      {/* Transcript text */}
      <AnimatePresence mode="wait">
        {transcript && (
          <motion.div
            key={transcript}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="px-6 py-3 rounded-2xl max-w-lg text-center"
            style={{
              background: 'rgba(15, 15, 35, 0.7)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(139, 92, 246, 0.15)',
              color: 'rgba(226, 232, 240, 0.8)',
              fontSize: '0.875rem',
            }}
          >
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
