import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getGiftCampaignBackground } from "@/utils/siteImageResolver";
import { useState, useEffect } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";

const { src: backgroundImage, fallbackSrc: backgroundFallback } = getGiftCampaignBackground();

const GiftOfComfort = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useState<LangKey>('ar');

  useEffect(() => {
    const storedLang = getLangFromStorage();
    setLang(storedLang);
    const interval = setInterval(() => {
      const currentLang = getLangFromStorage();
      setLang(prev => prev !== currentLang ? currentLang : prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const isArabic = lang === 'ar';
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <section 
      id="gift-of-comfort" 
      className="relative min-h-[400px] md:min-h-[500px] overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Background Image */}
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
      
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 
              className={`text-white font-bold leading-tight ${isArabic ? 'font-body-ar' : 'font-headline'}`}
              style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}
            >
              {isArabic ? "لأصحاب الذوق الرفيع" : "For Refined Taste"}
            </h2>
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={() => navigate('/gift')}
              className={`bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-6 py-5 font-medium tracking-wide ${fontClass}`}
            >
              {isArabic ? "أرسل هدية" : "Send Gift"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftOfComfort;
