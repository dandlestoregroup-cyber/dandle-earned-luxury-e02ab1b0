import { ReactNode, useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useMotion } from './MotionProvider';

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const getVariants = (direction: RevealDirection, distance: number = 30): Variants => {
  const directions: Record<RevealDirection, { x?: number; y?: number }> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return {
    hidden: {
      opacity: 0,
      ...directions[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

/**
 * Reveal - Scroll-triggered reveal animation
 * - Uses IntersectionObserver via Framer Motion's useInView
 * - Respects prefers-reduced-motion
 * - Multiple direction options
 */
export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  className,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    margin: '-50px',
    amount: threshold 
  });
  const { reducedMotion } = useMotion();

  // Skip animation if reduced motion is preferred
  if (reducedMotion) {
    const Component = as as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[as as keyof typeof motion] as any;

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={getVariants(direction)}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Refined easing
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

// Stagger container for child animations
interface RevealGroupProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function RevealGroup({ children, staggerDelay = 0.1, className }: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { reducedMotion } = useMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item for use within RevealGroup
export function RevealItem({ 
  children, 
  className,
  direction = 'up' 
}: { 
  children: ReactNode; 
  className?: string;
  direction?: RevealDirection;
}) {
  return (
    <motion.div
      variants={getVariants(direction)}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default Reveal;
