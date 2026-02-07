import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import { getGiftCampaignBackground } from "@/utils/siteImageResolver";
import { useLang } from "@/hooks/useBilingualText";

const { src: backgroundImage, fallbackSrc: backgroundFallback } = getGiftCampaignBackground();

const GiftOfComfort = () => {
  const navigate = useNavigate();
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <section 
      id="gift-of-comfort" 
      className="relative min-h-[400px] md:min-h-[500px] overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt="Gift of Comfort"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== backgroundFallback) {
              e.currentTarget.src = backgroundFallback;
            }
          }}
        />
        <div className="absolute inset-0 bg-foreground" style={{ opacity: 0.95 }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24 flex items-center justify-center">
        <motion.div
          className="max-w-4xl w-full mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Shimmer border effect */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(184,92,56,0.15), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Gift Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
            animate={{ boxShadow: ['0 0 20px rgba(184,92,56,0.1)', '0 0 40px rgba(184,92,56,0.25)', '0 0 20px rgba(184,92,56,0.1)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift className="w-8 h-8 text-primary" />
          </motion.div>

          <h2 
            className={`text-white font-bold leading-tight mb-3 ${isArabic ? 'font-body-ar' : 'font-headline'}`}
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
          >
            {isArabic ? "لأصحاب الذوق الرفيع" : "For Refined Taste"}
          </h2>

          <p className={`text-white/60 text-lg mb-8 ${fontClass}`}>
            {isArabic ? "أهدِ راحة" : "Give the gift of comfort"}
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/gift')}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-5 font-medium tracking-wide ${fontClass}`}
            >
              {isArabic ? "أرسل هدية" : "Send Gift"}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftOfComfort;
