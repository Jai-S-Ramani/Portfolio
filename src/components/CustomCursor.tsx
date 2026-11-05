import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('a, button, input, textarea, [role="button"]') ||
            window.getComputedStyle(target).cursor === 'pointer'
        );
        setIsPointer(isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden sm:block">
      {/* Follower Ring */}
      <motion.div
        animate={{
          x: pos.x - (isPointer ? 20 : 14),
          y: pos.y - (isPointer ? 20 : 14),
          scale: isPointer ? 1.4 : 1,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 350, mass: 0.4 }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none transition-colors duration-200"
        style={{
          width: isPointer ? 40 : 28,
          height: isPointer ? 40 : 28,
          borderColor: theme.accent,
          boxShadow: `0 0 15px ${theme.glow}`,
          backgroundColor: isPointer ? `rgba(${theme.accentRgb}, 0.12)` : 'transparent',
        }}
      />

      {/* Center Reticle Dot */}
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none"
        style={{
          backgroundColor: theme.accent,
          boxShadow: `0 0 8px ${theme.accent}`,
        }}
      />
    </div>
  );
};

