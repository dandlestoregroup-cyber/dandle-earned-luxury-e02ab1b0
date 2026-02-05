import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from "lucide-react";
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
    <section id="contact" className="py-24 md:py-32 bg-obsidian" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className={`text-xs text-champagne/80 tracking-wide font-light ${isArabic ? 'font-body-ar' : 'font-body'}`}>
              {isArabic ? "تواصل معنا" : "Get in Touch"}
            </span>
            
            <h2 className={`text-4xl md:text-5xl text-warm-white mt-4 mb-8 font-light ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
              {isArabic ? "زُر معارضنا" : "Visit Our Showrooms"}
            </h2>
          </motion.div>
          
          {/* Phone Number - Large */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <a 
              href="tel:01222804255" 
              className="inline-flex items-center gap-4 text-warm-white hover:text-champagne transition-colors group"
            >
              <Phone className="w-5 h-5 text-champagne" />
              <span className="font-headline text-3xl md:text-4xl font-light tracking-wide" dir="ltr">
                01222804255
              </span>
            </a>
            <p className={`text-champagne/90 text-sm mt-4 font-light ${isArabic ? 'font-body-ar' : 'font-body'}`}>
              {isArabic ? "يومياً: ١٠ص-٣م و ٧م-٩م" : "Daily: 10AM-3PM & 7PM-9PM"}
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
              className="btn-refined rounded-none"
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
