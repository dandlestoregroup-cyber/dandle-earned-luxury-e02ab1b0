import { useLang } from "@/hooks/useBilingualText";

const SocialProof = () => {
  const { isArabic } = useLang();

  return (
    <section 
      className="bg-warm-white py-24 text-center px-6"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <h2 
        className={`text-2xl md:text-4xl text-charcoal mb-6 max-w-5xl mx-auto ${isArabic ? 'font-body-ar' : 'font-headline'}`}
      >
        {isArabic 
          ? "في جميع أنحاء مصر، المحترفون والعائلات يختارون Dandle كمكافأة هادئة تعكس معاييرهم."
          : "Across Egypt, professionals and families alike choose Dandle as the quiet reward that reflects their standards."
        }
      </h2>
      <p className={`text-bronze text-lg ${isArabic ? 'font-body-ar' : 'font-body'}`}>
        {isArabic 
          ? "صناعة موثوقة · صنع في القاهرة · مصمم لراحة دائمة"
          : "Trusted craftsmanship · Built in Cairo · Designed for lasting comfort"
        }
      </p>
    </section>
  );
};

export default SocialProof;
