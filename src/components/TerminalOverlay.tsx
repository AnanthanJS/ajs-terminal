'use client';

import { useState, useEffect, useRef } from 'react';
import TerminalWindow from './TerminalWindow';
import { CommandContext } from '@/lib/terminalCommands';

interface Props {
  ctx: CommandContext;
}

export default function TerminalOverlay({ ctx }: Props) {
  const [active, setActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle on backtick or Ctrl+Space
      if (e.key === '`' || (e.ctrlKey && e.code === 'Space')) {
        e.preventDefault();
        setActive(prev => !prev);
      }
      
      // Close on Escape if active
      if (e.key === 'Escape' && active) {
        setActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (active && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    };
    
    if (active) {
      // Small delay to prevent the trigger click from closing it immediately
      setTimeout(() => window.addEventListener('click', handleClickOutside), 10);
    }
    
    return () => window.removeEventListener('click', handleClickOutside);
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[9000] bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-start md:pt-[10dvh]"
      aria-label="Terminal Overlay"
    >
      <div 
        ref={containerRef}
        className="w-full md:max-w-[800px] md:px-6 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.5)] md:shadow-none"
        style={{ animation: 'fade-up 0.2s ease-out' }}
      >
        <div 
          className="bg-bg-surface px-4 py-3 border-2 border-b-0 border-accent flex justify-between items-center"
          style={{ clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% 100%, 0 100%)' }}
        >
          <span className="pixel-label text-accent flex items-center gap-2">
            <span className="w-2 h-2 bg-accent animate-pulse inline-block" />
            DEVELOPER CONSOLE
          </span>
          <button 
            className="pixel-label text-text-muted hover:text-accent md:hidden p-2 -mr-2"
            onClick={() => setActive(false)}
          >
            [X] CLOSE
          </button>
          <span className="pixel-label text-text-muted hidden md:block">ESC TO CLOSE</span>
        </div>
        
        {/* We wrap TerminalWindow to override its inline margin */}
        <div className="h-[65dvh] md:h-[600px] overflow-hidden bg-bg-base border-t border-border-subtle md:border-none" style={{ marginTop: '-120px' }}>
          <TerminalWindow ctx={ctx} />
        </div>
      </div>
    </div>
  );
}
