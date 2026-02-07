import { Facebook, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/hooks/useBilingualText";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  const links = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/#products" },
    { labelEn: "Our Story", labelAr: "قصتنا", href: "/our-story" },
    { labelEn: "Warranty", labelAr: "الضمان", href: "/warranty" },
    { labelEn: "Delivery", labelAr: "التوصيل", href: "/delivery" },
    { labelEn: "Contact", labelAr: "تواصل معنا", href: "/#contact" },
    { labelEn: "Careers", labelAr: "وظائف", href: "/careers" },
    { labelEn: "FAQ", labelAr: "الأسئلة الشائعة", href: "/faq" },
    { labelEn: "Compare", labelAr: "قارن", href: "/compare" },
  ];

  return (
    <footer 
      className="bg-foreground border-t border-white/10 text-white" 
      dir={isArabic ? 'rtl' : 'ltr'}
      style={{
        paddingTop: '4rem',
        paddingBottom: 'max(6rem, calc(4rem + env(safe-area-inset-bottom, 0px)))',
      }}
    >
      <div className="container mx-auto px-6">
        {/* Logo */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-headline text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
            Dandle
          </h3>
          <p className={`text-white/40 text-xs tracking-widest ${fontClass}`}>
            {isArabic ? "تأسست ٢٠٢٢" : "Established 2022"}
          </p>
        </motion.div>

        {/* Service Lines */}
        <div className={`text-center mb-8 ${fontClass}`}>
          <p className="text-white/60 text-sm">
            {isArabic 
              ? "توصيل خلال ١٤ يوم لجميع المحافظات • ضمان سنتين"
              : "Delivery in 14 days nationwide · 2-year warranty"
            }
          </p>
        </div>
        
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
        
        {/* Phone + Social */}
        <div className="flex flex-col items-center gap-4 mb-10">
          <a 
            href="tel:+201222804255" 
            className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors"
          >
            <Phone size={14} />
            <span className="text-sm font-medium" style={{ fontFeatureSettings: '"tnum"' }}>
              +20 122 280 4255
            </span>
          </a>
          <div className="flex gap-4">
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
