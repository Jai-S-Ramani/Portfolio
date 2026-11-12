import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'auto' | 'dark' | 'light';

interface ThemeContextType {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  cycleTheme: () => void;
  dynamicReason: string;
}

const ThemeContext = createContext<ThemeContextType>({
  themeMode: 'auto',
  isDark: true,
  setThemeMode: () => {},
  cycleTheme: () => {},
  dynamicReason: 'Auto Dynamic Sync',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('editorial_theme_mode') as ThemeMode | null;
    return saved === 'dark' || saved === 'light' || saved === 'auto' ? saved : 'auto';
  });

  const getDynamicState = useCallback((): { isDark: boolean; reason: string } => {
    if (typeof window === 'undefined') return { isDark: false, reason: 'Server Default' };

    // 1. Primary Priority: User's Browser / Operating System Theme Preference
    if (window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return { isDark: true, reason: 'Browser Dark Mode' };
      }
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return { isDark: false, reason: 'Browser Light Mode' };
      }
    }

    // 2. Secondary Fallback: Sunset Sync only if browser has no preference
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6;
    if (isNight) {
      return { isDark: true, reason: `Sunset Sync (${hour >= 18 ? `${hour}:00 PM` : `${hour}:00 AM`} Night)` };
    }
    return { isDark: false, reason: 'Daylight Mode' };
  }, []);

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeMode === 'dark') return true;
    if (themeMode === 'light') return false;
    return getDynamicState().isDark;
  });

  const [dynamicReason, setDynamicReason] = useState<string>(() => {
    if (themeMode === 'auto') return getDynamicState().reason;
    return themeMode === 'dark' ? 'Manual Dark Forest' : 'Manual Light Ivory';
  });

  // Keep state in sync with mode, system preferences, and time
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

    // Auto Mode: evaluate dynamically
    const updateDynamic = () => {
      const state = getDynamicState();
      setIsDark(state.isDark);
      setDynamicReason(`Auto: ${state.reason}`);
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateDynamic();

    // Listen to Browser / OS prefers-color-scheme changes
    const mediaQueryDark = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const mediaQueryLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
    const handleMediaChange = () => updateDynamic();

    if (mediaQueryDark && mediaQueryDark.addEventListener) {
      mediaQueryDark.addEventListener('change', handleMediaChange);
      mediaQueryLight?.addEventListener('change', handleMediaChange);
    } else if (mediaQueryDark && mediaQueryDark.addListener) {
      mediaQueryDark.addListener(handleMediaChange);
      mediaQueryLight?.addListener(handleMediaChange);
    }

    // Interval to dynamically re-evaluate every 60 seconds
    const interval = setInterval(updateDynamic, 60000);

    return () => {
      if (mediaQueryDark && mediaQueryDark.removeEventListener) {
        mediaQueryDark.removeEventListener('change', handleMediaChange);
        mediaQueryLight?.removeEventListener('change', handleMediaChange);
      } else if (mediaQueryDark && mediaQueryDark.removeListener) {
        mediaQueryDark.removeListener(handleMediaChange);
        mediaQueryLight?.removeListener(handleMediaChange);
      }
      clearInterval(interval);
    };
  }, [themeMode, getDynamicState]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const cycleTheme = () => {
    setThemeModeState((prev) => {
      if (prev === 'auto') return 'dark';
      if (prev === 'dark') return 'light';
      return 'auto';
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, isDark, setThemeMode, cycleTheme, dynamicReason }}>
      {children}
    </ThemeContext.Provider>
  );
};
