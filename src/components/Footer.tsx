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
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  const links = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/#products" },
    { labelEn: "Experience Room", labelAr: "غرفة التجربة", href: "/#contact" },
    { labelEn: "Authenticity Check", labelAr: "تحقق الأصالة", href: "/faq" },
    { labelEn: "Privacy", labelAr: "الخصوصية", href: "/privacy" },
  ];

  return (
    <footer 
      className="bg-foreground border-t border-white/10 text-white" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        paddingTop: '4rem',
        paddingBottom: 'max(5rem, calc(3rem + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      <div className="container mx-auto px-6">
        {/* Logo */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-headline text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Dandle
          </h3>
        </motion.div>
        
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm mb-8">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-white/60 hover:text-primary transition-colors duration-500 ${fontClass}`}
            >
              {isArabic ? link.labelAr : link.labelEn}
            </Link>
          ))}
        </div>
        
        {/* Social */}
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://instagram.com/dandlestoregroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/40 transition-all duration-500"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://facebook.com/dandlestoregroup"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/40 transition-all duration-500"
            aria-label="Facebook"
          >
            <Facebook size={16} />
          </a>
        </div>
        
        {/* Legal */}
        <div className={`text-center text-xs space-y-2 text-white/40 ${fontClass}`}>
          <p>
            {isArabic 
              ? `© ${currentYear} داندل. عبور، مصر.`
              : `© ${currentYear} Dandle. Obour, Egypt.`
            }
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
