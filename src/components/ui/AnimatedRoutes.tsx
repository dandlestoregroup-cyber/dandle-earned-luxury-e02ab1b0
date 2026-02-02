import { lazy, Suspense, ReactNode } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useMotion } from './MotionProvider';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

interface AnimatedRoutesProps {
  children: ReactNode;
}

/**
 * AnimatedRoutes - Wraps Routes with AnimatePresence
 * - Page transitions with fade + slide
 * - Respects reduced motion
 */
export function AnimatedRoutes({ children }: AnimatedRoutesProps) {
  const location = useLocation();
  const { reducedMotion } = useMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Lazy page wrapper with suspense
interface LazyPageProps {
  children: ReactNode;
}

export function LazyPage({ children }: LazyPageProps) {
  return (
    <Suspense fallback={<PageLoader />}>
      {children}
    </Suspense>
  );
}

// Export lazy imports for heavy pages
export const LazyProductDetail = lazy(() => import('@/pages/ProductDetail'));
export const LazyCompare = lazy(() => import('@/pages/Compare'));
export const LazyGiftPicker = lazy(() => import('@/pages/GiftPicker'));
export const LazyChairFinder = lazy(() => import('@/pages/ChairFinder'));
export const LazyRoomFit = lazy(() => import('@/pages/RoomFit'));
export const LazyCollection = lazy(() => import('@/pages/Collection'));

export default AnimatedRoutes;
