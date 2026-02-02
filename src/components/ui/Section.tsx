import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionSize = 'sm' | 'md' | 'lg' | 'xl';
type SectionBackground = 'default' | 'cream' | 'dark' | 'transparent';

interface SectionProps {
  children: ReactNode;
  size?: SectionSize;
  background?: SectionBackground;
  className?: string;
  containerClassName?: string;
  id?: string;
  as?: 'section' | 'div' | 'article';
}

const paddingMap: Record<SectionSize, string> = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-20',
  lg: 'py-16 md:py-28',
  xl: 'py-20 md:py-36',
};

const backgroundMap: Record<SectionBackground, string> = {
  default: 'bg-background',
  cream: 'bg-secondary/30',
  dark: 'bg-foreground text-background',
  transparent: 'bg-transparent',
};

/**
 * Section - Consistent section wrapper
 * - Standardized padding and max-width
 * - Background variants
 * - Semantic HTML support
 */
export function Section({
  children,
  size = 'md',
  background = 'default',
  className,
  containerClassName,
  id,
  as: Component = 'section',
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        paddingMap[size],
        backgroundMap[background],
        'px-4 md:px-8',
        className
      )}
    >
      <div
        className={cn(
          'max-w-7xl mx-auto',
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}

// Section header with consistent styling
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  align = 'center',
  className 
}: SectionHeaderProps) {
  return (
    <div 
      className={cn(
        'mb-8 md:mb-12',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2 className="text-2xl md:text-4xl font-headline font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default Section;
