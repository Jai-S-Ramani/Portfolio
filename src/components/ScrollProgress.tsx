import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const { theme } = useTheme();

  // Smooth physics spring for the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-white/[0.04] pointer-events-none">
      <motion.div
        className="h-full origin-left relative"
        style={{
          scaleX,
          background: `linear-gradient(90deg, ${theme.accentLight}, ${theme.accent})`,
        }}
      >
        {/* Glowing Head Point with Pulse */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full blur-[4px] animate-pulse"
          style={{ backgroundColor: theme.accent }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        />
      </motion.div>
    </div>
  );
};

