import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useBilingualText";

const Contact = () => {
  const { isArabic } = useLang();

  const handleWhatsAppContact = () => {
    const message = isArabic 
      ? "مرحباً! أريد معرفة المزيد عن ريكلاينرز Dandle."
      : "Hello! I'd like to learn more about Dandle recliners.";
    window.open(`https://wa.me/201222804255?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-foreground overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(28_80%_52%/0.06)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative line */}
            <div className="w-12 h-px bg-primary/30 mx-auto mb-8" />

            <span className={`text-xs text-primary/70 tracking-[0.2em] font-body font-light ${isArabic ? 'font-body-ar' : ''}`}>
              {isArabic ? "تواصل معنا" : "Get in Touch"}
            </span>
            
            <h2 className={`font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-10 font-normal leading-tight ${isArabic ? 'font-body-ar' : ''}`}>
              {isArabic ? "زُر معارضنا" : "Visit Our Showrooms"}
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
              className="inline-flex items-center gap-4 text-primary-foreground hover:text-primary transition-colors duration-500 group"
            >
              <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-colors duration-500">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="font-serif text-3xl md:text-4xl font-light tracking-wide" dir="ltr">
                01222804255
              </span>
            </a>
            <p className={`text-primary-foreground/60 text-sm mt-5 font-body font-light ${isArabic ? 'font-body-ar' : ''}`}>
              {isArabic ? "يومياً: ١٠ص-٣م و ٧م-٩م" : "Daily: 10am – 3pm & 7pm – 9pm"}
            </p>
          </motion.div>
          
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={handleWhatsAppContact}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-5 rounded-none text-sm tracking-wide font-body transition-all duration-500"
            >
              {isArabic ? "تواصل عبر واتساب" : "Connect via WhatsApp"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
