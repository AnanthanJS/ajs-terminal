'use client';

import { useState, useEffect } from 'react';
import { audioEngine } from '@/lib/audioEngine';

export default function AudioToggle() {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(audioEngine.isMuted);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        const newMuted = !muted;
        setMuted(newMuted);
        audioEngine.setMuted(newMuted);
        if (!newMuted) audioEngine.play('keypress');
      }}
      className="pixel-btn-ghost"
      style={{
        position: 'fixed',
        top: '24px',
        right: '180px', // next to theme switcher
        zIndex: 5000,
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--bg-surface)',
      }}
      aria-label={muted ? "Unmute audio" : "Mute audio"}
    >
      {/* Sound indicator dot */}
      <span
        style={{
          width: '6px',
          height: '6px',
          background: muted ? 'var(--text-muted)' : '#28ca41',
          boxShadow: muted ? 'none' : '0 0 6px #28ca41',
          animation: muted ? 'none' : 'led-blink 3s infinite',
        }}
        aria-hidden="true"
      />
      <span className="pixel-label" style={{ color: muted ? 'var(--text-muted)' : 'var(--text-primary)' }}>
        {muted ? 'SND: OFF' : 'SND: ON'}
      </span>
    </button>
  );
}
