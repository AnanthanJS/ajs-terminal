'use client';
import { useState, useEffect, useRef } from 'react';
import DotMatrixBackground from '@/components/DotMatrixBackground';
import CRTOverlay from '@/components/CRTOverlay';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import AudioToggle from '@/components/AudioToggle';
import BootSequence from '@/components/BootSequence';
import MatrixRain from '@/components/MatrixRain';
import TerminalOverlay from '@/components/TerminalOverlay';
import Dashboard from '@/components/Dashboard';

import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import CoreProtocolSection from '@/components/CoreProtocolSection';
import TechnicalArsenal from '@/components/TechnicalArsenal';
import ArcadeSelectScreen from '@/components/ArcadeSelectScreen';
import ContactSection from '@/components/ContactSection';
import SmoothScroll from '@/components/SmoothScroll';
import Footer from '@/components/Footer';

import { THEMES, THEME_NAMES, ThemeName, getStoredTheme, applyTheme } from '@/lib/themes';
import { CommandContext } from '@/lib/terminalCommands';
import { audioEngine } from '@/lib/audioEngine';

// Pixel-march divider between sections
function PixelSectionDivider() {
  return (
    <div className="max-w-6xl mx-auto px-6" aria-hidden="true">
      <div style={{
        height: '2px',
        background: 'repeating-linear-gradient(90deg, var(--border) 0px, var(--border) 4px, transparent 4px, transparent 8px)',
        opacity: 0.5,
      }} />
    </div>
  );
}

export default function PortfolioApp() {
  const [booting, setBooting] = useState(true);
  const [theme, setTheme] = useState<ThemeName>('dark');
  const [matrixActive, setMatrixActive] = useState(false);
  const [dashboardActive, setDashboardActive] = useState(false);
  const [cwd, setCwd] = useState('~');
  
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const t = getStoredTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const handleThemeChange = (newTheme: ThemeName) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleBootComplete = () => {
    setBooting(false);
    startTime.current = Date.now();
  };

  const cmdContext: CommandContext = {
    cwd,
    setCwd,
    setMatrix: setMatrixActive,
    setTheme: handleThemeChange,
    clearTerminal: () => {},
    openDashboard: () => setDashboardActive(true),
    startTime: startTime.current,
  };

  const matrixColor = THEMES[theme].vars['--matrix-color'] || '191,95,255';

  return (
    <>
      <CRTOverlay />

      {booting && <BootSequence onComplete={handleBootComplete} />}

      {!booting && (
        <div className="relative w-full overflow-x-hidden">
          {/* Base Background layer */}
          <DotMatrixBackground />

          {/* Matrix Easter Egg Layer */}
          <MatrixRain
            active={matrixActive}
            onExit={() => setMatrixActive(false)}
            matrixColor={matrixColor}
          />

          {/* Top Bar UI Controls */}
          <ThemeSwitcher currentTheme={theme} onSelect={handleThemeChange} />
          <AudioToggle />

          {/* Hidden Terminal Overlay (Triggered by backtick) */}
          <TerminalOverlay ctx={cmdContext} />

          {/* Navigation */}
          <NavBar currentTheme={theme} onSelectTheme={handleThemeChange} />

          {/* Main Scroll Content */}
          <SmoothScroll>
            <main className="relative" style={{ zIndex: 1 }}>
              <HeroSection />
              <PixelSectionDivider />
              <ArcadeSelectScreen />
              <PixelSectionDivider />
              <TechnicalArsenal />
              <PixelSectionDivider />
              <CoreProtocolSection />
              <PixelSectionDivider />
              <ContactSection />
            </main>
            <Footer />
          </SmoothScroll>

          {/* Dashboard Overlay */}
          {dashboardActive && (
            <Dashboard
              onClose={() => setDashboardActive(false)}
              startTime={startTime.current}
            />
          )}
        </div>
      )}
    </>
  );
}
