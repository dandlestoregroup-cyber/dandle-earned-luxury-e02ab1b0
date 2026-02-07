import { useState, useEffect } from "react";
import { Menu, X, Phone, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { CartButton } from "@/components/cart/CartButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useBilingualText";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { isArabic } = useLang();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/collection", isRoute: true },
    { labelEn: "Gift Finder", labelAr: "دليل الهدايا", href: "/gift", isRoute: true },
    { labelEn: "Compare", labelAr: "قارن", href: "/compare", isRoute: true },
    { labelEn: "Our Story", labelAr: "قصتنا", href: "/our-story", isRoute: true },
    { labelEn: "Contact", labelAr: "تواصل", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed z-50 transition-all duration-500",
        isScrolled 
          ? "top-0 left-0 right-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)]" 
          : "top-4 left-4 right-4 md:top-4 md:left-6 md:right-6 rounded-2xl bg-white/95 border border-border"
      )}
    >
      <div className={cn(
        "mx-auto px-4 md:px-8",
        isScrolled ? "container" : ""
      )}>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate('/')} 
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Dandle
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className="relative text-sm font-body text-foreground/70 hover:text-foreground transition-colors tracking-wide link-underline"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span data-en={link.labelEn} data-ar={link.labelAr}>{link.labelEn}</span>
                </motion.button>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative text-sm font-body text-foreground/70 hover:text-foreground transition-colors tracking-wide link-underline"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  data-en={link.labelEn}
                  data-ar={link.labelAr}
                >
                  {link.labelEn}
                </motion.a>
              )
            ))}
            
            <div className="flex items-center gap-4 pl-6 border-l border-border">
              <a 
                href="tel:+201222804255" 
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors tnum"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">01222804255</span>
              </a>
              <CartButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground/70 hover:text-foreground transition-colors p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen 
              ? (isArabic ? "إغلاق القائمة" : "Close menu") 
              : (isArabic ? "فتح القائمة" : "Open menu")
            }
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="md:hidden py-6 border-t border-border"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {navLinks.map((link, index) => (
                link.isRoute ? (
                  <motion.button
                    key={link.href}
                    onClick={() => {
                      navigate(link.href);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-3 text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span data-en={link.labelEn} data-ar={link.labelAr}>{link.labelEn}</span>
                  </motion.button>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-foreground/70 hover:text-foreground transition-colors font-body tracking-wide"
                    onClick={() => setIsOpen(false)}
                    data-en={link.labelEn}
                    data-ar={link.labelAr}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {link.labelEn}
                  </motion.a>
                )
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navigation;
