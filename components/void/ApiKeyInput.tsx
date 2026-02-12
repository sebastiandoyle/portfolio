'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useVoidStore } from '@/lib/void-store';

export default function ApiKeyInput() {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const { setApiKey, setPhase } = useVoidStore();

  const handleSubmit = useCallback(() => {
    const trimmed = key.trim();
    if (!trimmed.startsWith('sk-')) {
      setError('API key should start with "sk-"');
      return;
    }
    if (trimmed.length < 20) {
      setError('That key looks too short');
      return;
    }
    setApiKey(trimmed);
    setPhase('listening');
  }, [key, setApiKey, setPhase]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') handleSubmit();
    },
    [handleSubmit]
  );

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col items-center gap-6 px-6 max-w-md w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-center"
        >
          <h2
            className="text-lg font-light mb-2"
            style={{
              color: 'rgba(226, 232, 240, 0.9)',
              letterSpacing: '0.1em',
            }}
          >
            Awaken the Void
          </h2>
          <p
            className="text-sm"
            style={{ color: 'rgba(226, 232, 240, 0.4)' }}
          >
            An OpenAI API key gives the Void its voice
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full"
        >
          <div
            className="relative rounded-lg overflow-hidden"
            style={{
              border: '1px solid rgba(139, 92, 246, 0.2)',
              background: 'rgba(15, 15, 35, 0.8)',
            }}
          >
            <input
              type="password"
              value={key}
              onChange={(e) => {
                setKey(e.target.value);
                setError('');
              }}
              onKeyDown={handleKeyDown}
              placeholder="sk-..."
              className="w-full px-4 py-3 bg-transparent text-sm outline-none"
              style={{
                color: '#e2e8f0',
                caretColor: '#8B5CF6',
              }}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200"
              style={{
                background: key.trim()
                  ? 'rgba(139, 92, 246, 0.3)'
                  : 'rgba(139, 92, 246, 0.1)',
                color: key.trim()
                  ? 'rgba(226, 232, 240, 0.9)'
                  : 'rgba(226, 232, 240, 0.3)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
              }}
            >
              Enter
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs mt-2 text-center"
              style={{ color: '#F87171' }}
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-xs text-center"
          style={{ color: 'rgba(226, 232, 240, 0.25)' }}
        >
          Your key stays in your browser. Never sent to any server.
        </motion.p>
      </motion.div>
    </div>
  );
}
