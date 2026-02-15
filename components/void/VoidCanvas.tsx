'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { CanvasMode } from '@/lib/void-store';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface VoidCanvasProps {
  amplitude: number;
  isProcessing?: boolean;
  canvasMode?: CanvasMode;
}

export default function VoidCanvas({
  amplitude,
  isProcessing = false,
  canvasMode = 'normal',
}: VoidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const smoothAmplitudeRef = useRef<number>(0);
  const modeSpeedRef = useRef<number>(1);
  const modeOpacityRef = useRef<number>(1);
  const modeOrbScaleRef = useRef<number>(1);

  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    for (let i = 0; i < 300; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.6,
        speed: 0.1 + Math.random() * 0.3,
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initStars(window.innerWidth, window.innerHeight);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const time = timeRef.current;

      // Lerp mode parameters
      let targetSpeed = 1;
      let targetOpacity = 1;
      let targetOrbScale = 1;

      switch (canvasMode) {
        case 'accelerating':
          targetSpeed = 4;
          targetOpacity = 1;
          targetOrbScale = 1.5;
          break;
        case 'settling':
          targetSpeed = 0.02;
          targetOpacity = 0.6;
          targetOrbScale = 0.4;
          break;
        case 'fading':
          targetSpeed = 0.01;
          targetOpacity = 0;
          targetOrbScale = 0;
          break;
      }

      modeSpeedRef.current += (targetSpeed - modeSpeedRef.current) * 0.04;
      modeOpacityRef.current += (targetOpacity - modeOpacityRef.current) * 0.04;
      modeOrbScaleRef.current += (targetOrbScale - modeOrbScaleRef.current) * 0.04;

      const mSpeed = modeSpeedRef.current;
      const mOpacity = modeOpacityRef.current;
      const mOrbScale = modeOrbScaleRef.current;

      // Smooth amplitude
      const targetAmp = amplitude;
      smoothAmplitudeRef.current +=
        (targetAmp - smoothAmplitudeRef.current) * 0.08;
      const amp = smoothAmplitudeRef.current;

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const star of starsRef.current) {
        star.y += star.speed * mSpeed;
        if (star.y > h) {
          star.y = 0;
          star.x = Math.random() * w;
        }

        // Subtle parallax: stars further from center drift more
        const dx = star.x - w / 2;
        const dy = star.y - h / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt((w / 2) ** 2 + (h / 2) ** 2);
        const parallax = 0.5 + (dist / maxDist) * 0.5;

        const drawX = star.x + dx * amp * 0.02 * parallax;
        const drawY = star.y + dy * amp * 0.02 * parallax;

        const twinkle =
          Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle * mOpacity})`;
        ctx.fill();
      }

      // Central orb
      const cx = w / 2;
      const cy = h / 2;

      const pulseFreq = canvasMode === 'accelerating' ? 3 : 1.5;
      const pulseAmp = canvasMode === 'accelerating' ? 0.2 : 0.1;
      const basePulse = 1.0 + Math.sin(time * pulseFreq) * pulseAmp;
      const ampScale = 1.0 + amp * 1.0;
      const scale = basePulse * ampScale * mOrbScale;
      const baseRadius = Math.min(w, h) * 0.06;
      const radius = baseRadius * scale;

      if (radius > 0.5) {
        // Outer glow layers
        const glowLayers = canvasMode === 'accelerating' ? 6 : 5;
        for (let i = glowLayers - 1; i >= 0; i--) {
          const glowRadius = radius * (1 + i * 0.6);
          const alpha = (canvasMode === 'accelerating' ? 0.05 : 0.03) - i * 0.005;
          if (alpha <= 0) continue;
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${alpha * mOpacity})`);
          gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
          ctx.beginPath();
          ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        // Main orb
        const orbGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        orbGradient.addColorStop(0, `rgba(167, 139, 250, ${(0.6 + amp * 0.4) * mOpacity})`);
        orbGradient.addColorStop(0.5, `rgba(139, 92, 246, ${(0.3 + amp * 0.3) * mOpacity})`);
        orbGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = orbGradient;
        ctx.fill();

        // Processing ripples
        if (isProcessing && canvasMode === 'normal') {
          for (let r = 0; r < 3; r++) {
            const ripplePhase = (time * 2 + r * 2.1) % 6;
            const rippleRadius = radius + ripplePhase * baseRadius * 0.8;
            const rippleAlpha = Math.max(0, 0.3 - ripplePhase * 0.05);
            ctx.beginPath();
            ctx.arc(cx, cy, rippleRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(139, 92, 246, ${rippleAlpha * mOpacity})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        // Inner bright core
        const coreGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.3);
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${(0.15 + amp * 0.2) * mOpacity})`);
        coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = coreGradient;
        ctx.fill();

        // Orbital particles when processing
        if (isProcessing && canvasMode === 'normal') {
          const spinAngle = time * 3;
          for (let p = 0; p < 6; p++) {
            const angle = spinAngle + (p * Math.PI * 2) / 6;
            const orbitRadius = radius * 1.5;
            const px = cx + Math.cos(angle) * orbitRadius;
            const py = cy + Math.sin(angle) * orbitRadius;
            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${0.6 * mOpacity})`;
            ctx.fill();
          }
        }
      }

      timeRef.current += 0.016;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [amplitude, isProcessing, canvasMode, initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ background: '#050510' }}
    />
  );
}
