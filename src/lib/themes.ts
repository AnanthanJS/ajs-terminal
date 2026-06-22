export const THEME_NAMES = ['dark', 'amber', 'green', 'light', 'blue', 'sunset'] as const;
export type ThemeName = typeof THEME_NAMES[number];

export interface ThemeConfig {
  label: string;
  preview: string; // accent hex for preview dot
  vars: Record<string, string>;
}

export const THEMES: Record<ThemeName, ThemeConfig> = {
  dark: {
    label: 'DARK',
    preview: '#bf5fff',
    vars: {
      '--bg-base': '#080808',
      '--bg-surface': '#0e0e0e',
      '--bg-elevated': '#141414',
      '--text-primary': '#e8e8e8',
      '--text-secondary': '#909090',
      '--text-muted': '#484848',
      '--accent': '#bf5fff',
      '--accent-dim': 'rgba(191,95,255,0.12)',
      '--accent-glow': 'rgba(191,95,255,0.35)',
      '--border': 'rgba(191,95,255,0.22)',
      '--border-subtle': 'rgba(255,255,255,0.05)',
      '--matrix-color': '191,95,255',
      '--crt-tint': 'rgba(50,0,80,0.04)',
      '--vignette': 'rgba(0,0,0,0.7)',
    },
  },
  amber: {
    label: 'AMBER',
    preview: '#ffb400',
    vars: {
      '--bg-base': '#0d0700',
      '--bg-surface': '#150c00',
      '--bg-elevated': '#1c1100',
      '--text-primary': '#ffb400',
      '--text-secondary': '#cc8800',
      '--text-muted': '#664400',
      '--accent': '#ffb400',
      '--accent-dim': 'rgba(255,180,0,0.12)',
      '--accent-glow': 'rgba(255,180,0,0.4)',
      '--border': 'rgba(255,180,0,0.3)',
      '--border-subtle': 'rgba(255,180,0,0.07)',
      '--matrix-color': '255,180,0',
      '--crt-tint': 'rgba(80,40,0,0.05)',
      '--vignette': 'rgba(0,0,0,0.75)',
    },
  },
  green: {
    label: 'GREEN',
    preview: '#00ff41',
    vars: {
      '--bg-base': '#000d00',
      '--bg-surface': '#001100',
      '--bg-elevated': '#001800',
      '--text-primary': '#00ff41',
      '--text-secondary': '#00cc33',
      '--text-muted': '#006618',
      '--accent': '#00ff41',
      '--accent-dim': 'rgba(0,255,65,0.1)',
      '--accent-glow': 'rgba(0,255,65,0.35)',
      '--border': 'rgba(0,255,65,0.25)',
      '--border-subtle': 'rgba(0,255,65,0.06)',
      '--matrix-color': '0,255,65',
      '--crt-tint': 'rgba(0,50,0,0.06)',
      '--vignette': 'rgba(0,0,0,0.8)',
    },
  },
  light: {
    label: 'LIGHT',
    preview: '#6600cc',
    vars: {
      '--bg-base': '#f0f0f0',
      '--bg-surface': '#e4e4e4',
      '--bg-elevated': '#d8d8d8',
      '--text-primary': '#111111',
      '--text-secondary': '#444444',
      '--text-muted': '#888888',
      '--accent': '#6600cc',
      '--accent-dim': 'rgba(102,0,204,0.1)',
      '--accent-glow': 'rgba(102,0,204,0.25)',
      '--border': 'rgba(102,0,204,0.3)',
      '--border-subtle': 'rgba(0,0,0,0.1)',
      '--matrix-color': '102,0,204',
      '--crt-tint': 'rgba(0,0,0,0.01)',
      '--vignette': 'rgba(0,0,0,0.2)',
    },
  },
  blue: {
    label: 'BLUE',
    preview: '#00b8ff',
    vars: {
      '--bg-base': '#00001a',
      '--bg-surface': '#000022',
      '--bg-elevated': '#00002c',
      '--text-primary': '#00b8ff',
      '--text-secondary': '#0080cc',
      '--text-muted': '#004066',
      '--accent': '#00b8ff',
      '--accent-dim': 'rgba(0,184,255,0.1)',
      '--accent-glow': 'rgba(0,184,255,0.35)',
      '--border': 'rgba(0,184,255,0.25)',
      '--border-subtle': 'rgba(0,184,255,0.06)',
      '--matrix-color': '0,184,255',
      '--crt-tint': 'rgba(0,0,60,0.05)',
      '--vignette': 'rgba(0,0,0,0.8)',
    },
  },
  sunset: {
    label: 'SUNSET',
    preview: '#ff3d6e',
    vars: {
      '--bg-base': '#0d0005',
      '--bg-surface': '#14000a',
      '--bg-elevated': '#1a0010',
      '--text-primary': '#ff8040',
      '--text-secondary': '#cc5520',
      '--text-muted': '#662200',
      '--accent': '#ff3d6e',
      '--accent-dim': 'rgba(255,61,110,0.12)',
      '--accent-glow': 'rgba(255,61,110,0.35)',
      '--border': 'rgba(255,61,110,0.25)',
      '--border-subtle': 'rgba(255,61,110,0.06)',
      '--matrix-color': '255,61,110',
      '--crt-tint': 'rgba(60,0,20,0.05)',
      '--vignette': 'rgba(0,0,0,0.75)',
    },
  },
};

export function applyTheme(name: ThemeName) {
  const theme = THEMES[name];
  const root = document.documentElement;
  root.setAttribute('data-theme', name);
  Object.entries(theme.vars).forEach(([key, val]) => {
    root.style.setProperty(key, val);
  });
  try { localStorage.setItem('ajs-theme', name); } catch {}
}

export function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem('ajs-theme') as ThemeName;
    if (stored && THEMES[stored]) return stored;
  } catch {}
  return 'dark';
}
