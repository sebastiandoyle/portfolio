'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoidMessageProps {
  message: string | null;
  onDone?: () => void;
}

export default function VoidMessage({ message, onDone }: VoidMessageProps) {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const charTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (message && message !== prevMessageRef.current) {
      prevMessageRef.current = message;
      setIsVisible(true);
      setDisplayText('');

      // Clear existing timers
      if (timerRef.current) clearTimeout(timerRef.current);
      if (charTimerRef.current) clearInterval(charTimerRef.current);

      // Typewriter effect
      let index = 0;
      charTimerRef.current = setInterval(() => {
        index++;
        if (index <= message.length) {
          setDisplayText(message.slice(0, index));
        } else {
          if (charTimerRef.current) clearInterval(charTimerRef.current);

          // Auto-fade after 5 seconds
          timerRef.current = setTimeout(() => {
            setIsVisible(false);
            if (onDone) onDone();
          }, 5000);
        }
      }, 35);
    }

    if (!message) {
      setIsVisible(false);
      prevMessageRef.current = null;
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (charTimerRef.current) clearInterval(charTimerRef.current);
    };
  }, [message, onDone]);

  return (
    <div
      className="fixed z-30 left-1/2 -translate-x-1/2 pointer-events-none"
      style={{ top: '28%' }}
    >
      <AnimatePresence>
        {isVisible && displayText && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg px-6"
            style={{
              color: 'rgba(226, 232, 240, 0.75)',
              fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
              fontWeight: 300,
              letterSpacing: '0.02em',
              lineHeight: 1.6,
              textShadow: '0 0 30px rgba(139, 92, 246, 0.2)',
            }}
          >
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ color: 'rgba(139, 92, 246, 0.5)' }}
            >
              |
            </motion.span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
