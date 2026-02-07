import { motion } from "framer-motion";
import { Shield, Truck } from "lucide-react";
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
    { icon: Shield, titleEn: "2-Year Warranty", titleAr: "ضمان سنتين" },
    { icon: Truck, titleEn: "14-Day Delivery", titleAr: "توصيل ١٤ يوم" },
  ];

  return (
    <section 
      className="bg-background py-20 md:py-28 px-4"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-8 md:gap-16">
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
              <p className={`text-sm text-foreground/80 font-body ${isArabic ? 'font-body-ar' : ''}`}>
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
