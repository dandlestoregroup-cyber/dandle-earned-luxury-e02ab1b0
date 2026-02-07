import { useState, useMemo, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/product";
import { getLovableProduct } from "@/catalog/lovableCatalog";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { getProductColorImage } from "@/data/productColorImages";
import { productSwatches } from "@/data/productSwatches";
import { PALETTE_MAP } from "@/data/palette";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";
import WishlistButton from "@/components/WishlistButton";

const productTranslations: Record<string, { name: string; englishName: string; tagline: string; truth: string }> = {
  relaxmax: { name: "ريلاكس ماكس", englishName: "RelaxMax", tagline: "المقعد الافتراضي", truth: "مألوف. سهل. صحيح." },
  "relaxmax-limited": { name: "ريلاكس ماكس ليميتد إيديشن", englishName: "RelaxMax Limited Edition", tagline: "الفخامة تلتقي بالأداء", truth: "دوار. رشفة. استرخاء." },
  comfortplus: { name: "كومفورت بلس", englishName: "ComfortPlus", tagline: "استرخِ عميقاً. فكّر بوضوح.", truth: "تحرّر. تجدد. عودة." },
  diva: { name: "ديفا", englishName: "Diva", tagline: "حيث تلتقي الأناقة بالراحة", truth: "جريء. جميل. لا يُنسى." },
  cozycompanion: { name: "كوزي كومبانيون", englishName: "CozyCompanion", tagline: "راحة لاثنين", truth: "اجتمع. استرخِ. ابقَ." },
  easyup: { name: "إيزي أب", englishName: "EasyUp Lift", tagline: "اجلس براحة، قوم بسهولة", truth: "سهولة. دعم. ثقة." },
  "easyup-compact": { name: "إيزي أب كومباكت", englishName: "EasyUp Compact", tagline: "رفع لطيف، تصميم مدمج", truth: "مدمج. نظيف. قادر." },
  worknest: { name: "وورك نست", englishName: "WorkNest", tagline: "اشعر أفضل. اعمل أفضل.", truth: "راحة. وضوح. إنتاج." },
  spacesaver: { name: "سبيس سيفر", englishName: "SpaceSaver", tagline: "نفس الراحة، مساحة أصغر", truth: "مدمج. مريح. صحيح." },
  "complete-set": { name: "طقم العائلة", englishName: "Complete Set", tagline: "راحة للعائلة بأكملها", truth: "اجتمع. استرخِ. ابقَ." },
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  landscape?: boolean;
}

const ProductCard = ({ product, onClick, landscape = false }: ProductCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const lovableProduct = getLovableProduct(product.id);
  const defaultHeroImage = lovableProduct?.heroImage.src || product.imageUrl;
  const defaultHeroFallback = lovableProduct?.heroImage.fallbackSrc || product.imageUrl;
  
  const [lang, setLang] = useState<LangKey>('en');
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);
  
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
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';
  
  const swatchKeys = productSwatches[product.id] || [];
  const [currentSwatchIndex, setCurrentSwatchIndex] = useState(0);
  const currentSwatchKey = swatchKeys[currentSwatchIndex] || null;
  
  const displayImage = useMemo(() => {
    if (currentSwatchKey) {
      const colorImage = getProductColorImage(product.id, currentSwatchKey);
      if (colorImage) return colorImage;
    }
    return defaultHeroImage;
  }, [currentSwatchIndex, currentSwatchKey, defaultHeroImage, product.id]);

  const getSwatchHex = (swatchKey: string): string => {
    const paletteEntry = PALETTE_MAP.get(swatchKey);
    return paletteEntry?.hex || "#CCC";
  };

  const getSwatchName = (swatchKey: string): string => {
    const paletteEntry = PALETTE_MAP.get(swatchKey);
    if (!paletteEntry) return swatchKey;
    return isArabic ? paletteEntry.nameAr : paletteEntry.nameEn;
  };

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
  };

  const handleCardClick = () => {
    if (product.comingSoon || product.beFirstToKnow) {
      const productName = isArabic && translation ? translation.name : product.name;
      const message = `ممكن تنبهوني أول ما ${productName} يبقى متاح؟`;
      window.open(`https://wa.me/201222804255?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    } else {
      onClick();
    }
  };

  const displayName = isArabic && translation 
    ? <>{translation.name} (<span dir="ltr">{translation.englishName}</span>)</>
    : product.name;
  const displayTagline = isArabic && translation ? translation.tagline : product.tagline;

  const showComingSoonBadge = product.comingSoon;
  const showBeFirstBadge = product.beFirstToKnow && !product.comingSoon;

  return (
    <motion.div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-background shadow-subtle hover:shadow-refined transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
      onContextMenu={(e) => {
        if (product.comingSoon || product.beFirstToKnow) return;
        e.preventDefault();
        const name = isArabic && translation ? translation.name : product.name;
        const msg = `أهلاً، أنا مهتم بـ ${name}${product.price ? ` - ${formatPrice(product.price)}` : ""}`;
        window.open(buildWhatsAppUrl(msg), "_blank", "noopener");
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className={`relative ${landscape ? 'aspect-[16/9]' : 'aspect-[4/5]'} overflow-hidden bg-secondary`}>
        {/* Wishlist */}
        {!product.comingSoon && !product.beFirstToKnow && (
          <div className="absolute top-4 left-4 z-30">
            <WishlistButton product={{ id: product.id, name: product.name, color: currentSwatchKey || undefined }} size="sm" />
          </div>
        )}
        
        {/* Arrows */}
        {swatchKeys.length > 1 && !product.comingSoon && !product.beFirstToKnow && (
          <>
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-background/90 hover:bg-background shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="Previous color">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-background/90 hover:bg-background shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110" aria-label="Next color">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </>
        )}
        
        {/* Product Image */}
        <motion.img
          src={displayImage}
          alt={product.name}
          onError={(e) => {
            const target = e.currentTarget;
            if (target.dataset.fallbackApplied === "1") return;
            target.dataset.fallbackApplied = "1";
            target.src = defaultHeroFallback;
          }}
          className={`w-full h-full ${landscape ? 'object-cover' : 'object-contain'} object-center`}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
        />
        
        {/* Badges */}
        {showComingSoonBadge && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block bg-foreground text-background px-4 py-2 text-xs font-bold tracking-wide rounded-full">
              {isArabic ? "قريباً" : "Coming Soon"}
            </span>
          </div>
        )}
        {showBeFirstBadge && (
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 text-xs font-bold tracking-wide rounded-full">
              {isArabic ? "كن أول من يعرف" : "Be First to Know"}
            </span>
          </div>
        )}
      </div>
      
      {/* Bottom Info */}
      <div className={cn("p-6", isArabic ? "text-right" : "text-left")} dir={isArabic ? 'rtl' : 'ltr'}>
        <h4 className={cn("text-lg text-foreground font-bold tracking-tight", isArabic ? "font-body-ar" : "font-headline")}>
          {displayName}
        </h4>
        
        <p className={cn("text-sm text-muted-foreground mt-1", fontClass)}>
          {displayTagline}
        </p>
        
        <div className="h-px bg-border my-4" />
        
        {/* Swatches & Price */}
        <div className="flex items-center justify-between gap-4">
          {/* Color Swatches - 40px circles */}
          {swatchKeys.length > 0 && !product.comingSoon && !product.beFirstToKnow ? (
            <div className="flex gap-2 flex-wrap">
              {swatchKeys.slice(0, 5).map((swatchKey, index) => (
                <button
                  key={swatchKey}
                  onClick={(e) => handleSwatchClick(e, index)}
                  className={cn(
                    "relative w-10 h-10 rounded-full transition-all duration-200",
                    currentSwatchIndex === index 
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                      : "ring-1 ring-transparent hover:ring-border"
                  )}
                  style={{ 
                    backgroundColor: getSwatchHex(swatchKey),
                    border: `2px solid ${currentSwatchIndex === index ? 'hsl(17, 52%, 47%)' : 'transparent'}`,
                  }}
                  title={getSwatchName(swatchKey)}
                  aria-label={isArabic ? `اختر ${getSwatchName(swatchKey)}` : `Select ${getSwatchName(swatchKey)}`}
                />
              ))}
              {swatchKeys.length > 5 && (
                <span className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs text-muted-foreground font-medium">
                  +{swatchKeys.length - 5}
                </span>
              )}
            </div>
          ) : (
            <div />
          )}
          
          {/* Price */}
          <div className={isArabic ? "text-right" : "text-left"}>
            {(product.comingSoon || product.beFirstToKnow) ? (
              <span className={cn("text-sm font-bold text-primary", fontClass)}>
                {showBeFirstBadge 
                  ? (isArabic ? "كن أول من يعرف" : "Be First to Know")
                  : (isArabic ? "قريباً" : "Coming Soon")}
              </span>
            ) : (
              <>
                <span className="font-headline text-lg text-foreground font-bold whitespace-nowrap block">
                  {getPriceDisplay()}
                </span>
                {(product.price || product.priceManual) && (
                  <span className="text-sm text-primary font-semibold block mt-0.5">
                    {isArabic
                      ? `ValU | من ${formatMonthlyInstallment(product.priceManual || product.price!)} ج.م/شهرياً`
                      : `ValU | From ${formatMonthlyInstallment(product.priceManual || product.price!)} EGP/mo`}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
