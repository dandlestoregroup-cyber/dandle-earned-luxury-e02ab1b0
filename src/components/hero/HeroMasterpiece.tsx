import { getLangFromStorage } from "@/i18n/strings";

const HeroMasterpiece = () => {
  const lang = getLangFromStorage();
  const isArabic = lang === 'ar';

  return (
    <section 
      className="w-full bg-cream py-24 md:py-32 lg:py-40"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 className="font-editorial-headline text-4xl md:text-5xl lg:text-6xl text-charcoal mb-2">
          {isArabic ? (
            <>استكشف مجموعة <span dir="ltr">Dandle</span></>
          ) : (
            'Explore the Dandle Collection'
          )}
        </h1>
        
        {/* Sub-headline */}
        <p className="font-editorial-headline text-2xl md:text-3xl text-charcoal/80 mb-12 md:mb-16">
          {isArabic ? 'ريكلاينرز' : 'Recliners'}
        </p>
        
        {/* Philosophy Block */}
        <div className="font-editorial-body text-lg md:text-xl text-charcoal/70 leading-relaxed space-y-6">
          {isArabic ? (
            <>
              <p>
                نحن لا نبيع.<br />
                نجذب من لا يحتاجون إقناعًا —<br />
                أشخاص يعرفون ما يناسبهم ويختارون وفقًا لذلك.
              </p>
              <p>
                هم لا يقارنون.<br />
                هم يتعرّفون.<br />
                لا حاجة للتفسير.
              </p>
            </>
          ) : (
            <>
              <p>
                We don't sell.<br />
                We attract those who don't need convincing —<br />
                people who know what feels right and choose accordingly.
              </p>
              <p>
                They don't compare.<br />
                They recognize.<br />
                No explanation needed.
              </p>
            </>
          )}
        </div>
        
        {/* Year */}
        <p className="font-editorial-body text-sm text-charcoal/50 mt-12 md:mt-16">
          {isArabic ? 'منذ ٢٠٢٢' : 'Since 2022'}
        </p>
      </div>
    </section>
  );
};

export default HeroMasterpiece;
