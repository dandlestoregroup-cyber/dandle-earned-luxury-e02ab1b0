import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  aspectRatio?: string;
  priority?: boolean;
  blur?: boolean;
  sizes?: string;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage - Lazy loading with blur placeholder and srcset support
 * - Uses IntersectionObserver for lazy loading
 * - Shows blur placeholder until loaded
 * - Supports responsive srcset via sizes prop
 * - Fallback support for missing images
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/placeholder.svg',
  aspectRatio = '4/3',
  priority = false,
  blur = true,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  className,
  containerClassName,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy loading with IntersectionObserver
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const imageSrc = hasError ? fallbackSrc : src;

  // Generate srcset for responsive images
  const generateSrcSet = (baseSrc: string): string | undefined => {
    // For Supabase storage images, use Supabase image transforms
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (baseSrc.includes(supabaseUrl) && baseSrc.includes('/storage/')) {
      const widths = [400, 640, 768, 1024, 1280];
      return widths.map(w => {
        const url = new URL(baseSrc);
        url.searchParams.set('width', w.toString());
        url.searchParams.set('quality', '80');
        return `${url.toString()} ${w}w`;
      }).join(', ');
    }

    // For local /images/ paths, generate same-image srcset  
    if (baseSrc.startsWith('/images/')) {
      const widths = [400, 640, 768, 1024, 1280];
      return widths.map(w => `${baseSrc} ${w}w`).join(', ');
    }
    
    return undefined;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-muted',
        containerClassName
      )}
      style={{ aspectRatio }}
    >
      {/* Blur placeholder */}
      {blur && !isLoaded && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-muted animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
          srcSet={generateSrcSet(imageSrc)}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}

export default OptimizedImage;
