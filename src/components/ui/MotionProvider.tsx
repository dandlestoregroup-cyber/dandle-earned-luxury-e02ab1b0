import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig, LazyMotion, domAnimation } from 'framer-motion';

interface MotionContextValue {
  reducedMotion: boolean;
}

const MotionContext = createContext<MotionContextValue>({ reducedMotion: false });

export const useMotion = () => useContext(MotionContext);

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * MotionProvider - Wraps app with Framer Motion config
 * - Detects prefers-reduced-motion
 * - Provides motion context to children
 * - Uses LazyMotion for smaller bundle
 */
export function MotionProvider({ children }: MotionProviderProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <MotionContext.Provider value={{ reducedMotion }}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
          {children}
        </MotionConfig>
      </LazyMotion>
    </MotionContext.Provider>
  );
}

export default MotionProvider;
