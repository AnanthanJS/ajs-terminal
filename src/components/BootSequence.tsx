'use client';

import { useEffect, useState, useCallback } from 'react';
import { audioEngine } from '@/lib/audioEngine';

interface BootLine {
  text: string;
  status?: string;
  delay: number;
  type?: 'title' | 'normal' | 'ok' | 'spacer';
}

const BOOT_LINES: BootLine[] = [
  { text: 'AJS-TERMINAL v2.0.0 — BIOS v1.0', type: 'title', delay: 0 },
  { text: '', type: 'spacer', delay: 200 },
  { text: 'Memory test: 256KB', status: 'OK', delay: 400 },
  { text: 'Loading kernel: experience-1yr-stable', status: 'OK', delay: 700 },
  { text: 'Initializing display driver', status: 'OK', delay: 1000 },
  { text: 'Loading font: Press Start 2P', status: 'OK', delay: 1200 },
  { text: 'Mounting filesystem: ~/portfolio', status: 'OK', delay: 1500 },
  { text: 'Starting services: canvas-renderer', status: 'OK', delay: 1700 },
  { text: 'Loading user profile: ajs', status: 'OK', delay: 2000 },
  { text: 'Calibrating dot-matrix display', status: 'OK', delay: 2200 },
  { text: 'Audio subsystem: 8-bit synthesis', status: 'OK', delay: 2400 },
  { text: '', type: 'spacer', delay: 2700 },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'title', delay: 2800 },
  { text: ' Welcome to AJS-Terminal v2.0.0', type: 'title', delay: 2900 },
  { text: ' Type "help" for available commands', type: 'normal', delay: 3000 },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', type: 'title', delay: 3100 },
];

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const finish = useCallback(() => {
    setFadeOut(true);
    audioEngine.play('bootComplete');
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Show skip hint after 600ms
    timers.push(setTimeout(() => setShowSkip(true), 600));

    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, i]);
          if (i === BOOT_LINES.length - 1) {
            timers.push(setTimeout(() => { setDone(true); finish(); }, 600));
          }
        }, BOOT_LINES[i].delay),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  // Skip on keypress / click
  useEffect(() => {
    const skip = () => { if (!done) { setDone(true); finish(); } };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [done, finish]);

  return (
    <div
      onClick={() => { if (!done) { setDone(true); finish(); } }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg-base)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.6s ease',
        // CRT curvature during boot
        perspective: '1200px',
      }}
      aria-label="Boot sequence — click or press any key to skip"
      role="presentation"
    >
      {/* Scanlines */}
      <div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
        }}
        aria-hidden="true"
      />

      {/* Terminal panel */}
      <div
        style={{
          width: '100%', maxWidth: '680px',
          padding: '32px 40px',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '12px',
          lineHeight: '1.9',
          position: 'relative', zIndex: 2,
        }}
      >
        {BOOT_LINES.map((line, i) => {
          const visible = visibleLines.includes(i);
          if (!visible) return null;

          if (line.type === 'spacer') return <div key={i} style={{ height: '0.6em' }} />;

          const isTitle = line.type === 'title';
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: isTitle ? 'var(--accent)' : 'var(--text-primary)',
                textShadow: isTitle ? '0 0 8px var(--accent-glow)' : 'none',
                animation: 'fade-up 0.2s ease forwards',
              }}
            >
              <span>{line.text}</span>
              {line.status && (
                <span style={{ color: '#28ca41', textShadow: '0 0 6px rgba(40,202,65,0.6)', marginLeft: '16px' }}>
                  [ {line.status} ]
                </span>
              )}
            </div>
          );
        })}

        {/* Blinking cursor after last visible line */}
        {visibleLines.length > 0 && !done && (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>$ </span>
            <span
              style={{
                display: 'inline-block', width: '8px', height: '14px',
                background: 'var(--accent)', marginLeft: '4px',
                animation: 'cursor-blink 1s step-end infinite',
              }}
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {/* Skip hint */}
      {showSkip && !done && (
        <div
          style={{
            position: 'absolute', bottom: '32px', right: '40px',
            fontFamily: 'var(--font-pixel)', fontSize: '6px',
            color: 'var(--text-muted)',
            animation: 'pulse-glow 2s ease infinite',
          }}
          aria-hidden="true"
        >
          PRESS ANY KEY TO SKIP
        </div>
      )}
    </div>
  );
}
