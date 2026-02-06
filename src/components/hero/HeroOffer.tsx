import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import HeroParticles from "./HeroParticles";
import HeroSnow from "./HeroSnow";
import AnimatedHeadline from "./AnimatedHeadline";
import { useLang } from "@/hooks/useBilingualText";

interface HeroOfferProps {
  onReplayVideo?: () => void;
}

const HeroOffer = ({ onReplayVideo }: HeroOfferProps) => {
  const [offerImage, setOfferImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isArabic } = useLang();

  useEffect(() => {
    const checkOfferImage = async () => {
      const baseUrl = import.meta.env.VITE_SUPABASE_URL;
      const imageUrl = `${baseUrl}/storage/v1/object/public/product-images/hero/festive-offer.webp`;
      try {
        const res = await fetch(imageUrl, { method: "HEAD" });
        if (res.ok) setOfferImage(imageUrl);
      } catch { /* fallback */ }
      setIsLoading(false);
    };
    checkOfferImage();
  }, []);

  const fallbackImage = "/images/relaxmax-hero-offwhite.jpg";
  const displayImage = offerImage || fallbackImage;
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <motion.div
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden bg-foreground">
        {isLoading ? (
          <div className="w-full h-full bg-gradient-to-br from-foreground to-foreground" />
        ) : (
          <motion.img
            src={displayImage}
            alt="Dandle Recliners"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 14, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35 pointer-events-none" />

      {/* Atmospheric Effects */}
      <div className="z-0">
        <HeroParticles density={18} tone="ivory" />
        <HeroSnow density={12} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        {/* Eyebrow */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className={`text-xs md:text-sm tracking-[0.25em] text-white/60 font-light ${fontClass}`}>
            {isArabic ? "فن الراحة" : "The Art of Rest"}
          </span>
        </motion.div>

        {/* SEO H1 */}
        <h1 className="sr-only">Dandle Recliners - Premium Egyptian-Made Comfort Chairs</h1>
        
        {/* Animated Headline */}
        <AnimatedHeadline 
          textEn="The Gift of Comfort"
          textAr="هدية الراحة"
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal text-white text-center mb-5"
          style={{ wordBreak: 'normal', overflowWrap: 'normal', hyphens: 'none', textWrap: 'balance' }}
          delay={0.5}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <motion.p
          className={`text-base md:text-lg lg:text-xl text-white/80 text-center mb-2 max-w-2xl font-light ${fontClass}`}
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {isArabic ? "لأصحاب الذوق الرفيع" : "For refined taste"}
        </motion.p>

        {/* Origin Line */}
        <motion.p
          className={`text-sm md:text-base text-white/60 text-center mb-3 ${fontClass}`}
          style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8)' }}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.6 }}
        >
          {isArabic ? "صناعة مصرية. لبيوت حقيقية." : "Crafted in Egypt. Made for Real Homes."}
        </motion.p>

        {/* Proof Line */}
        <motion.p
          className={`text-white/50 text-center text-xs md:text-sm tracking-wide mb-10 ${fontClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          {isArabic ? "تسليم خلال ١٤ يوم  •  ضمان سنتين" : "14-Day Delivery  •  2-Year Warranty"}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <Button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-full sm:w-auto group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-5 text-base rounded-none tracking-wide transition-all duration-500 ${fontClass}`}
          >
            {isArabic ? "اعثر على كرسيك المثالي" : "Find Your Perfect Recliner"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className={`w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/15 hover:bg-white/10 hover:border-white/30 text-white px-8 py-5 text-base rounded-none tracking-wide transition-all duration-500 ${fontClass}`}
          >
            {isArabic ? "استكشف المجموعة" : "Explore Collection"}
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        animate={{ y: [0, 6, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        initial={{ opacity: 0 }}
      >
        <div className="w-5 h-9 rounded-full border border-white/30 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1 h-1 bg-white/80 rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroOffer;
