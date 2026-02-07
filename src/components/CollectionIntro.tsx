import { motion } from "framer-motion";
import { getLangFromStorage } from "@/i18n/strings";

const CollectionIntro = () => {
  const lang = getLangFromStorage();
  const isArabic = lang === 'ar';

  return (
    <section 
      id="collection" 
      className="w-full bg-background py-24 md:py-36 px-6 text-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <motion.p 
          className={`text-xs tracking-[0.2em] text-primary mb-6 ${isArabic ? 'font-body-ar' : 'font-body'}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isArabic ? 'المجموعة' : 'The Collection'}
        </motion.p>
        
        {/* Headline */}
        <motion.h2 
          className={`font-headline text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-14 font-bold leading-tight ${isArabic ? 'font-body-ar' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {isArabic ? 'مبني لبيوت حقيقية' : "Built for Real Homes"}
        </motion.h2>
      </div>
    </section>
  );
};

export default CollectionIntro;
