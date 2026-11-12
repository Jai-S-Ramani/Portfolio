import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from './ThemeContext';

interface EditorialLoaderProps {
  onComplete?: () => void;
}

export const EditorialLoader: React.FC<EditorialLoaderProps> = ({ onComplete }) => {
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      if (onComplete) onComplete();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center select-none transition-colors duration-300 ${
            isDark
              ? 'bg-[#070C09] text-[#E8ECE6]'
              : 'bg-[#F5F3E9] text-[#242722]'
          }`}
        >
          {/* Animated J Monogram */}
          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 flex items-center justify-center"
            >
              {/* Outer decorative ring */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isDark ? '#1E3325' : '#C7D4B8'}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  className="animate-spin"
                  style={{ animationDuration: '14s' }}
                />
              </svg>

              {/* J. Monogram Typography */}
              <span className={`absolute font-serif italic text-6xl font-semibold tracking-tighter ${
                isDark ? 'text-[#34D399]' : 'text-[#141514]'
              }`}>
                J.
              </span>
            </motion.div>

            {/* Subtitle label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-6 flex flex-col items-center gap-1.5"
            >
              <span className={`text-[11px] font-mono tracking-[0.25em] uppercase font-semibold ${
                isDark ? 'text-[#85998A]' : 'text-[#858D7A]'
              }`}>
                JAI S RAMANI // PORTFOLIO
              </span>
              <span className={`text-xs font-serif italic ${
                isDark ? 'text-[#A3B899]/70' : 'text-[#242722]/60'
              }`}>
                Turning data into beautiful insights
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

