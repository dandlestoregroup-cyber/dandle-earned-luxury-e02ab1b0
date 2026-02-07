import { Facebook, Instagram, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useBilingualText";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  const quickLinks = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/#products" },
    { labelEn: "Our Story", labelAr: "قصتنا", href: "/our-story" },
    { labelEn: "Warranty", labelAr: "الضمان", href: "/warranty" },
    { labelEn: "Delivery", labelAr: "التوصيل", href: "/delivery" },
    { labelEn: "Contact", labelAr: "تواصل معنا", href: "/#contact" },
    { labelEn: "Careers", labelAr: "وظائف", href: "/careers" },
    { labelEn: "FAQ", labelAr: "الأسئلة الشائعة", href: "/faq" },
    { labelEn: "Compare", labelAr: "قارن", href: "/compare" },
  ];

  const legalLinks = [
    { labelEn: "Privacy", labelAr: "الخصوصية", href: "/privacy" },
    { labelEn: "Terms", labelAr: "الشروط", href: "/terms" },
  ];

  return (
    <footer 
      className="relative bg-foreground text-white overflow-hidden" 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      {/* Gradient accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div 
        className="container mx-auto px-6"
        style={{
          paddingTop: '3.5rem',
          paddingBottom: 'max(6rem, calc(4rem + env(safe-area-inset-bottom, 0px)))',
        }}
      >
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Dandle
            </h3>
            <p className={`text-white/40 text-xs tracking-widest mb-4 ${fontClass}`}>
              {isArabic ? "تأسست ٢٠٢٢ · مصر" : "Established 2022 · Egypt"}
            </p>
            <p className={`text-white/50 text-sm leading-relaxed max-w-xs ${fontClass}`}>
              {isArabic 
                ? "كراسي الراحة المصنوعة لبيوت حقيقية."
                : "Comfort chairs crafted for real homes."
              }
            </p>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className={`text-white/30 text-xs tracking-widest uppercase mb-5 ${fontClass}`}>
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-white/60 hover:text-primary transition-colors duration-300 text-sm ${fontClass}`}
                >
                  {isArabic ? link.labelAr : link.labelEn}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Connect Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className={`text-white/30 text-xs tracking-widest uppercase mb-5 ${fontClass}`}>
              {isArabic ? "تواصل" : "Connect"}
            </h4>
            <div className="space-y-4">
              <a 
                href="tel:+201222804255" 
                className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group"
              >
                <Phone size={15} className="group-hover:text-primary transition-colors" />
                <span className="text-sm" style={{ fontFeatureSettings: '"tnum"' }}>
                  +20 122 280 4255
                </span>
              </a>
              <a 
                href={buildWhatsAppUrl("Hi Dandle!")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/60 hover:text-primary transition-colors group"
              >
                <MessageCircle size={15} className="group-hover:text-primary transition-colors" />
                <span className={`text-sm ${fontClass}`}>
                  {isArabic ? "واتساب" : "WhatsApp"}
                </span>
              </a>
              <div className="flex gap-3 pt-1">
                <a
                  href="https://instagram.com/dandlestoregroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="https://facebook.com/dandlestoregroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/30 transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Service Strip */}
        <div className="border-t border-white/5 pt-6 mb-6">
          <p className={`text-center text-white/30 text-xs tracking-wide ${fontClass}`}>
            {isArabic 
              ? "صناعة مصرية · توصيل خلال ١٤ يوم · ضمان سنتين"
              : "Handmade in Egypt · Delivered in 14 days · 2-year warranty"
            }
          </p>
        </div>

        {/* Bottom Bar */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25 ${fontClass}`}>
          <p>
            {isArabic 
              ? `© ${currentYear} داندل. العبور، مصر.`
              : `© ${currentYear} Dandle. Obour, Egypt.`
            }
          </p>
          <div className="flex gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="hover:text-white/50 transition-colors"
              >
                {isArabic ? link.labelAr : link.labelEn}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
