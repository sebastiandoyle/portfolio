'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoidStore } from '@/lib/void-store';

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const setPhase = useVoidStore((s) => s.setPhase);

  useEffect(() => {
    const timings = [2000, 1000, 3000, 3500, 3500, 3500, 2000, 500];
    let timer: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const advance = () => {
      if (currentStep >= timings.length) {
        setPhase('apikey');
        return;
      }
      timer = setTimeout(() => {
        currentStep++;
        setStep(currentStep);
        advance();
      }, timings[currentStep]);
    };

    advance();
    return () => clearTimeout(timer);
  }, [setPhase]);

  const demos = [
    {
      prompt: 'Someone said: "I need inspiration"',
      label: 'Inspiration Quote',
      color: '#F59E0B',
    },
    {
      prompt: 'Someone said: "I feel anxious"',
      label: 'Breathing Exercise',
      color: '#06B6D4',
    },
    {
      prompt: 'Someone said: "Quiz me on capitals"',
      label: 'Bespoke Quiz',
      color: '#8B5CF6',
    },
  ];

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        {/* Step 1: Single star */}
        {step >= 1 && step < 7 && (
          <motion.div
            key="star"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute"
            style={{ top: '40%' }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background: '#fff',
                boxShadow:
                  '0 0 20px rgba(255,255,255,0.6), 0 0 60px rgba(139,92,246,0.3)',
              }}
            />
          </motion.div>
        )}

        {/* Step 2: Title */}
        {step >= 2 && step < 7 && (
          <motion.h1
            key="title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute text-center"
            style={{
              top: '45%',
              letterSpacing: '0.3em',
              fontSize: 'clamp(0.75rem, 2vw, 1rem)',
              color: 'rgba(226, 232, 240, 0.7)',
              fontWeight: 300,
              textTransform: 'uppercase',
            }}
          >
            The Void is Listening
          </motion.h1>
        )}

        {/* Steps 3-5: Demo components */}
        {step >= 3 && step <= 5 && (
          <motion.div
            key={`demo-${step}`}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(5px)' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute flex flex-col items-center gap-4"
            style={{ top: '52%' }}
          >
            <p
              className="text-sm italic"
              style={{ color: 'rgba(226, 232, 240, 0.5)' }}
            >
              {demos[step - 3].prompt}
            </p>
            <div
              className="rounded-xl px-8 py-5"
              style={{
                background: '#0F0F23',
                border: `1px solid ${demos[step - 3].color}40`,
                boxShadow: `0 0 30px ${demos[step - 3].color}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
                minWidth: '240px',
                textAlign: 'center',
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: demos[step - 3].color }}
              >
                {demos[step - 3].label}
              </span>
              <div className="mt-2 flex gap-1 justify-center">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: demos[step - 3].color }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
