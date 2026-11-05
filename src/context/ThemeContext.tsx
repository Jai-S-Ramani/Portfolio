import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeColors {
  id: string;
  name: string;
  accent: string;
  accentLight: string;
  accentRgb: string;
  glow: string;
}

export const THEMES: ThemeColors[] = [
  {
    id: 'electric-teal',
    name: 'Electric Teal',
    accent: '#00D9C0',
    accentLight: '#5bf2e1',
    accentRgb: '0, 217, 192',
    glow: 'rgba(0, 217, 192, 0.4)',
  },
  {
    id: 'cobalt-cyan',
    name: 'Cobalt Cyan',
    accent: '#38bdf8',
    accentLight: '#7dd3fc',
    accentRgb: '56, 189, 248',
    glow: 'rgba(56, 189, 248, 0.4)',
  },
  {
    id: 'cyber-emerald',
    name: 'Cyber Emerald',
    accent: '#10b981',
    accentLight: '#34d399',
    accentRgb: '16, 185, 129',
    glow: 'rgba(16, 185, 129, 0.4)',
  },
  {
    id: 'amethyst-violet',
    name: 'Amethyst Violet',
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentRgb: '168, 85, 247',
    glow: 'rgba(168, 85, 247, 0.4)',
  },
  {
    id: 'solar-amber',
    name: 'Solar Amber',
    accent: '#FF8A30',
    accentLight: '#ffaa66',
    accentRgb: '255, 138, 48',
    glow: 'rgba(255, 138, 48, 0.4)',
  },
];

interface ThemeContextType {
  theme: ThemeColors;
  setThemeById: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeColors>(() => {
    const saved = localStorage.getItem('trial3_theme');
    const found = THEMES.find((t) => t.id === saved);
    return found || THEMES[0];
  });

  const setThemeById = (id: string) => {
    const found = THEMES.find((t) => t.id === id);
    if (found) {
      setTheme(found);
      localStorage.setItem('trial3_theme', id);
    }
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', theme.accent);
    document.documentElement.style.setProperty('--color-accent-light', theme.accentLight);
    document.documentElement.style.setProperty('--color-accent-rgb', theme.accentRgb);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeById }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

