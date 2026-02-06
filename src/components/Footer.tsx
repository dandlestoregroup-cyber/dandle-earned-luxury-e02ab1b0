import { Facebook, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";

const Footer = () => {
  const currentYear = new Date().getFullYear();
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

  const links = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/#products" },
    { labelEn: "Our Story", labelAr: "قصتنا", href: "/our-story" },
    { labelEn: "About", labelAr: "من نحن", href: "/about" },
    { labelEn: "Warranty", labelAr: "الضمان", href: "/warranty" },
    { labelEn: "Delivery", labelAr: "التوصيل", href: "/delivery" },
    { labelEn: "FAQ", labelAr: "أسئلة شائعة", href: "/faq" },
    { labelEn: "Contact", labelAr: "تواصل", href: "/contact" },
    { labelEn: "Careers", labelAr: "الوظائف", href: "/careers" },
  ];

  const toolLinks = [
    { labelEn: "Gift Finder", labelAr: "دليل الهدايا", href: "/gift" },
    { labelEn: "Chair Finder", labelAr: "دليل الكرسي", href: "/chair-finder" },
    { labelEn: "Room Fit", labelAr: "مقاس الركن", href: "/room-fit" },
    { labelEn: "Compare", labelAr: "قارن", href: "/compare" },
  ];

  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <footer 
      className="bg-foreground border-t border-primary/10 text-primary-foreground" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        paddingTop: '4rem',
        paddingBottom: 'max(5rem, calc(3rem + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      <div className="container mx-auto px-6">
        {/* Logo & Tagline */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-serif text-4xl md:text-5xl font-light text-primary-foreground tracking-tight mb-4">
            Dandle
          </h3>
          <p className={`text-xs tracking-[0.2em] font-light text-primary-foreground/60 ${fontClass}`}>
            {isArabic ? "راحة تصنع الفرق" : "Comfort That Transforms"}
          </p>
        </motion.div>
        
        {/* Divider */}
        <div className="w-12 h-px bg-primary/20 mx-auto mb-10" />
        
        {/* Navigation Links */}
        <motion.div 
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-primary-foreground/60 hover:text-primary transition-colors duration-500 font-light ${fontClass}`}
            >
              {isArabic ? link.labelAr : link.labelEn}
            </Link>
          ))}
        </motion.div>

        {/* Quick Tools Links */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-xs mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <span className={`text-primary-foreground/40 ${fontClass}`}>
            {isArabic ? "أدوات:" : "Tools:"}
          </span>
          {toolLinks.map((link, index) => (
            <span key={link.href} className="flex items-center gap-2">
              <Link
                to={link.href}
                className={`text-primary/80 hover:text-primary transition-colors duration-300 font-medium ${fontClass}`}
              >
                {isArabic ? link.labelAr : link.labelEn}
              </Link>
              {index < toolLinks.length - 1 && <span className="text-primary-foreground/20">·</span>}
            </span>
          ))}
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://facebook.com/dandlestoregroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-500"
            aria-label={isArabic ? "فيسبوك" : "Facebook"}
          >
            <Facebook size={16} />
          </a>
          <a
            href="https://instagram.com/dandlestoregroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-primary-foreground/15 flex items-center justify-center text-primary-foreground/50 hover:text-primary hover:border-primary/40 transition-all duration-500"
            aria-label={isArabic ? "إنستاجرام" : "Instagram"}
          >
            <Instagram size={16} />
          </a>
        </motion.div>
        
        {/* Phone Number */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.6 }}
        >
          <a 
            href="tel:+201222804255" 
            className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-primary transition-colors duration-500 text-sm font-light"
          >
            <Phone size={14} className="text-primary/60" />
            <span dir="ltr">01222804255</span>
          </a>
        </motion.div>
        
        {/* Divider */}
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mb-8" />
        
        {/* Service Info */}
        <motion.div 
          className="text-center mb-8 px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <p className={`text-sm font-medium text-primary-foreground/70 ${fontClass}`}>
            {isArabic 
              ? "التسليم خلال 14 يوم في جميع المحافظات. ضمان سنتين."
              : "Delivery in 14 days nationwide. 2-year warranty."
            }
          </p>
        </motion.div>
        
        {/* Copyright & Legal */}
        <div className={`text-center text-xs font-light space-y-2 text-primary-foreground/40 ${fontClass}`}>
          <p>
            {isArabic 
              ? `© ${currentYear} مجموعة داندل ستور`
              : `© ${currentYear} Dandle Store Group`
            }
          </p>
          <p>
            <Link to="/privacy" className="hover:text-primary-foreground/70 transition-opacity">
              {isArabic ? "الخصوصية" : "Privacy"}
            </Link>
            <span className="mx-3">·</span>
            <Link to="/terms" className="hover:text-primary-foreground/70 transition-opacity">
              {isArabic ? "الشروط" : "Terms"}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
