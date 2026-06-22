'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcadeModal, { ArcadeProjectData } from './ArcadeModal';
import { audioEngine } from '@/lib/audioEngine';

import { PROJECTS } from '@/data/projects';

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'Mobile', 'Design'];

const springConfig = { damping: 20, stiffness: 300 };

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, ...springConfig }
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function ArcadeSelectScreen() {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState<ArcadeProjectData | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  // Handle Keyboard Navigation
  useEffect(() => {
    if (activeProject) return; // Don't handle navigation if modal is open

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only capture arrow keys if user is scrolled into the section
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;
      }

      if (['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
        e.preventDefault();
      }

      const colCount = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1;
      const maxIndex = filteredProjects.length - 1;

      setFocusedIndex(prev => {
        let next = prev === null ? 0 : prev;
        
        switch (e.key) {
          case 'ArrowRight':
            next = Math.min(next + 1, maxIndex);
            if (next !== prev) audioEngine.play('keypress');
            break;
          case 'ArrowLeft':
            next = Math.max(next - 1, 0);
            if (next !== prev) audioEngine.play('keypress');
            break;
          case 'ArrowDown':
            next = Math.min(next + colCount, maxIndex);
            if (next !== prev) audioEngine.play('keypress');
            break;
          case 'ArrowUp':
            next = Math.max(next - colCount, 0);
            if (next !== prev) audioEngine.play('keypress');
            break;
          case 'Enter':
            if (prev !== null && filteredProjects[prev]) {
              audioEngine.play('keypress');
              setActiveProject(filteredProjects[prev]);
            }
            return prev;
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, filteredProjects]);

  // Reset focus when filter changes
  useEffect(() => {
    setFocusedIndex(null);
  }, [filter]);

  const handleFilterClick = (cat: string) => {
    if (filter !== cat) {
      audioEngine.play('keypress');
      setFilter(cat);
    }
  };

  const handleLaunch = (project: ArcadeProjectData, index: number) => {
    audioEngine.play('keypress');
    setFocusedIndex(index);
    setActiveProject(project);
  };

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden bg-bg-base">
      <div className="absolute inset-0 dot-matrix-surface-subtle opacity-30 pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Arcade Header & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-3 mb-4 border-2 border-accent px-4 py-2 bg-bg-surface shadow-[0_0_15px_var(--accent-glow)]">
            <span className="w-3 h-3 bg-accent animate-pulse" />
            <h2 className="pixel-heading-md m-0 text-accent uppercase tracking-widest">CHOOSE_YOUR_SYSTEM</h2>
            <span className="w-3 h-3 bg-accent animate-pulse" />
          </div>
          <p className="text-text-muted font-mono text-sm uppercase tracking-widest mb-8">
            HIGH SCORES: {PROJECTS.length} RECORDS FOUND
          </p>

          {/* Arcade Genre Selector */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleFilterClick(cat)}
                className={`pixel-btn !text-xs !py-2 !px-4 transition-all duration-300 ${
                  filter === cat 
                    ? 'bg-accent text-bg-base shadow-[0_0_15px_var(--accent-glow)] scale-105' 
                    : 'bg-bg-surface text-text-muted hover:text-accent border-2 border-border-subtle'
                }`}
              >
                {cat.toUpperCase()}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Arcade Cabinet Grid */}
        <motion.div 
          layout
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const isFocused = focusedIndex === index;

              return (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  layout
                  className="group relative"
                  onMouseEnter={() => setFocusedIndex(index)}
                  onMouseLeave={() => setFocusedIndex(null)}
                >
                  {/* The Arcade Cabinet Frame */}
                  <motion.div 
                    animate={{
                      scale: isFocused ? 1.05 : 1,
                      y: isFocused ? -10 : 0,
                    }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    onClick={() => {
                      // On touch devices without hover, first tap focuses, second tap launches
                      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
                        if (!isFocused) {
                          setFocusedIndex(index);
                          return;
                        }
                      }
                      handleLaunch(project, index);
                    }}
                    className={`cursor-pointer h-full flex flex-col bg-bg-surface border-[4px] relative overflow-hidden transition-colors duration-300 ${
                      isFocused ? 'border-accent shadow-[0_0_30px_var(--accent-glow)] z-20' : 'border-border-subtle hover:border-border z-10'
                    }`}
                    style={{
                      clipPath: 'polygon(0 16px, 16px 16px, 16px 0, calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px))',
                    }}
                  >
                    {/* Image Area */}
                    <div 
                      className="w-full aspect-[4/3] bg-bg-base border-b-4 border-inherit relative overflow-hidden flex items-center justify-center p-4"
                      style={{ background: project.imagePlaceholderColor || 'var(--bg-elevated)' }}
                    >
                      {/* Featured Ribbon */}
                      {project.featured && (
                        <div className="absolute top-4 -right-8 bg-accent text-bg-base pixel-label px-10 py-1 rotate-45 shadow-[0_0_10px_var(--accent-glow)] z-30">
                          FEATURED
                        </div>
                      )}

                      {/* Screen Glitch Effect container */}
                      <div className="relative w-full h-full border-2 border-border-subtle overflow-hidden flex items-center justify-center bg-black/40">
                        {/* CSS Pixelation filter for real images once added: image-rendering: pixelated */}
                        {project.imageUrl ? (
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${isFocused ? 'scale-110 opacity-100' : 'opacity-60 scale-100'}`}
                            style={{ imageRendering: 'pixelated' }}
                          />
                        ) : (
                          <div className={`transition-all duration-300 ${isFocused ? 'scale-110 opacity-100' : 'opacity-60 scale-100'}`}>
                            <span className="pixel-heading-sm text-text-muted group-hover:text-accent transition-colors block text-center mb-2">
                              {project.ticket}
                            </span>
                            <div className="w-16 h-16 mx-auto border-2 border-dashed border-text-muted group-hover:border-accent flex items-center justify-center opacity-50">
                              img
                            </div>
                          </div>
                        )}
                      </div>

                      {/* "Insert Coin" overlay */}
                      <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="pixel-label text-accent animate-pulse font-bold tracking-widest text-lg" style={{ textShadow: '0 0 10px var(--accent-glow)' }}>
                          INSERT COIN
                        </span>
                      </div>
                      
                      {/* Screen CRT Scanlines */}
                      <div className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)' }} />
                    </div>

                    {/* Marquee / Info Area */}
                    <div className="p-6 flex-1 flex flex-col items-center text-center bg-bg-elevated">
                      <span className="pixel-tag bg-bg-elevated border border-border-subtle text-[8px] text-text-muted mb-4">
                        {project.category.toUpperCase()}
                      </span>
                      
                      <h4 className={`font-pixel text-[11px] leading-relaxed transition-colors duration-300 mb-4 ${isFocused ? 'text-accent' : 'text-text-primary'}`}>
                        {project.title.toUpperCase()}
                      </h4>

                      <div className="mt-auto flex flex-wrap justify-center gap-2">
                        {project.stack.slice(0, 3).map(tech => (
                          <span key={tech} className="font-mono text-[10px] text-text-muted">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Coin Slot / Status Indicator */}
                    <div className={`h-2 w-full transition-colors duration-300 ${isFocused ? 'bg-accent' : 'bg-border-subtle'}`} />
                  </motion.div>

                  {/* Player 1 Arrow Indicator (Only visible when focused) */}
                  {isFocused && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 z-30"
                    >
                      <div className="pixel-label text-accent animate-bounce font-bold tracking-widest" style={{ textShadow: '0 0 10px var(--accent-glow)' }}>
                        ▼ P1
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Keyboard Instructions */}
        <div className="mt-16 text-center">
          <p className="pixel-label text-text-muted hidden md:block opacity-50">
            USE ARROW KEYS [← ↑ ↓ →] TO NAVIGATE • PRESS [ENTER] TO SELECT
          </p>
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ArcadeModal 
            project={activeProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
