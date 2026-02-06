import { motion } from "framer-motion";
import { MapPin, Shield, Truck, Palette } from "lucide-react";
import { useState, useEffect } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";

const TrustBlock = () => {
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

  const trustPoints = [
    { icon: MapPin, titleEn: "Handcrafted in Cairo", titleAr: "مصنوع يدويًا في القاهرة" },
    { icon: Shield, titleEn: "2-Year Warranty", titleAr: "ضمان سنتين" },
    { icon: Truck, titleEn: "14-Day Delivery", titleAr: "توصيل خلال ١٤ يوم" },
    { icon: Palette, titleEn: "Egyptian-Inspired Colors", titleAr: "ألوان مستوحاة من مصر" },
  ];

  return (
    <section 
      className="bg-background py-24 md:py-32 px-4"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-5xl mx-auto">
        {/* Decorative line */}
        <motion.div
          className="w-12 h-px bg-primary/40 mx-auto mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        <motion.p 
          className="text-center font-body text-xs tracking-[0.2em] text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isArabic ? "الوعود" : "Our Promise"}
        </motion.p>

        <motion.h2
          className={`font-serif text-3xl md:text-4xl text-foreground text-center mb-16 md:mb-20 font-normal ${isArabic ? 'font-body-ar' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {isArabic ? "لماذا يختار الناس داندل" : "Why People Choose Dandle"}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6 md:gap-8">
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mb-5 group-hover:border-primary/40 transition-colors duration-500">
                <point.icon className="w-5 h-5 text-primary stroke-[1.5]" />
              </div>
              <p className={`text-sm text-foreground/80 font-body font-light tracking-wide ${isArabic ? 'font-body-ar' : ''}`}>
                {isArabic ? point.titleAr : point.titleEn}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBlock;
