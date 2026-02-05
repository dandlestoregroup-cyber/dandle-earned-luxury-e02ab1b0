import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { getLovableProduct } from "@/catalog/lovableCatalog";
import { cn } from "@/lib/utils";
import { productColorImages, getProductColorImage } from "@/data/productColorImages";
import { productSwatches } from "@/data/productSwatches";
import { PALETTE_MAP } from "@/data/palette";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";
import WishlistButton from "@/components/WishlistButton";

// Arabic product translations with proper format: Arabic name (English name)
const productTranslations: Record<string, { name: string; englishName: string; tagline: string; truth: string }> = {
  relaxmax: { 
    name: "ريلاكس ماكس", 
    englishName: "RelaxMax",
    tagline: "المقعد الافتراضي", 
    truth: "مألوف. سهل. صحيح."
  },
  "relaxmax-limited": { 
    name: "ريلاكس ماكس ليميتد إيديشن", 
    englishName: "RelaxMax Limited Edition",
    tagline: "الفخامة تلتقي بالأداء", 
    truth: "دوار. رشفة. استرخاء."
  },
  comfortplus: { 
    name: "كومفورت بلس", 
    englishName: "ComfortPlus",
    tagline: "استرخِ عميقاً. فكّر بوضوح.", 
    truth: "تحرّر. تجدد. عودة."
  },
  diva: { 
    name: "ديفا", 
    englishName: "Diva",
    tagline: "حيث تلتقي الأناقة بالراحة", 
    truth: "جريء. جميل. لا يُنسى."
  },
  cozycompanion: { 
    name: "كوزي كومبانيون", 
    englishName: "CozyCompanion",
    tagline: "راحة لاثنين", 
    truth: "اجتمع. استرخِ. ابقَ."
  },
  easyup: { 
    name: "إيزي أب", 
    englishName: "EasyUp Lift",
    tagline: "اجلس براحة، قوم بسهولة", 
    truth: "سهولة. دعم. ثقة."
  },
  "easyup-compact": { 
    name: "إيزي أب كومباكت", 
    englishName: "EasyUp Compact",
    tagline: "رفع لطيف، تصميم مدمج", 
    truth: "مدمج. نظيف. قادر."
  },
  worknest: { 
    name: "وورك نست", 
    englishName: "WorkNest",
    tagline: "اشعر أفضل. اعمل أفضل.", 
    truth: "راحة. وضوح. إنتاج."
  },
  spacesaver: { 
    name: "سبيس سيفر", 
    englishName: "SpaceSaver",
    tagline: "نفس الراحة، مساحة أصغر", 
    truth: "مدمج. مريح. صحيح."
  },
  "complete-set": { 
    name: "طقم العائلة", 
    englishName: "Complete Set",
    tagline: "راحة للعائلة بأكملها", 
    truth: "اجتمع. استرخِ. ابقَ."
  },
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lovableProduct = getLovableProduct(product.id);
  const defaultHeroImage = lovableProduct?.heroImage.src || product.imageUrl;
  const defaultHeroFallback = lovableProduct?.heroImage.fallbackSrc || product.imageUrl;
  
  const [lang, setLang] = useState<LangKey>('en');
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredSwatchIndex, setHoveredSwatchIndex] = useState<number | null>(null);
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  
  // 3D Tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);
  
  // Cursor position for custom cursor
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
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
  const translation = productTranslations[product.id];
  
  // Get swatches from productSwatches (palette keys) instead of product.colors
  const swatchKeys = productSwatches[product.id] || [];
  const [currentSwatchIndex, setCurrentSwatchIndex] = useState(0);

  // Get the current swatch key and its image
  const currentSwatchKey = swatchKeys[currentSwatchIndex] || null;
  
  const displayImage = useMemo(() => {
    if (currentSwatchKey) {
      const colorImage = getProductColorImage(product.id, currentSwatchKey);
      if (colorImage) return colorImage;
    }
    return defaultHeroImage;
  }, [currentSwatchIndex, currentSwatchKey, defaultHeroImage, product.id]);

  // Get hex color for a palette key
  const getSwatchHex = (swatchKey: string): string => {
    const paletteEntry = PALETTE_MAP.get(swatchKey);
    return paletteEntry?.hex || "#CCC";
  };

  // Get display name for a palette key
  const getSwatchName = (swatchKey: string): string => {
    const paletteEntry = PALETTE_MAP.get(swatchKey);
    if (!paletteEntry) return swatchKey;
    return isArabic ? paletteEntry.nameAr : paletteEntry.nameEn;
  };

  // Navigation handlers for image arrows
  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swatchKeys.length > 0) {
      setCurrentSwatchIndex(prev => prev === 0 ? swatchKeys.length - 1 : prev - 1);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (swatchKeys.length > 0) {
      setCurrentSwatchIndex(prev => prev === swatchKeys.length - 1 ? 0 : prev + 1);
    }
  };

  // Handle swatch click - instantly update the image
  const handleSwatchClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentSwatchIndex(index);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };
 
   const formatMonthlyInstallment = (price: number) => {
     const monthly = Math.ceil(price / 12);
     return new Intl.NumberFormat("en-EG", {
       minimumFractionDigits: 0,
       maximumFractionDigits: 0,
     }).format(monthly);
   };

  const getPriceDisplay = () => {
    if (product.comingSoon || product.beFirstToKnow) return null;
    if (product.priceManual && product.pricePower) {
      return `${formatPrice(product.priceManual)} — ${formatPrice(product.pricePower)}`;
    }
    return product.price ? formatPrice(product.price) : "Contact for Price";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
    
    // Update custom cursor position
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowCustomCursor(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowCustomCursor(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // WhatsApp notification for ComingSoon or BeFirstToKnow products
  const handleCardClick = () => {
    if (product.comingSoon || product.beFirstToKnow) {
      const productName = isArabic && translation ? translation.name : product.name;
      const message = `ممكن تنبهوني أول ما ${productName} يبقى متاح؟`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/201222804255?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
  };

  // Display names - Arabic WITH English in brackets
  const displayName = isArabic && translation 
    ? <>{translation.name} (<span dir="ltr">{translation.englishName}</span>)</>
    : product.name;
  const displayTagline = isArabic && translation ? translation.tagline : product.tagline;
  const displayTruth = isArabic && translation ? translation.truth : product.truth;

  // Animation variants for choreographed sequence
  const choreographyDelays = {
    badge: 0,
    imageZoom: 0.2,
    gradient: 0.3,
    tagline: 0.4,
    productName: 0.5,
    truth: 0.55,
    price: 0.6,
    swatches: 0.6,
    cta: 0.7,
  };

  // Determine badge type
  const showComingSoonBadge = product.comingSoon;
  const showBeFirstBadge = product.beFirstToKnow && !product.comingSoon;

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-sm",
        "bg-cream transition-colors duration-300",
        showCustomCursor && "cursor-none"
      )}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        y: isHovered ? -4 : 0,
        boxShadow: isHovered 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 12px 24px -8px rgba(212, 175, 55, 0.15), inset 0 0.5px 0 rgba(212, 175, 55, 0.3)" 
          : "0 4px 12px -4px rgba(0, 0, 0, 0.08)",
      }}
    >
      {/* Custom Champagne Cursor */}
      {showCustomCursor && (
        <motion.div
          className="pointer-events-none absolute z-50 w-5 h-5 rounded-full bg-champagne/80 mix-blend-difference"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.15 }}
        />
      )}

      {/* Champagne edge shimmer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-40 rounded-sm"
        style={{
          background: isHovered 
            ? "linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, transparent 30%, transparent 70%, rgba(212, 175, 55, 0.2) 100%)"
            : "transparent",
          border: isHovered ? "1px solid rgba(212, 175, 55, 0.4)" : "1px solid transparent",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Canvas grain texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-30 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Image Container - Larger, cleaner */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-cream via-off-white to-warm-beige/20">
        {/* Wishlist Button - Top Left */}
        {!product.comingSoon && !product.beFirstToKnow && (
          <div className="absolute top-4 left-4 z-30">
            <WishlistButton 
              product={{ 
                id: product.id, 
                name: product.name,
                color: currentSwatchKey || undefined 
              }} 
              size="sm"
            />
          </div>
        )}
        
        {/* Image Navigation Arrows - Always visible when multiple swatches */}
        {swatchKeys.length > 1 && !product.comingSoon && !product.beFirstToKnow && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-off-white/90 hover:bg-off-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Previous color"
            >
              <ChevronLeft className="w-5 h-5 text-deep-brown" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-off-white/90 hover:bg-off-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110"
              aria-label="Next color"
            >
              <ChevronRight className="w-5 h-5 text-deep-brown" />
            </button>
            {/* Image counter indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
              {swatchKeys.slice(0, 7).map((_, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    currentSwatchIndex === index 
                      ? "bg-dandle-orange w-3" 
                      : "bg-deep-brown/40"
                  )}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Layer 1: Product Image with zoom and brightness */}
        <motion.img
          src={displayImage}
          alt={product.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.dataset.fallbackApplied === "1") return;
            target.dataset.fallbackApplied = "1";
            target.src = defaultHeroFallback;
          }}
          className="w-full h-full object-contain object-center"
          style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
          animate={{ 
            scale: isHovered ? 1.15 : 1,
            filter: isHovered ? "brightness(1.1)" : "brightness(1)",
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.22, 1, 0.36, 1],
            delay: isHovered ? choreographyDelays.imageZoom : 0,
          }}
          loading="lazy"
        />

        {/* Layer 2: Vignette overlay with parallax */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(13, 13, 13, 0.4) 100%)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            x: isHovered ? mouseX.get() * -10 : 0,
            y: isHovered ? mouseY.get() * -10 : 0,
          }}
        />
        
        {/* Layer 3: Dark gradient wipes up - frosted glass */}
        <motion.div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(15deg, rgba(13, 13, 13, 0.9) 0%, rgba(13, 13, 13, 0.6) 35%, transparent 70%)",
            backdropFilter: isHovered ? "blur(2px)" : "blur(0px)",
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ 
            y: isHovered ? "0%" : "100%", 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.22, 1, 0.36, 1],
            delay: isHovered ? choreographyDelays.gradient : 0,
          }}
        />
        
        {/* Coming Soon Badge */}
        {showComingSoonBadge && (
          <motion.div 
            className="absolute top-4 right-4 z-20"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden">
              <motion.span 
                className="inline-block bg-gradient-to-r from-champagne via-champagne-light to-champagne text-obsidian px-4 py-2 text-xs font-semibold tracking-wide rounded-sm"
                style={{
                  boxShadow: "0 4px 12px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                {isArabic ? "قريباً" : "Coming Soon"}
              </motion.span>
            </div>
          </motion.div>
        )}

        {/* Be First to Know Badge */}
        {showBeFirstBadge && (
          <motion.div 
            className="absolute top-4 right-4 z-20"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden">
              <motion.span 
                className="inline-block bg-gradient-to-r from-dandle-orange via-dandle-orange/90 to-dandle-orange text-off-white px-4 py-2 text-xs font-semibold tracking-wide rounded-sm"
                style={{
                  boxShadow: "0 4px 12px rgba(199, 108, 61, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                animate={{
                  boxShadow: isHovered 
                    ? "0 8px 24px rgba(199, 108, 61, 0.4), inset 0 1px 0 rgba(255,255,255,0.3)"
                    : "0 4px 12px rgba(199, 108, 61, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              >
                {isArabic ? "كن أول من يعرف" : "Be First to Know"}
              </motion.span>
              {/* Shimmer pass effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                }}
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        )}
        
        {/* Hover Content - Text with individual shadows */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-end p-5 z-10"
          dir={isArabic ? 'rtl' : 'ltr'}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Tagline - letter-spacing expansion */}
          <motion.p 
            className={cn(
              "text-champagne text-[11px] mb-1 tracking-wide",
              isArabic ? "font-body-ar" : "font-body"
            )}
            style={{ 
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
              transformStyle: "preserve-3d",
              transform: "translateZ(20px)",
            }}
            initial={{ opacity: 0, y: 20, letterSpacing: "0.1em" }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20,
              letterSpacing: isHovered ? "0.2em" : "0.1em",
            }}
            transition={{ 
              duration: 0.4, 
              delay: isHovered ? choreographyDelays.tagline : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {displayTagline}
          </motion.p>
          
          {/* Product Name - with champagne shimmer pass */}
          <motion.div className="relative overflow-hidden mb-2">
            <motion.h3 
              className={cn(
                "text-2xl text-warm-white font-bold",
                isArabic ? "font-body-ar" : "font-headline"
              )}
              style={{ 
                textShadow: "0 4px 16px rgba(0,0,0,0.6)",
                transformStyle: "preserve-3d",
                transform: "translateZ(30px)",
              }}
              initial={{ opacity: 0, y: 25 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 25,
              }}
              transition={{ 
                duration: 0.5, 
                delay: isHovered ? choreographyDelays.productName : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {displayName}
            </motion.h3>
          </motion.div>

          {/* 3-Word Truth */}
          <motion.p 
            className={cn(
              "text-dandle-orange text-sm font-medium mb-3",
              isArabic ? "font-body-ar" : "font-body"
            )}
            style={{ 
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
              transformStyle: "preserve-3d",
              transform: "translateZ(25px)",
            }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 15,
            }}
            transition={{ 
              duration: 0.4, 
              delay: isHovered ? choreographyDelays.truth : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {displayTruth}
          </motion.p>
          
          {/* Price with scale bounce or WhatsApp CTA */}
          <motion.div
            style={{ 
              transformStyle: "preserve-3d",
              transform: "translateZ(40px)",
            }}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.9,
              y: isHovered ? 0 : 15,
            }}
            transition={{ 
              duration: 0.5, 
              delay: isHovered ? choreographyDelays.price : 0,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {(product.comingSoon || product.beFirstToKnow) ? (
              <p className={cn(
                "text-champagne/90 text-sm",
                isArabic ? "font-body-ar" : "font-body"
              )}>
                {isArabic ? "إشعار على واتساب" : "Get notified on WhatsApp"}
              </p>
            ) : (
              <p className="font-body text-lg text-warm-white font-medium">
                {getPriceDisplay()}
              </p>
           )}
           {/* ValU Installment Display */}
           {product.price && !product.comingSoon && !product.beFirstToKnow && (
             <p className="text-sm text-dandle-orange font-medium mt-1">
               {isArabic 
                 ? `يبدأ من ${formatMonthlyInstallment(product.price)} ج.م/شهرياً`
                 : `From ${formatMonthlyInstallment(product.price)} EGP/mo`
               }
             </p>
            )}
          </motion.div>

          {/* Color Swatches on hover - staggered pop-in */}
          {swatchKeys.length > 0 && !product.comingSoon && !product.beFirstToKnow && (
            <motion.div 
              className="flex gap-2 mt-3 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 10,
              }}
              transition={{ 
                duration: 0.4, 
                delay: isHovered ? choreographyDelays.swatches : 0,
              }}
            >
              {swatchKeys.slice(0, 6).map((swatchKey, index) => (
                <motion.button
                  key={swatchKey}
                  onClick={(e) => handleSwatchClick(e, index)}
                  onMouseEnter={() => setHoveredSwatchIndex(index)}
                  onMouseLeave={() => setHoveredSwatchIndex(null)}
                  className={cn(
                    "relative w-6 h-6 rounded-full border-2 transition-all duration-200",
                    currentSwatchIndex === index 
                      ? "border-champagne scale-110" 
                      : "border-white/40 hover:border-champagne/60"
                  )}
                  style={{ 
                    backgroundColor: getSwatchHex(swatchKey),
                    boxShadow: currentSwatchIndex === index 
                      ? "0 0 12px rgba(212, 175, 55, 0.4)" 
                      : "0 2px 8px rgba(0,0,0,0.2)",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: isHovered ? 1 : 0, 
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ 
                    duration: 0.3,
                    delay: isHovered ? choreographyDelays.swatches + (index * 0.05) : 0,
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  title={getSwatchName(swatchKey)}
                >
                  {/* Tooltip */}
                  {hoveredSwatchIndex === index && (
                    <motion.span
                      className="absolute -top-8 left-1/2 -translate-x-1/2 bg-obsidian/90 text-warm-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {getSwatchName(swatchKey)}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Bottom Info - Clean card footer */}
      <div className={cn("p-6 bg-off-white border-t border-champagne/10", isArabic ? "text-right" : "text-left")} dir={isArabic ? 'rtl' : 'ltr'}>
        {/* Product Name - Primary focus */}
        <h4 className={cn(
          "text-xl text-charcoal font-semibold tracking-tight",
          isArabic ? "font-body-ar" : "font-headline"
        )}>
          {displayName}
        </h4>
        
        {/* Tagline */}
        <p className={cn(
          "text-sm text-charcoal/60 mt-1",
          isArabic ? "font-body-ar" : "font-body"
        )}>
          {displayTagline}
        </p>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent my-4" />
        
        {/* Color Swatches & Price Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Color Swatches */}
          {swatchKeys.length > 0 && !product.comingSoon && !product.beFirstToKnow ? (
            <div className="flex gap-2 flex-wrap">
              {swatchKeys.slice(0, 5).map((swatchKey, index) => (
                <button
                  key={swatchKey}
                  onClick={(e) => handleSwatchClick(e, index)}
                  className={cn(
                    "relative w-7 h-7 rounded-full transition-all duration-200",
                    currentSwatchIndex === index 
                      ? "ring-2 ring-dandle-orange ring-offset-2 ring-offset-off-white scale-110" 
                      : "ring-1 ring-charcoal/15 hover:ring-dandle-orange/50"
                  )}
                  style={{ 
                    backgroundColor: getSwatchHex(swatchKey),
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                  title={getSwatchName(swatchKey)}
                  aria-label={`Select ${getSwatchName(swatchKey)}`}
                />
              ))}
              {swatchKeys.length > 5 && (
                <span className="w-7 h-7 rounded-full bg-charcoal/5 flex items-center justify-center text-xs text-charcoal/50 font-medium">
                  +{swatchKeys.length - 5}
                </span>
              )}
            </div>
          ) : (
            <div />
          )}
          
          {/* Price or Status */}
          {(product.comingSoon || product.beFirstToKnow) ? (
            <span className={cn(
              "text-sm font-medium text-dandle-orange",
              isArabic ? "font-body-ar" : "font-body"
            )}>
              {showBeFirstBadge 
                ? (isArabic ? "كن أول من يعرف" : "Be First to Know")
                : (isArabic ? "قريباً" : "Coming Soon")}
            </span>
          ) : (
            <span className="font-headline text-lg text-charcoal font-semibold whitespace-nowrap">
              {getPriceDisplay()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
