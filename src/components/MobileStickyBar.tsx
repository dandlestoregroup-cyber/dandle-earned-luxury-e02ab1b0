import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useBilingualText } from "@/hooks/useBilingualText";
import { motion } from "framer-motion";

/**
 * Mobile-only sticky CTA bar at bottom of screen.
 * PWA-aware with safe-area insets for modern devices.
 */
const MobileStickyBar = () => {
  const ctaText = useBilingualText(
    "Find Your Perfect Recliner",
    "اكتشف مقعدك المثالي"
  );

  const handleClick = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-50"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="bg-background/95 backdrop-blur-lg border-t border-border px-4 py-3">
        <Button 
          onClick={handleClick}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-5 text-base font-body rounded-xl group transition-all duration-300 active:scale-[0.98]"
        >
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
};

export default MobileStickyBar;
