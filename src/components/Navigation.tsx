import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { CartButton } from "@/components/cart/CartButton";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/hooks/useBilingualText";

type NavTheme = "light" | "dark";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("dark");
  const navigate = useNavigate();
  const { isArabic } = useLang();
  const rafRef = useRef<number>();

  const toggleLang = () => {
    const next = isArabic ? "en" : "ar";
    localStorage.setItem("dandle-lang", next);
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const sampleBackground = () => {
      const el = document.elementFromPoint(window.innerWidth / 2, 80);
      if (!el) return;

      const bg = window.getComputedStyle(el).backgroundColor;
      if (!bg || bg === "rgba(0, 0, 0, 0)" || bg === "transparent") {
        let parent = el.parentElement;
        while (parent) {
          const parentBg = window.getComputedStyle(parent).backgroundColor;
          if (parentBg && parentBg !== "rgba(0, 0, 0, 0)" && parentBg !== "transparent") {
            setTheme(isColorDark(parentBg) ? "light" : "dark");
            return;
          }
          parent = parent.parentElement;
        }
        setTheme("dark");
        return;
      }
      setTheme(isColorDark(bg) ? "light" : "dark");
    };

    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(sampleBackground);
    };

    sampleBackground();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const navLinks = [
    { labelEn: "Collection", labelAr: "المجموعة", href: "/collection", isRoute: true },
    { labelEn: "Gift Finder", labelAr: "دليل الهدايا", href: "/gift", isRoute: true },
    { labelEn: "Compare", labelAr: "قارن", href: "/compare", isRoute: true },
    { labelEn: "Our Story", labelAr: "قصتنا", href: "/our-story", isRoute: true },
    { labelEn: "Contact", labelAr: "تواصل", href: "#contact" },
  ];

  const isLight = theme === "light";

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-500",
        isLight ? "bg-transparent" : "bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Language Toggle Pill */}
          <button
            onClick={toggleLang}
            className={cn(
              "flex items-center gap-0 rounded-full px-4 py-2 text-sm font-body transition-all duration-300 shadow-subtle",
              isLight
                ? "bg-white/90 backdrop-blur-sm text-foreground"
                : "bg-card text-foreground shadow-subtle"
            )}
          >
            <span className={cn(
              "transition-colors",
              isArabic ? "text-primary font-bold" : "text-muted-foreground"
            )}>
              العربية
            </span>
            <span className="mx-2 text-border">|</span>
            <span className={cn(
              "transition-colors",
              !isArabic ? "text-primary font-bold" : "text-muted-foreground"
            )}>
              EN
            </span>
          </button>

          {/* Logo */}
          <motion.button
            onClick={() => navigate('/')}
            className="relative group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className={cn(
              "font-headline text-2xl md:text-3xl font-bold tracking-[0.15em] transition-colors duration-500",
              isLight ? "text-white" : "text-foreground"
            )}>
              DANDLE
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              link.isRoute ? (
                <motion.button
                  key={link.href}
                  onClick={() => navigate(link.href)}
                  className={cn(
                    "relative text-sm font-body transition-colors tracking-wide link-underline",
                    isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <span data-en={link.labelEn} data-ar={link.labelAr}>
                    {isArabic ? link.labelAr : link.labelEn}
                  </span>
                </motion.button>
              ) : (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-body transition-colors tracking-wide link-underline",
                    isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {isArabic ? link.labelAr : link.labelEn}
                </motion.a>
              )
            ))}

            <div className={cn(
              "flex items-center gap-4 pl-6 border-l transition-colors duration-500",
              isLight ? "border-white/30" : "border-border"
            )}>
              <a
                href="tel:+201222804255"
                className={cn(
                  "flex items-center gap-2 text-sm transition-colors tnum",
                  isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-primary"
                )}
              >
                <Phone className="w-4 h-4" />
                <span className="hidden lg:inline">01222804255</span>
              </a>
              <CartButton />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden transition-colors p-2",
              isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
            )}
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
              className={cn(
                "md:hidden py-6 border-t",
                isLight ? "border-white/20 bg-black/60 backdrop-blur-md" : "border-border"
              )}
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
                    className={cn(
                      "block w-full text-left py-3 transition-colors font-body tracking-wide",
                      isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <span data-en={link.labelEn} data-ar={link.labelAr}>
                      {isArabic ? link.labelAr : link.labelEn}
                    </span>
                  </motion.button>
                ) : (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block py-3 transition-colors font-body tracking-wide",
                      isLight ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {isArabic ? link.labelAr : link.labelEn}
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

/** Returns true if the parsed RGB color is dark (luminance < 0.5) */
function isColorDark(color: string): boolean {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return false;
  const [, r, g, b] = match.map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.45;
}

export default Navigation;
