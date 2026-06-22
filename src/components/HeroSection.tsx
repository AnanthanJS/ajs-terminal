'use client';

import { useState, useEffect, useRef } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { motion } from 'framer-motion';

import HeroCanvas from './HeroCanvas';

const STATUS_MESSAGES = [
  'SYSTEM: ONLINE', 
  'BUILD: PASSED', 
  'DEPLOY: READY', 
  'AUTH: VERIFIED', 
  'SCAN: SECURE'
];

const TYPED_LINES = [
  { text: 'AJS_USER_PROFILE_LOADED', delay: 400, color: 'var(--text-muted)' },
  { text: 'Full-Stack Software Developer', delay: 1200, color: 'var(--text-primary)' },
  { text: 'Specializing in .NET Core, Angular 15+, & React ecosystems.', delay: 2400, color: 'var(--text-secondary)' },
  { text: 'Building robust enterprise architectures with clean CQRS/Mediator backends.', delay: 3800, color: 'var(--text-secondary)' },
];

const springConfig = { type: 'spring' as const, damping: 20, stiffness: 200 };

export default function HeroSection() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showCursor, setShowCursor] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<{cmd: string, res: string}[]>([]);
  
  const heroRef = useRef<HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Status Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Type out the main bio lines
    const timers: ReturnType<typeof setTimeout>[] = [];
    
    TYPED_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, i]);
          if (i === TYPED_LINES.length - 1) {
            setTimeout(() => setShowCursor(true), 800);
          }
        }, TYPED_LINES[i].delay)
      );
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    
    audioEngine.play('keypress');
    const cmd = commandInput.trim().toLowerCase();
    let res = '';
    
    switch(cmd) {
      case '/help': res = 'AVAILABLE CMDS: /help, /skills, /projects, /contact, /clear, /whoami, /sudo, /resume'; break;
      case '/skills': res = '-> Routing to SKILLS sector...'; setTimeout(() => handleClick('skills'), 800); break;
      case '/projects': res = '-> Routing to PROJECTS sector...'; setTimeout(() => handleClick('projects'), 800); break;
      case '/contact': res = '-> Routing to CONTACT sector...'; setTimeout(() => handleClick('contact'), 800); break;
      case '/clear': setCommandHistory([]); setCommandInput(''); return;
      case '/whoami': res = 'AJS.SYS ADMIN (GUEST_MODE: ACTIVE)'; break;
      case '/sudo': res = 'ACCESS DENIED: INSUFFICIENT PRIVILEGES.'; break;
      case '/resume': 
        res = '-> INITIATING RESUME DOWNLOAD...'; 
        setTimeout(() => {
          const a = document.createElement('a');
          a.href = '/resume.pdf';
          a.download = 'resume.pdf';
          a.click();
        }, 800);
        break;
      default: res = `COMMAND NOT FOUND: ${cmd}`; break;
    }
    
    setCommandHistory(prev => [...prev, { cmd, res }]);
    setCommandInput('');
    // Auto-scroll terminal down
    setTimeout(() => {
      if (inputRef.current) inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
  };

  const handleClick = (id: string) => {
    audioEngine.play('keypress');
    const el = document.getElementById(id);
    if (el) {
      // Calculate true offset by comparing against the transformed wrapper to avoid spring physics lag issues
      const wrapper = el.closest('main')?.parentElement;
      const targetY = wrapper 
        ? el.getBoundingClientRect().top - wrapper.getBoundingClientRect().top 
        : el.getBoundingClientRect().top + window.scrollY;
        
      window.scrollTo({ top: targetY - 80, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden"
    >
      <HeroCanvas />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="flex flex-col max-w-3xl">
          
          {/* LED Status Matrix */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...springConfig }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div 
                  // Changing the key forces the animation to re-run
                  key={`${statusIndex}-${i}`}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.5, 1],
                  }}
                  transition={{ 
                    delay: i * 0.1, // Wave effect triggered on status change
                    duration: 0.5,
                  }}
                  style={{
                    width: '8px', height: '8px',
                    background: i < 4 || statusIndex === 1 ? '#28ca41' : 'var(--border)',
                    boxShadow: i < 4 || statusIndex === 1 ? '0 0 8px rgba(40,202,65,0.6)' : 'none',
                    clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
                  }}
                />
              ))}
            </div>
            <motion.span 
              key={statusIndex}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="pixel-label" 
              style={{ color: '#28ca41', textShadow: '0 0 8px rgba(40,202,65,0.4)' }}
            >
              {STATUS_MESSAGES[statusIndex]}
            </motion.span>
          </motion.div>

          {/* Glitch Name Heading + Aura Effect */}
          <div className="relative mb-8 group inline-block w-fit">
            {/* Aura Glow */}
            <motion.div 
              animate={{ 
                scale: [0.98, 1.02, 0.98],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent rounded-full blur-[40px] opacity-30 group-hover:blur-[60px] group-hover:opacity-60 transition-all duration-500 pointer-events-none"
            />
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, ...springConfig }}
              className="pixel-heading-xl glitch-hover relative z-10"
              style={{ 
                color: 'var(--text-primary)',
                textShadow: '0 0 10px rgba(255,255,255,0.2)',
                fontSize: 'clamp(16px, 4vw, 32px)',
                lineHeight: 1.4,
              }}
              data-text="ANANTHAKRISHNAN J S"
            >
              ANANTHAKRISHNAN J S
            </motion.h1>
          </div>

          {/* Typewriter Terminal Bio */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, ...springConfig }}
            className="mb-12 dot-matrix-surface"
            style={{
              padding: '24px 32px',
              background: 'color-mix(in srgb, var(--bg-elevated) 80%, transparent)',
              border: '2px solid var(--border)',
              clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
              boxShadow: '0 0 40px rgba(0,0,0,0.5)',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: '14px',
              lineHeight: '1.8',
            }}
          >
            <div className="flex items-center gap-2 mb-4 pb-4" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="w-3 h-3 bg-red-500 pixel-corners-sm" />
              <span className="w-3 h-3 bg-yellow-500 pixel-corners-sm" />
              <span className="w-3 h-3 bg-green-500 pixel-corners-sm" />
              <span className="ml-4 pixel-label text-muted">AJS.sh</span>
            </div>

            <div className="flex flex-col gap-2">
              {TYPED_LINES.map((line, i) => (
                <div 
                  key={i}
                  style={{ 
                    opacity: visibleLines.includes(i) ? 1 : 0,
                    color: line.color,
                    transition: 'opacity 0.1s step-end'
                  }}
                >
                  <span style={{ color: 'var(--accent)', marginRight: '12px' }}>$</span>
                  {line.text}
                </div>
              ))}
              
              {/* Interactive Terminal Output */}
              {commandHistory.map((entry, i) => (
                <div key={`history-${i}`} className="mt-2 text-text-primary animate-fade-up">
                  <div><span style={{ color: 'var(--accent)', marginRight: '12px' }}>$</span>{entry.cmd}</div>
                  <div className="text-text-secondary mt-1">{entry.res}</div>
                </div>
              ))}

              {/* Interactive Prompt */}
              {showCursor && (
                <form onSubmit={handleCommandSubmit} className="mt-2 flex items-center relative">
                  <span style={{ color: 'var(--accent)', marginRight: '12px' }}>$</span>
                  <input 
                    ref={inputRef}
                    type="text" 
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    className="bg-transparent border-none outline-none text-text-primary w-full font-mono text-sm"
                    spellCheck={false}
                    autoComplete="off"
                    autoFocus
                  />
                  {/* Custom animated cursor block overlaid on input to maintain retro look */}
                  {!commandInput && (
                    <span className="cursor-blink absolute left-[22px] w-[10px] h-[16px] bg-accent pointer-events-none" />
                  )}
                </form>
              )}
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, ...springConfig }}
            className="flex flex-wrap gap-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('projects')}
              className="pixel-btn text-[10px] sm:text-xs tracking-widest px-8 py-4"
              style={{ background: 'var(--accent-dim)' }}
            >
              VIEW_PROJECTS
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick('contact')}
              className="pixel-btn-ghost text-[10px] sm:text-xs tracking-widest px-8 py-4"
            >
              INITIATE_CONTACT
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
