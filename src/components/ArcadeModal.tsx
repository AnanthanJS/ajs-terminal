'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { audioEngine } from '@/lib/audioEngine';
import { motion } from 'framer-motion';

export interface ArcadeProjectData {
  id: string;
  title: string;
  ticket: string;
  status: string;
  date: string;
  overview: string;
  category: 'Frontend' | 'Backend' | 'Full Stack' | 'Design' | 'Mobile';
  stack: string[];
  achievements: string[];
  metrics: { label: string; value: number; color: string }[];
  imagePlaceholderColor?: string; // Optional for placeholder styling
  imageUrl?: string; // Optional image URL for project thumbnail
  projectUrl?: string; // Optional URL for the project
  featured?: boolean; // Flag to feature significant projects
}

interface Props {
  project: ArcadeProjectData;
  onClose: () => void;
}

// Framer motion variants
const backdropVariants = {
  hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
  visible: { 
    opacity: 1, 
    backdropFilter: 'blur(12px)',
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    backdropFilter: 'blur(0px)',
    transition: { duration: 0.3 }
  }
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: 'spring' as const, 
      damping: 25, 
      stiffness: 300,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: { duration: 0.2 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring' as const, damping: 20, stiffness: 300 }
  }
};

export default function ArcadeModal({ project, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    audioEngine.play('windowOpen');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleClose = () => {
    audioEngine.play('windowClose');
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const MetricDisplay = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div style={{ background: 'color-mix(in srgb, var(--bg-elevated) 60%, transparent)', padding: '16px', border: `1px solid ${color}`, opacity: 0.8 }}>
      <div className="pixel-label" style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>{label}</div>
      <div className="font-pixel text-xl" style={{ color, textShadow: `0 0 10px ${color}` }}>{value}%</div>
    </div>
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 lg:p-8"
      style={{
        background: 'color-mix(in srgb, var(--bg-base) 85%, transparent)',
      }}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        variants={modalVariants}
        ref={modalRef}
        className="relative w-full h-[100dvh] md:h-auto max-w-6xl md:max-h-[90vh] flex flex-col dot-matrix-surface-subtle"
        style={{
          background: 'var(--bg-surface)',
          border: 'var(--is-desktop, 0) solid var(--accent)', // CSS will handle this via class or inline isn't needed if we use tailwind
          boxShadow: '0 0 50px rgba(0,0,0,0.9), 0 0 20px var(--accent-glow)',
        }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .responsive-modal-clip {
              border-width: 4px !important;
              clip-path: polygon(0 16px, 16px 16px, 16px 0, calc(100% - 16px) 0, calc(100% - 16px) 16px, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 16px calc(100% - 16px), 0 calc(100% - 16px));
            }
          }
        `}} />
        <div className="absolute inset-0 pointer-events-none z-0 responsive-modal-clip" style={{ border: '4px solid var(--accent)' }} />
        {/* CRT Overlay just for the modal */}
        <div className="absolute inset-0 pointer-events-none z-50" style={{ mixBlendMode: 'overlay', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }} />

        {/* Header Bar */}
        <div 
          className="flex justify-between items-center px-6 py-4 shrink-0 border-b-4 border-accent relative z-20"
          style={{ background: 'var(--bg-base)' }}
        >
          <div className="flex items-center gap-4">
            <span className="pixel-label font-bold text-accent border-2 border-accent px-2 py-1 shadow-[0_0_8px_var(--accent-glow)]">
              {project.ticket}
            </span>
            <h2 className="pixel-heading-md m-0 hidden sm:block font-bold text-text-primary uppercase tracking-widest" style={{ textShadow: '2px 2px 0px var(--accent)' }}>
              {project.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="pixel-btn flex items-center justify-center w-8 h-8 !p-0 !bg-bg-base !text-accent hover:!bg-accent hover:!text-bg-base border-2 border-accent"
            aria-label="Close modal"
          >
            X
          </button>
        </div>

        {/* Modal Body - Split Layout */}
        <div className="flex flex-col lg:flex-row overflow-hidden flex-1 relative z-20">
          
          {/* Left Side - Visuals & Overview */}
          <div className="w-full lg:w-1/2 p-6 sm:p-10 bg-bg-base overflow-y-auto custom-scrollbar flex flex-col gap-8 border-r-4 border-accent">
            
            {/* Visual Representation Area (Placeholder) */}
            <motion.div variants={contentVariants}>
              <div 
                className="w-full aspect-video bg-bg-surface border-4 border-border relative overflow-hidden group"
                style={{
                  clipPath: 'polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))',
                  background: project.imagePlaceholderColor || 'var(--bg-elevated)',
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="pixel-heading-lg text-accent animate-pulse mb-2">INSERT COIN</span>
                  <span className="pixel-label text-text-muted">(Image Placeholder)</span>
                </div>
                {/* Scanline overlay for the image area */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }} />
              </div>
            </motion.div>

            <motion.div variants={contentVariants} className="mt-4">
              <span className="pixel-label text-accent mb-2 block">GAME_INFO</span>
              <p className="font-sans text-text-primary text-base sm:text-lg leading-relaxed">
                {project.overview}
              </p>
            </motion.div>

            <motion.div variants={contentVariants} className="mt-4 flex gap-4">
              <button 
                className="pixel-btn flex-1 !text-[12px] bg-accent-dim border-2 border-accent shadow-[0_0_15px_var(--accent-glow)] animate-pulse disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  if (project.projectUrl) {
                    window.open(project.projectUrl, '_blank');
                  }
                }}
                disabled={!project.projectUrl}
              >
                VIEW GAME
              </button>
            </motion.div>
          </div>

          {/* Right Side - Details & High Scores */}
          <div className="w-full lg:w-1/2 overflow-y-auto p-6 sm:p-10 custom-scrollbar flex flex-col bg-bg-surface">
            
            <motion.div variants={contentVariants} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-accent animate-pulse" />
                <span className="pixel-label text-accent text-lg">SYSTEM_REQUIREMENTS</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {project.stack.map(tech => (
                  <span 
                    key={tech}
                    className="pixel-tag bg-bg-base border-2 border-border-subtle text-text-secondary hover:border-accent transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={contentVariants} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-3 h-3 bg-accent" style={{ animation: 'pulse 2s infinite' }} />
                <span className="pixel-label text-accent text-lg">HIGH_SCORES</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((m, i) => (
                  <MetricDisplay key={i} label={m.label} value={m.value} color={m.color} />
                ))}
              </div>
            </motion.div>

            <motion.div variants={contentVariants} className="mb-4">
              <span className="pixel-label text-text-muted mb-4 block">ACHIEVEMENTS_UNLOCKED</span>
              <ul className="flex flex-col gap-4 font-mono text-sm text-text-primary">
                {project.achievements.map((item, i) => (
                  <li key={i} className="flex gap-4 p-3 border-l-2 border-border-subtle hover:border-accent hover:bg-bg-elevated transition-colors">
                    <span className="text-accent font-bold">[{i+1}]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}
