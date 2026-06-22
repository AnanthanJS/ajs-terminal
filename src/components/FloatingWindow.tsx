'use client';

import { useState, useRef, useEffect } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { catPath } from '@/lib/fileSystem';

interface Props {
  id: string;
  title: string;
  type: string;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
}

export default function FloatingWindow({ id, title, type, onClose, zIndex, onFocus }: Props) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [content, setContent] = useState<string>('');
  const dragRef = useRef({ startX: 0, startY: 0, initX: 0, initY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // Load content
  useEffect(() => {
    audioEngine.play('windowOpen');
    
    // Find content path based on ID
    let path = '';
    if (id === 'proj-001') path = '~/portfolio/projects/ecommerce/README.md';
    if (id === 'proj-002') path = '~/portfolio/projects/lms/README.md';
    if (id === 'proj-003') path = '~/portfolio/projects/hms/README.md';
    if (id === 'proj-004') path = '~/portfolio/projects/dashboard/README.md';
    
    if (path) {
      const text = catPath(path);
      setContent(text || 'ERR: FILE NOT FOUND');
    } else {
      setContent('No data available for this view.');
    }

    // Center window initially
    if (window.innerWidth > 600) {
      setPos({
        x: Math.random() * 100 + 40,
        y: Math.random() * 60 + 40,
      });
    }
  }, [id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: pos.x,
      initY: pos.y,
    };
    if (windowRef.current) windowRef.current.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPos({
      x: dragRef.current.initX + dx,
      y: Math.max(0, dragRef.current.initY + dy), // prevent dragging above screen
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (windowRef.current) windowRef.current.releasePointerCapture(e.pointerId);
  };

  const close = () => {
    audioEngine.play('windowClose');
    onClose();
  };

  return (
    <div
      ref={windowRef}
      onPointerDown={onFocus}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        width: '90%',
        maxWidth: '560px',
        zIndex,
        background: 'rgba(10,10,10,0.95)',
        border: '2px solid var(--accent)',
        clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
        boxShadow: '0 0 40px rgba(0,0,0,0.8), 0 0 15px var(--accent-glow)',
        animation: 'fade-up 0.2s ease-out',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Title Bar (Draggable) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          background: 'var(--accent)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          touchAction: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: 'var(--font-pixel)', fontSize: '7px', color: 'var(--bg-base)' }}>
            [ {type.toUpperCase()} ]
          </span>
          <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: '11px', color: 'var(--bg-base)', fontWeight: 'bold' }}>
            {title}
          </span>
        </div>
        
        <button
          onClick={(e) => { e.stopPropagation(); close(); }}
          style={{
            background: 'var(--bg-base)',
            color: 'var(--accent)',
            border: 'none',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-pixel)',
            fontSize: '6px',
            cursor: 'pointer',
            clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
          }}
          aria-label="Close window"
        >
          X
        </button>
      </div>

      {/* Window Body */}
      <div
        className="dot-matrix-surface-subtle"
        style={{
          padding: '20px',
          maxHeight: '60vh',
          overflowY: 'auto',
          fontFamily: 'var(--font-jetbrains-mono)',
          fontSize: '12px',
          lineHeight: '1.6',
          color: 'var(--text-primary)',
        }}
      >
        {content.split('\n').map((line, i) => {
          if (line.startsWith('# ')) {
            return <div key={i} className="pixel-heading-lg" style={{ color: 'var(--accent)', marginBottom: '12px', marginTop: i > 0 ? '20px' : 0 }}>{line.replace('# ', '')}</div>;
          }
          if (line.startsWith('## ')) {
            return <div key={i} className="pixel-heading-md" style={{ color: 'var(--text-primary)', marginBottom: '8px', marginTop: '16px' }}>{line.replace('## ', '')}</div>;
          }
          if (line.startsWith('> ')) {
            return <div key={i} className="pixel-label" style={{ color: 'var(--text-muted)', marginBottom: '16px', padding: '6px 10px', borderLeft: '2px solid var(--accent)' }}>{line.replace('> ', '')}</div>;
          }
          if (line.startsWith('- ')) {
            return <div key={i} style={{ paddingLeft: '12px', position: 'relative', marginBottom: '4px' }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▸</span>
              {line.replace('- ', '')}
            </div>;
          }
          if (line.startsWith('[')) {
            return <div key={i} style={{ color: '#28ca41', marginBottom: '4px' }}>{line}</div>;
          }
          if (!line.trim()) return <div key={i} style={{ height: '0.8em' }} />;
          return <div key={i}>{line}</div>;
        })}
      </div>
    </div>
  );
}
