'use client';

import { useEffect, useRef, useCallback } from 'react';

// Characters that appear in the rain — mix of katakana, numbers, symbols
const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF@#$%<>/?!';

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  opacity: number;
}

interface Props {
  active: boolean;
  onExit: () => void;
  matrixColor: string; // e.g. "0,255,65" — adapts to theme
}

export default function MatrixRain({ active, onExit, matrixColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dropsRef = useRef<Drop[]>([]);
  const rafRef = useRef<number>(0);
  const fadeInRef = useRef(0);
  const exitingRef = useRef(false);
  const fadeOutRef = useRef(1);

  const buildDrops = useCallback((w: number, h: number) => {
    const cols = Math.ceil(w / 16);
    dropsRef.current = Array.from({ length: cols }, (_, i) => ({
      x: i * 16,
      y: -Math.random() * h,
      speed: 1 + Math.random() * 3,
      length: 8 + Math.floor(Math.random() * 20),
      chars: Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
      opacity: 0.6 + Math.random() * 0.4,
    }));
  }, []);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    exitingRef.current = false;
    fadeInRef.current = 0;
    fadeOutRef.current = 1;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      buildDrops(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Fade in
      if (fadeInRef.current < 1) fadeInRef.current = Math.min(fadeInRef.current + 0.03, 1);
      // Fade out on exit
      if (exitingRef.current) {
        fadeOutRef.current = Math.max(fadeOutRef.current - 0.04, 0);
        if (fadeOutRef.current <= 0) {
          cancelAnimationFrame(rafRef.current);
          window.removeEventListener('resize', resize);
          onExit();
          return;
        }
      }

      const alpha = fadeInRef.current * fadeOutRef.current;

      // Dark overlay
      ctx.fillStyle = `rgba(0,0,0,${0.15})`;
      ctx.fillRect(0, 0, w, h);

      ctx.font = '14px monospace';

      for (const drop of dropsRef.current) {
        // Randomize a character occasionally
        if (Math.random() < 0.05) {
          drop.chars[0] = CHARS[Math.floor(Math.random() * CHARS.length)];
        }

        for (let i = 0; i < drop.length; i++) {
          const charY = drop.y - i * 16;
          if (charY < 0 || charY > h) continue;

          const charIndex = i % drop.chars.length;
          const char = drop.chars[charIndex];

          if (i === 0) {
            // Bright head
            ctx.fillStyle = `rgba(255,255,255,${alpha * drop.opacity})`;
          } else {
            const fade = (1 - i / drop.length);
            ctx.fillStyle = `rgba(${matrixColor},${fade * 0.8 * alpha * drop.opacity})`;
          }
          ctx.fillText(char, drop.x, charY);
        }

        drop.y += drop.speed;

        // Reset drop when it exits bottom
        if (drop.y - drop.length * 16 > h) {
          drop.y = -Math.random() * 200;
          drop.speed = 1 + Math.random() * 3;
          drop.length = 8 + Math.floor(Math.random() * 20);
          drop.chars = Array.from({ length: 30 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Dismiss handlers
    const dismiss = () => { exitingRef.current = true; };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || !exitingRef.current) dismiss();
    };
    window.addEventListener('keydown', handleKey);
    canvas.addEventListener('click', dismiss);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKey);
      canvas.removeEventListener('click', dismiss);
    };
  }, [active, buildDrops, matrixColor, onExit]);

  if (!active) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 8000,
        background: 'rgba(0,0,0,0.92)',
      }}
      aria-label="Matrix rain effect — press any key or click to exit"
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100vw', height: '100vh', imageRendering: 'pixelated' }}
      />
      <div
        style={{
          position: 'absolute', bottom: '32px', right: '40px',
          fontFamily: 'var(--font-pixel)', fontSize: '6px',
          color: `rgba(${matrixColor},0.6)`,
        }}
        aria-hidden="true"
      >
        PRESS ANY KEY TO EXIT
      </div>
    </div>
  );
}
