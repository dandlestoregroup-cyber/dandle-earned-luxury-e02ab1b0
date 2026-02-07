import { useState, useEffect } from "react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";

const heroPartner = {
  nameEn: "OMASH Damsuk",
  nameAr: "أوماش دمسوق",
  taglineEn: "Material Partner",
  taglineAr: "شريك المواد",
  descEn: "Textured leather and fabric excellence. Micro-detail craftsmanship for durability and refined feel.",
  descAr: "جلد محبب وأقمشة فاخرة. حرفية في التفاصيل الدقيقة للمتانة والملمس الراقي.",
  image: "/images/dandle-omash-partnership.webp",
};

const partners = [
  {
    nameEn: "Istikbal",
    nameAr: "إستيكبال",
    taglineEn: "Experience Network",
    taglineAr: "شبكة التجربة",
    descEn: "4 branches across Cairo & Alexandria.",
    descAr: "4 فروع في القاهرة والإسكندرية.",
  },
  {
    nameEn: "Vivian",
    nameAr: "فيفيان",
    taglineEn: "Interior Styling",
    taglineAr: "التصميم الداخلي",
    descEn: "Free consultation for Dandle customers.",
    descAr: "استشارة مجانية لعملاء Dandle.",
  },
  {
    nameEn: "Aqua Offers",
    nameAr: "أكوا أوفرز",
    taglineEn: "Community Partner",
    taglineAr: "شريك المجتمع",
    descEn: "Exclusive member benefits and offers.",
    descAr: "مميزات وعروض حصرية للأعضاء.",
  },
];

const Partners = () => {
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

  return (
    <section className="py-20 md:py-28 bg-background" dir={isArabic ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={`text-xs text-primary tracking-wide ${fontClass}`}>
            {isArabic ? "دائرة التميز" : "Circle of Excellence"}
          </span>
          <h2 className={`text-3xl md:text-4xl text-foreground mt-4 font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
            {isArabic ? "الشركاء وراء الجودة" : "The Partners Behind the Finish"}
          </h2>
        </div>

        {/* OMASH Hero */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="bg-background rounded-2xl overflow-hidden shadow-subtle border border-border">
            <div className="h-64 md:h-80 w-full">
              <img src={heroPartner.image} alt="OMASH Damsuk" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className={`p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <span className={`text-xs text-primary tracking-wide ${fontClass}`}>
                {isArabic ? heroPartner.taglineAr : heroPartner.taglineEn}
              </span>
              <h3 className={`text-2xl md:text-3xl text-foreground mt-2 mb-3 font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? heroPartner.nameAr : heroPartner.nameEn}
              </h3>
              <p className={`text-muted-foreground text-sm leading-relaxed ${fontClass}`}>
                {isArabic ? heroPartner.descAr : heroPartner.descEn}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((p) => (
            <div key={p.nameEn} className="bg-background p-6 md:p-8 border border-border rounded-sm">
              <h3 className={`text-xl text-foreground font-bold mb-1 ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? p.nameAr : p.nameEn}
              </h3>
              <p className={`text-xs text-primary tracking-wide mb-4 ${fontClass}`}>
                {isArabic ? p.taglineAr : p.taglineEn}
              </p>
              <p className={`text-muted-foreground text-sm leading-relaxed ${fontClass}`}>
                {isArabic ? p.descAr : p.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
