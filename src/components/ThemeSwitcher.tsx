'use client';

import { THEMES, THEME_NAMES, ThemeName } from '@/lib/themes';
import { audioEngine } from '@/lib/audioEngine';

interface Props {
  currentTheme: ThemeName;
  onSelect: (theme: ThemeName) => void;
}

export default function ThemeSwitcher({ currentTheme, onSelect }: Props) {
  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 5000,
        gap: '8px',
        background: 'var(--bg-surface)',
        padding: '8px 12px',
        border: '2px solid var(--border)',
        clipPath: 'polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))',
      }}
    >
      <span className="pixel-label" style={{ color: 'var(--text-muted)', alignSelf: 'center', marginRight: '4px' }}>
        THEME:
      </span>
      {THEME_NAMES.map((name) => {
        const theme = THEMES[name];
        const isActive = currentTheme === name;
        return (
          <button
            key={name}
            onClick={() => {
              if (!isActive) {
                audioEngine.play('themeChange');
                onSelect(name);
              }
            }}
            title={`Switch to ${theme.label} theme`}
            style={{
              width: '16px',
              height: '16px',
              background: theme.preview,
              border: isActive ? '2px solid var(--text-primary)' : '2px solid var(--border)',
              opacity: isActive ? 1 : 0.7,
              boxShadow: isActive ? `0 0 8px ${theme.preview}` : 'none',
              clipPath: 'polygon(0 2px, 2px 2px, 2px 0, calc(100% - 2px) 0, calc(100% - 2px) 2px, 100% 2px, 100% calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) 100%, 2px 100%, 2px calc(100% - 2px), 0 calc(100% - 2px))',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            aria-label={`Theme: ${theme.label}`}
            aria-pressed={isActive}
          />
        );
      })}
    </div>
  );
}
