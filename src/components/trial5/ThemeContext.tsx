import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'system' | 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
  dynamicReason: string;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'system',
  isDark: false,
  setThemeMode: () => {},
  cycleTheme: () => {},
  dynamicReason: 'System Theme',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('editorial_theme_mode');
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
    return 'system';
  });

  const getSystemState = useCallback((): { isDark: boolean; reason: string } => {
    if (typeof window === 'undefined') return { isDark: false, reason: 'System Default' };
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return {
      isDark: prefersDark,
      reason: prefersDark ? 'System Dark' : 'System Light',
    };
  }, []);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeMode === 'dark') return true;
    if (themeMode === 'light') return false;
    return getSystemState().isDark;
  });

  const [dynamicReason, setDynamicReason] = useState<string>(() => {
    if (themeMode === 'system') return getSystemState().reason;
    return themeMode === 'dark' ? 'Manual Dark Forest' : 'Manual Light Ivory';
  });

  // Keep state in sync with mode and OS system preferences
  useEffect(() => {
    localStorage.setItem('editorial_theme_mode', themeMode);

    if (themeMode === 'dark') {
      setIsDark(true);
      setDynamicReason('Manual Dark Forest');
      document.documentElement.classList.add('dark');
      return;
    }

    if (themeMode === 'light') {
      setIsDark(false);
      setDynamicReason('Manual Light Ivory');
      document.documentElement.classList.remove('dark');
      return;
    }

    // System Mode: strictly follow OS / Browser color-scheme
    const updateSystemTheme = () => {
      const state = getSystemState();
      setIsDark(state.isDark);
      setDynamicReason(state.reason);
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateSystemTheme();

    // Listen to Browser / OS prefers-color-scheme changes
    const mediaQueryDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const mediaQueryLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
    const handleMediaChange = () => updateSystemTheme();

    if (mediaQueryDark && mediaQueryDark.addEventListener) {
      mediaQueryDark.addEventListener('change', handleMediaChange);
      mediaQueryLight?.addEventListener('change', handleMediaChange);
    } else if (mediaQueryDark && mediaQueryDark.addListener) {
      mediaQueryDark.addListener(handleMediaChange);
      mediaQueryLight?.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQueryDark && mediaQueryDark.removeEventListener) {
        mediaQueryDark.removeEventListener('change', handleMediaChange);
        mediaQueryLight?.removeEventListener('change', handleMediaChange);
      } else if (mediaQueryDark && mediaQueryDark.removeListener) {
        mediaQueryDark.removeListener(handleMediaChange);
        mediaQueryLight?.removeListener(handleMediaChange);
      }
    };
  }, [themeMode, getSystemState]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const cycleTheme = () => {
    setThemeModeState((prev) => {
      if (prev === 'system') return 'dark';
      if (prev === 'dark') return 'light';
      return 'system';
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode, cycleTheme, dynamicReason }}>
      {children}
    </ThemeContext.Provider>
  );
};
