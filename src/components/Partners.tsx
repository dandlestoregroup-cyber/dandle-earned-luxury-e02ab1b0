import { useState, useEffect, useRef } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";
import { Sparkles } from "lucide-react";

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

        {/* OMASH Hero Partner Feature - Stunning Card */}
        <div className="max-w-md mx-auto mb-16">
          <div 
            className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-champagne/20"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Image with Partner Badge */}
            <div className="relative h-64 md:h-80 w-full">
              <img 
                src={heroPartner.image}
                alt="OMASH Damsuk Partnership"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-off-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">
                  {isArabic ? "شريك" : "Partner"}
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className={`p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              {/* Tagline with Sparkle */}
              <div className={`flex items-center gap-2 mb-3 opacity-60 ${isArabic ? 'flex-row-reverse' : ''}`}>
                <Sparkles size={14} className="text-dandle-orange" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/50">
                  {isArabic ? heroPartner.taglineAr : heroPartner.taglineEn}
                </span>
              </div>

              {/* Brand Name - Always prominent */}
              <h3 className={`text-3xl md:text-4xl text-charcoal mb-3 leading-tight ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? heroPartner.nameAr : heroPartner.nameEn}
              </h3>

              {/* Value Statement */}
              <p className={`text-sm font-semibold text-dandle-orange mb-4 uppercase tracking-wide ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? "تراث مصري أصيل" : "Authentic Egyptian Heritage"}
              </p>

              {/* Description */}
              <p className={`text-charcoal/60 text-sm leading-relaxed mb-6 ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? heroPartner.meaningAr : heroPartner.meaningEn}
              </p>

              {/* Product Highlight Badge */}
              <div className="flex items-center gap-3 bg-cream/50 border border-champagne/20 px-4 py-3 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-dandle-orange animate-pulse flex-shrink-0" />
                <span className={`text-xs font-semibold text-charcoal ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                  {isArabic ? heroPartner.highlightAr : heroPartner.highlight}
                </span>
              </div>
            </div>
          </div>
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
