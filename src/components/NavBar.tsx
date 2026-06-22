'use client';

import { useState, useEffect } from 'react';
import { audioEngine } from '@/lib/audioEngine';
import { motion, AnimatePresence } from 'framer-motion';
import { THEMES, THEME_NAMES, ThemeName } from '@/lib/themes';

interface Props {
  currentTheme?: ThemeName;
  onSelectTheme?: (theme: ThemeName) => void;
}

export default function NavBar({ currentTheme, onSelectTheme }: Props) {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track active section for LED indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    audioEngine.play('navigate');
    setIsMobileMenuOpen(false);
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
    <nav
      className="fixed top-0 left-0 w-full z-40 px-6 py-4"
      style={{
        background: 'linear-gradient(180deg, color-mix(in srgb, var(--bg-base) 95%, transparent) 0%, color-mix(in srgb, var(--bg-base) 80%, transparent) 60%, transparent 100%)',
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none', // Allow clicking through the gradient
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Logo / Brand */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, 'hero')}
          className="flex items-center gap-3 pixel-border-hover group"
          style={{ textDecoration: 'none' }}
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--accent-dim)',
              border: '2px solid var(--accent)',
              clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
              transition: 'all 0.2s',
            }}
            className="group-hover:bg-accent group-hover:shadow-[0_0_15px_var(--accent-glow)] shadow-[0_0_8px_var(--accent-glow)]"
          >
            <span className="pixel-label group-hover:text-bg-base pixel-glow transition-colors">A</span>
          </div>
          <div className="flex flex-col">
            <span className="pixel-heading-md pixel-glow-white">AJS.SYS</span>
            <span className="pixel-label" style={{ color: 'var(--accent)' }}>v2.0.0</span>
          </div>
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden pixel-btn !px-3 !py-3 flex items-center justify-center min-h-[44px] min-w-[44px]"
          onClick={() => {
            audioEngine.play('keypress');
            setIsMobileMenuOpen(!isMobileMenuOpen);
          }}
          aria-label="Toggle Navigation"
        >
          <div className="flex flex-col justify-between h-[12px] w-[16px]">
            <span className={`h-[2px] w-full bg-accent transition-transform origin-left ${isMobileMenuOpen ? 'rotate-45 translate-x-[1px] -translate-y-[1px]' : ''}`} />
            <span className={`h-[2px] w-full bg-accent transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-full bg-accent transition-transform origin-left ${isMobileMenuOpen ? '-rotate-45 translate-x-[1px] translate-y-[1px]' : ''}`} />
          </div>
        </button>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex items-center gap-2"
          style={{
            background: 'var(--bg-surface)',
            padding: '4px 8px',
            border: '2px solid var(--border)',
            clipPath: 'polygon(0 6px, 6px 6px, 6px 0, calc(100% - 6px) 0, calc(100% - 6px) 6px, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 6px calc(100% - 6px), 0 calc(100% - 6px))',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className="pixel-btn-ghost group relative overflow-hidden"
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  textShadow: isActive ? '0 0 10px var(--accent-glow)' : '0 0 5px rgba(255,255,255,0.2)',
                  boxShadow: isActive ? 'inset 0 0 10px var(--accent-glow)' : 'none',
                }}
              >
                {/* Active LED indicator */}
                <span
                  style={{
                    position: 'absolute',
                    left: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '4px',
                    background: 'var(--accent)',
                    opacity: isActive ? 1 : 0,
                    boxShadow: isActive ? '0 0 8px var(--accent-glow), 0 0 16px var(--accent)' : 'none',
                    animation: isActive ? 'led-blink 3s infinite' : 'none',
                    transition: 'opacity 0.2s',
                  }}
                  aria-hidden="true"
                />
                <span style={{ paddingLeft: isActive ? '8px' : '0', transition: 'padding 0.2s' }}>
                  {item.label}
                </span>
              </a>
            );
          })}

          <a
            href="/Ananthan_Fullstack_Dev.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={() => audioEngine.play('commandAccept')}
            className="pixel-btn text-bg-base bg-accent ml-2 hover:scale-105 transition-transform"
            style={{
              padding: '8px 16px',
              boxShadow: '0 0 10px var(--accent-glow)',
            }}
          >
            DL_RESUME
          </a>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden w-full mt-4 pointer-events-auto"
          >
            <div className="bg-bg-surface border-2 border-border p-4 flex flex-col gap-2 pixel-corners-sm mx-auto max-w-sm">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className="pixel-btn-ghost w-full text-left relative flex items-center min-h-[44px] px-4"
                    style={{
                      color: isActive ? 'var(--accent)' : 'var(--text-primary)',
                      background: isActive ? 'var(--accent-dim)' : 'transparent',
                      textShadow: isActive ? '0 0 10px var(--accent-glow)' : 'none',
                    }}
                  >
                    <span
                      className={`w-2 h-2 mr-3 bg-accent transition-all ${isActive ? 'opacity-100 shadow-[0_0_12px_var(--accent),0_0_20px_var(--accent-glow)]' : 'opacity-0'}`}
                    />
                    {item.label}
                  </a>
                );
              })}
              <div className="h-[2px] w-full bg-border-subtle my-2" />

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={() => {
                  audioEngine.play('commandAccept');
                  setIsMobileMenuOpen(false);
                }}
                className="pixel-btn w-full text-center min-h-[44px] flex items-center justify-center bg-accent text-bg-base"
                style={{ boxShadow: '0 0 10px var(--accent-glow)' }}
              >
                DOWNLOAD RESUME
              </a>
              
              <div className="h-[2px] w-full bg-border-subtle my-2" />
              
              {/* Theme Switcher for Mobile */}
              {currentTheme && onSelectTheme && (
                <div className="flex flex-col gap-2 py-2 px-2">
                  <span className="pixel-label text-text-muted">THEME.SELECT:</span>
                  <div className="flex flex-wrap gap-3">
                    {THEME_NAMES.map((name) => {
                      const theme = THEMES[name];
                      const isActive = currentTheme === name;
                      return (
                        <button
                          key={name}
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!isActive) {
                              audioEngine.play('themeChange');
                              onSelectTheme(name);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          style={{
                            width: '24px',
                            height: '24px',
                            background: theme.preview,
                            border: isActive ? '2px solid var(--text-primary)' : '2px solid var(--border)',
                            opacity: isActive ? 1 : 0.7,
                            boxShadow: isActive ? `0 0 10px ${theme.preview}` : 'none',
                          }}
                          className="pixel-corners-sm transition-all"
                          title={`Switch to ${theme.label}`}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
              
              <div className="h-[2px] w-full bg-border-subtle my-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
