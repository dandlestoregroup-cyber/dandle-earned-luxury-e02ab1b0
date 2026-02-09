import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { getLangFromStorage, type LangKey } from "@/i18n/strings";

const heroPartner = {
  nameEn: "OMASH Damsuk",
  nameAr: "OMASH Damsuk",
  taglineEn: "Material Partner",
  taglineAr: "شريك المواد",
  descEn: "Textured leather and fabric excellence. Micro-detail craftsmanship for durability and refined feel.",
  descAr: "جلد محبب وأقمشة فاخرة من OMASH Damsuk. حرفية في التفاصيل الدقيقة للمتانة والملمس الراقي.",
  image: "/images/dandle-omash-partnership.webp",
  url: "https://www.google.com/maps/place/OMASH+Damsuk",
};

const partners = [
  {
    nameEn: "Istikbal",
    nameAr: "إستيكبال",
    taglineEn: "Experience Network",
    taglineAr: "شبكة التجربة",
    descEn: "4 branches across Cairo & Alexandria. Try Dandle recliners in-store.",
    descAr: "4 فروع في القاهرة والإسكندرية. جرب كراسي Dandle في المعرض.",
    url: "https://www.istikbal.com.eg",
    hasImage: true,
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
          <a
            href={heroPartner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background rounded-2xl overflow-hidden shadow-subtle border border-border group hover:shadow-md transition-shadow"
          >
            <div className="h-64 md:h-80 w-full">
              <img src={heroPartner.image} alt="OMASH Damsuk" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className={`p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs text-primary tracking-wide ${fontClass}`}>
                  {isArabic ? heroPartner.taglineAr : heroPartner.taglineEn}
                </span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className={`text-2xl md:text-3xl text-foreground mt-2 mb-3 font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? heroPartner.nameAr : heroPartner.nameEn}
              </h3>
              <p className={`text-muted-foreground text-sm leading-relaxed ${fontClass}`}>
                {isArabic ? heroPartner.descAr : heroPartner.descEn}
              </p>
            </div>
          </a>
        </div>

        {/* Istikbal Featured Card */}
        <div className="max-w-lg mx-auto mb-10">
          <a
            href="https://www.istikbal.com.eg"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-background rounded-2xl overflow-hidden shadow-subtle border border-border group hover:shadow-md transition-shadow"
          >
            {/* Istikbal Banner */}
            <div className="relative h-48 md:h-56 w-full bg-gradient-to-br from-[hsl(var(--secondary))] to-[hsl(var(--muted))]">
              <img
                src="https://www.istikbal.com.eg/Themes/flavor1/Content/images/istikbal-logo.svg"
                alt="Istikbal Logo"
                className="absolute top-4 left-4 h-8 md:h-10 object-contain"
                loading="lazy"
              />
              <img
                src="https://www.istikbal.com.eg/Themes/flavor1/Content/images/slider/slide1.jpg"
                alt={isArabic ? "معرض إستيكبال" : "Istikbal Showroom"}
                className="w-full h-full object-cover opacity-80"
                loading="lazy"
                onError={(e) => {
                  // Fallback if external image fails
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className={`text-xs text-primary tracking-wide ${fontClass}`}>
                  {isArabic ? "شبكة التجربة" : "Experience Network"}
                </span>
              </div>
            </div>
            <div className={`p-6 md:p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className={`text-2xl text-foreground font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                  {isArabic ? "إستيكبال" : "Istikbal"}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className={`text-muted-foreground text-sm leading-relaxed ${fontClass}`}>
                {isArabic
                  ? "4 فروع في القاهرة والإسكندرية. جرب كراسي Dandle في المعرض."
                  : "4 branches across Cairo & Alexandria. Try Dandle recliners in-store."}
              </p>
            </div>
          </a>
        </div>

        {/* Remaining Partner Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {partners.filter(p => !p.hasImage).map((p) => (
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
