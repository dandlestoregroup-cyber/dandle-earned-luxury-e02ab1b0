import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden bg-foreground">
        {isLoading ? (
          <div className="w-full h-full bg-foreground" />
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

      {/* Minimal overlay - 5% black top-only */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6">
        {/* SEO H1 */}
        <h1 className="sr-only">Dandle Recliners - Premium Egyptian-Made Comfort Chairs</h1>
        
        {/* Animated Headline */}
        <AnimatedHeadline 
          textEn="The Gift of Comfort"
          textAr="هدية الراحة"
          className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold text-white text-center mb-5"
          style={{ wordBreak: 'normal', overflowWrap: 'normal', hyphens: 'none', textWrap: 'balance' }}
          delay={0.5}
          aria-hidden="true"
        />

        {/* Subtitle */}
        <motion.p
          className={`text-base md:text-lg text-white/80 text-center mb-10 max-w-2xl ${fontClass}`}
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          {isArabic ? "صناعة مصرية. لبيوت حقيقية." : "Crafted in Egypt. Made for Real Homes."}
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
            className={`w-full sm:w-auto group bg-foreground hover:bg-foreground/90 text-background px-8 py-5 text-base rounded-none tracking-wide transition-all duration-500 ${fontClass}`}
          >
            {isArabic ? "اختر مقعدك" : "Find Your Seat"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            variant="outline"
            className={`w-full sm:w-auto border border-white text-white hover:bg-white/10 px-8 py-5 text-base rounded-none tracking-wide transition-all duration-500 ${fontClass}`}
          >
            {isArabic ? "زُر غرفة التجربة" : "Visit Experience Room"}
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
