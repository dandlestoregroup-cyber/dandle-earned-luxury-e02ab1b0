import { useState, useEffect, useRef, useCallback } from "react";
import { LovableImage } from "@/catalog/lovableCatalog";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: LovableImage[];
  aspectRatio: number;
  altPrefix: string;
}

/**
 * ProductImageGallery - Enhanced gallery with zoom and magnifier
 * - Desktop: hover magnifier on main image
 * - Mobile: pinch zoom in lightbox
 * - Lazy loading thumbnails
 * - Blur placeholder
 */
export const ProductImageGallery = ({
  images,
  aspectRatio,
  altPrefix
}: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isZoomed && e.key === "Escape") {
        setIsZoomed(false);
        return;
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex(i => Math.max(0, i - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedIndex(i => Math.min(images.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isZoomed]);

  // Reset loaded state when image changes
  useEffect(() => {
    setIsLoaded(false);
  }, [selectedIndex]);

  // Scroll to selected image on mobile
  const scrollToIndex = useCallback((index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.scrollWidth / images.length;
      container.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
    }
    setSelectedIndex(index);
  }, [images.length]);

  const goToPrev = () => {
    const newIndex = Math.max(0, selectedIndex - 1);
    scrollToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = Math.min(images.length - 1, selectedIndex + 1);
    scrollToIndex(newIndex);
  };

  // Magnifier for desktop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !imageRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMagnifierPos({ x, y });
  }, [isMobile]);

  if (images.length === 0) {
    return (
      <div
        className="w-full bg-muted flex items-center justify-center rounded-lg"
        style={{ aspectRatio: aspectRatio.toString() }}
      >
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  const selectedImage = images[selectedIndex];
  const canGoPrev = selectedIndex > 0;
  const canGoNext = selectedIndex < images.length - 1;

  return (
    <>
      <div className="w-full space-y-4">
        {/* Main Stage */}
        <div
          className="relative w-full overflow-hidden bg-muted rounded-lg group"
          style={{ aspectRatio: aspectRatio.toString() }}
          onMouseEnter={() => !isMobile && setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
        >
          {/* Blur placeholder */}
          <div 
            className={cn(
              "absolute inset-0 bg-gradient-to-br from-secondary/20 to-muted transition-opacity duration-300",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
          />

          {/* Desktop: Show single image with magnifier */}
          {!isMobile && (
            <div className="relative w-full h-full">
              <img
                ref={imageRef}
                src={selectedImage.src}
                alt={`${altPrefix} - ${selectedImage.alt}`}
                className={cn(
                  "w-full h-full object-contain transition-opacity duration-500",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
                loading="eager"
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                  const fallback = selectedImage.fallbackSrc;
                  if (!fallback) return;
                  const target = e.currentTarget;
                  if (target.dataset.fallbackApplied === "1") return;
                  target.dataset.fallbackApplied = "1";
                  target.src = fallback;
                }}
              />
              
              {/* Magnifier lens */}
              {showMagnifier && isLoaded && (
                <div
                  className="absolute pointer-events-none w-40 h-40 border-2 border-primary/50 rounded-full overflow-hidden shadow-elegant z-20"
                  style={{
                    left: `calc(${magnifierPos.x}% - 80px)`,
                    top: `calc(${magnifierPos.y}% - 80px)`,
                    backgroundImage: `url(${selectedImage.src})`,
                    backgroundSize: '400%',
                    backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                  }}
                />
              )}
            </div>
          )}

          {/* Mobile: Horizontal scroll container */}
          {isMobile && images.length > 1 && (
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
              style={{ scrollBehavior: "smooth" }}
              onScroll={(e) => {
                const scrollLeft = e.currentTarget.scrollLeft;
                const itemWidth = e.currentTarget.scrollWidth / images.length;
                const index = Math.round(scrollLeft / itemWidth);
                if (index !== selectedIndex) {
                  setSelectedIndex(index);
                }
              }}
            >
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="snap-start flex-shrink-0 w-full h-full"
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={img.src}
                    alt={`${altPrefix} - ${img.alt}`}
                    className="w-full h-full object-contain"
                    loading={idx === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      const fallback = img.fallbackSrc;
                      if (!fallback) return;
                      const target = e.currentTarget;
                      if (target.dataset.fallbackApplied === "1") return;
                      target.dataset.fallbackApplied = "1";
                      target.src = fallback;
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Mobile: Single image when only 1 */}
          {isMobile && images.length === 1 && (
            <img
              src={selectedImage.src}
              alt={`${altPrefix} - ${selectedImage.alt}`}
              className="w-full h-full object-contain cursor-zoom-in"
              loading="eager"
              onClick={() => setIsZoomed(true)}
              onError={(e) => {
                const fallback = selectedImage.fallbackSrc;
                if (!fallback) return;
                const target = e.currentTarget;
                if (target.dataset.fallbackApplied === "1") return;
                target.dataset.fallbackApplied = "1";
                target.src = fallback;
              }}
            />
          )}

          {/* Zoom button (desktop) */}
          {!isMobile && (
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsZoomed(true)}
              aria-label="Zoom image"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          )}

          {/* Navigation Arrows - Always visible */}
          {images.length > 1 && (
            <>
              {canGoPrev && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-lg z-10 opacity-100 transition-all hover:scale-105"
                  onClick={goToPrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              {canGoNext && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-background/90 backdrop-blur-sm shadow-lg z-10 opacity-100 transition-all hover:scale-105"
                  onClick={goToNext}
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </>
          )}

          {/* Mobile: Dots Indicator */}
          {isMobile && images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all shadow-sm",
                    idx === selectedIndex
                      ? "bg-primary scale-125"
                      : "bg-background/80 hover:bg-primary/50"
                  )}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails (Desktop only) */}
        {!isMobile && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((img, idx) => (
              <motion.button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex-shrink-0 relative border-2 rounded-md transition-all overflow-hidden",
                  idx === selectedIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/50"
                )}
                style={{ aspectRatio: aspectRatio.toString(), width: "80px" }}
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    const fallback = img.fallbackSrc;
                    if (!fallback) return;
                    const target = e.currentTarget;
                    if (target.dataset.fallbackApplied === "1") return;
                    target.dataset.fallbackApplied = "1";
                    target.src = fallback;
                  }}
                />
              </motion.button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="text-center text-sm text-muted-foreground">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={() => setIsZoomed(false)}
              aria-label="Close zoom"
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation in zoom mode */}
            {images.length > 1 && (
              <>
                {canGoPrev && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                )}
                {canGoNext && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                )}
              </>
            )}

            <motion.img
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage.src}
              alt={`${altPrefix} - ${selectedImage.alt}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                const fallback = selectedImage.fallbackSrc;
                if (!fallback) return;
                const target = e.currentTarget;
                if (target.dataset.fallbackApplied === "1") return;
                target.dataset.fallbackApplied = "1";
                target.src = fallback;
              }}
            />

            {/* Counter in zoom mode */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductImageGallery;
