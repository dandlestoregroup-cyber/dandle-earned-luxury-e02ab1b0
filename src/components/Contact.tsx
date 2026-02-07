import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLang } from "@/hooks/useBilingualText";

const Contact = () => {
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-foreground overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className={`font-headline text-4xl md:text-5xl lg:text-6xl text-white mt-6 mb-10 font-bold leading-tight ${isArabic ? 'font-body-ar' : ''}`}>
              {isArabic ? "زُر غرفة التجربة" : "Visit the Experience Room"}
            </h2>
          </motion.div>
          
          {/* Phone Number */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-14"
          >
            <a 
              href="tel:01222804255" 
              className="inline-flex items-center gap-4 text-white hover:text-primary transition-colors duration-500 group"
            >
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="font-headline text-3xl md:text-4xl font-bold tracking-wide tnum" dir="ltr">
                +20 122 280 4255
              </span>
            </a>
            <p className={`text-white/60 text-sm mt-5 font-body ${isArabic ? 'font-body-ar' : ''}`}>
              {isArabic ? "يومياً ١٠ص - ١٠م" : "Daily 10AM – 10PM"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
