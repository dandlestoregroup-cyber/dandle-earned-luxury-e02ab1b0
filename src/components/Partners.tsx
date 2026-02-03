import { useState, useEffect, useRef } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";
import LCornerFrame from "@/components/ui/LCornerFrame";

// Hero partner (featured prominently)
const heroPartner = {
  nameEn: "OMASH Damsuk",
  nameAr: "أوماش دمسوق",
  taglineEn: "Premium Materials",
  taglineAr: "خامات فاخرة",
  valueEn: "Textured leather and fabric excellence. Micro-detail craftsmanship for durability and refined feel.",
  valueAr: "جلد محبب وأقمشة فاخرة. حرفية في التفاصيل الدقيقة للمتانة والملمس الراقي.",
  meaningEn: "Formerly known as Raytex — decades of trusted quality.",
  meaningAr: "المعروفة سابقاً باسم ريتكس — عقود من الجودة الموثوقة.",
  highlight: "EasyUp Compact uses OMASH textured leather",
  highlightAr: "إيزي أب كومباكت يستخدم جلد أوماش المحبب",
  image: "/images/dandle-omash-partnership.webp",
};

// Supporting partners
const partners = [
  {
    nameEn: "Istikbal",
    nameAr: "إستيكبال",
    taglineEn: "Showroom Network",
    taglineAr: "شبكة المعارض",
    valueEn: "Try before you decide. See the build quality up close, in person.",
    valueAr: "جرّب قبل ما تقرر. شوف الجودة بنفسك في المعرض.",
    meaningEn: "4 branches across Cairo & Alexandria.",
    meaningAr: "4 فروع في القاهرة والإسكندرية.",
  },
  {
    nameEn: "Vivian",
    nameAr: "فيفيان",
    taglineEn: "Interior Styling",
    taglineAr: "التصميم الداخلي",
    valueEn: "Helps the chair fit the room. Layout guidance so it looks intentional.",
    valueAr: "بتساعد الكرسي يناسب الغرفة. توجيه التصميم عشان يبان متناسق.",
    meaningEn: "Free consultation for Dandle customers.",
    meaningAr: "استشارة مجانية لعملاء Dandle.",
  },
  {
    nameEn: "Aqua Offers",
    nameAr: "أكوا أوفرز",
    taglineEn: "Community Partner",
    taglineAr: "شريك المجتمع",
    valueEn: "Curated collaborations and shared visibility. Local partnerships that matter.",
    valueAr: "تعاونات مختارة ورؤية مشتركة. شراكات محلية مهمة.",
    meaningEn: "Exclusive member benefits and offers.",
    meaningAr: "مميزات وعروض حصرية للأعضاء.",
  },
];

const Partners = () => {
  const [lang, setLang] = useState<LangKey>('ar');
  const [hasRevealed, setHasRevealed] = useState(false);
  const [showRoles, setShowRoles] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const storedLang = getLangFromStorage();
    setLang(storedLang);
    const interval = setInterval(() => {
      const currentLang = getLangFromStorage();
      setLang(prev => prev !== currentLang ? currentLang : prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || hasRevealed) {
      setShowRoles(true);
      setShowBenefits(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRevealed) {
            setHasRevealed(true);
            setShowRoles(true);
            setTimeout(() => {
              setShowBenefits(true);
            }, 140);
          }
        });
      },
      { threshold: 0.4 }
    );

    const section = sectionRef.current;
    if (section) observer.observe(section);
    return () => { if (section) observer.unobserve(section); };
  }, [hasRevealed, prefersReducedMotion]);

  const isArabic = lang === 'ar';

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-cream" 
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span 
            className={`text-xs text-bronze tracking-wide font-light uppercase ${isArabic ? 'font-body-ar' : 'font-body'}`}
          >
            {isArabic ? "دائرة التميز" : "Circle of Excellence"}
          </span>
          <h2 
            className={`text-3xl md:text-4xl text-charcoal mt-4 font-light ${isArabic ? 'font-body-ar' : 'font-headline'}`}
          >
            {isArabic ? "الشركاء وراء الجودة" : "The Partners Behind the Finish"}
          </h2>
          <p className={`text-charcoal/60 mt-3 max-w-xl mx-auto ${isArabic ? 'font-body-ar' : 'font-body'}`}>
            {isArabic 
              ? "كل تفصيلة تحسها مدعومة بخبراء نثق فيهم."
              : "Every detail you feel is backed by specialists we trust."
            }
          </p>
        </div>

        {/* OMASH Hero Partner Feature */}
        <div className="max-w-5xl mx-auto mb-16">
          <LCornerFrame className="overflow-hidden bg-off-white">
            {/* Image - no overlay on mobile */}
            <img
              src={heroPartner.image}
              alt={isArabic ? "شراكة Dandle و OMASH Damsuk" : "Dandle × OMASH Damsuk Partnership"}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            
            {/* Text content below image */}
            <div className={`p-6 md:p-10 ${isArabic ? 'text-right' : 'text-left'}`}>
              <span className={`text-dandle-orange text-xs tracking-wide font-medium ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? heroPartner.taglineAr : heroPartner.taglineEn}
              </span>
              <h3 className={`text-2xl md:text-3xl text-charcoal mt-2 ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? (
                  <>أوماش دمسوق (<span dir="ltr">OMASH Damsuk</span>)</>
                ) : (
                  "OMASH Damsuk"
                )}
              </h3>
              <p className={`text-charcoal/80 mt-3 text-sm md:text-base leading-relaxed ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? heroPartner.valueAr : heroPartner.valueEn}
              </p>
              <p className={`text-charcoal/50 mt-2 text-xs ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? heroPartner.meaningAr : heroPartner.meaningEn}
              </p>
              {/* Product highlight */}
              <div className="mt-4 pt-4 border-t border-champagne/30">
                <p className={`text-dandle-orange text-sm font-medium ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                  ✦ {isArabic ? heroPartner.highlightAr : heroPartner.highlight}
                </p>
              </div>
            </div>
          </LCornerFrame>
        </div>

        {/* Partner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <div 
              key={partner.nameEn} 
              className="group relative bg-off-white p-6 md:p-8 rounded-sm shadow-sm border border-champagne/10 hover:shadow-elegant transition-shadow duration-300"
            >
              {/* L-corner brackets on hover */}
              <div className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="dandle-frame-inner h-full w-full relative">
                  <div className="corner-bl-inner" />
                  <div className="corner-br-inner" />
                </div>
              </div>
              
              {/* Partner Name */}
              <h3 className={`text-xl md:text-2xl text-charcoal font-medium mb-1 ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? partner.nameAr : partner.nameEn}
              </h3>
              
              {/* Partner Role (Tagline) */}
              <p 
                className={`text-xs text-dandle-orange tracking-wide mb-4 font-medium ${isArabic ? 'font-body-ar' : 'font-body'}`}
                style={{ 
                  opacity: showRoles ? 1 : 0,
                  transition: 'opacity 80ms ease-out'
                }}
              >
                {isArabic ? partner.taglineAr : partner.taglineEn}
              </p>
              
              {/* Customer Value */}
              <p 
                className={`text-charcoal/80 text-sm mb-3 leading-relaxed ${isArabic ? 'font-body-ar' : 'font-body'}`}
                style={{ 
                  opacity: showBenefits ? 1 : 0,
                  transition: 'opacity 80ms ease-out'
                }}
              >
                {isArabic ? partner.valueAr : partner.valueEn}
              </p>
              
              {/* Additional meaning */}
              <p 
                className={`text-charcoal/50 text-xs ${isArabic ? 'font-body-ar' : 'font-body'}`}
                style={{ 
                  opacity: showBenefits ? 1 : 0,
                  transition: 'opacity 80ms ease-out'
                }}
              >
                {isArabic ? partner.meaningAr : partner.meaningEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
