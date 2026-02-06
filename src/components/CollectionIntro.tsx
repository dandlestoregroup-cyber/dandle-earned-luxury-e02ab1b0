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
        {/* Decorative line */}
        <motion.div
          className="w-12 h-px bg-primary/40 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Eyebrow */}
        <motion.p 
          className="font-body text-xs tracking-[0.2em] text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {isArabic ? 'المجموعة' : 'The Collection'}
        </motion.p>
        
        {/* Headline */}
        <motion.h2 
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-10 md:mb-14 font-normal leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {isArabic ? 'راحة ستحبها كل يوم' : "Comfort You'll Love Every Day"}
        </motion.h2>
        
        {/* Description */}
        <motion.p 
          className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {isArabic ? (
            <>
              من الحلول المدمجة إلى الراحة العائلية،
              كل كرسي Dandle مصمم ليشعرك بالراحة —
              يومًا بعد يوم.
            </>
          ) : (
            <>
              From compact solutions to family-sized comfort,
              every Dandle recliner is built to feel right —
              day after day.
            </>
          )}
        </motion.p>
      </div>
    </section>
  );
};

export default CollectionIntro;
