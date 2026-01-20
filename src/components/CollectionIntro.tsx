import { getLangFromStorage } from "@/i18n/strings";

const CollectionIntro = () => {
  const lang = getLangFromStorage();
  const isArabic = lang === 'ar';

  return (
    <section 
      id="collection" 
      className="w-full bg-cream py-16 md:py-24 px-6 text-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p className="font-editorial-eyebrow text-sm md:text-base text-charcoal/60 tracking-wide mb-4">
          {isArabic ? 'المجموعة' : 'The Collection'}
        </p>
        
        {/* Headline */}
        <h2 className="font-editorial-headline text-3xl md:text-4xl lg:text-5xl text-charcoal mb-8 md:mb-12">
          {isArabic ? 'راحة ستحبها كل يوم' : "Comfort You'll Love Every Day"}
        </h2>
        
        {/* Description */}
        <p className="font-editorial-body text-lg md:text-xl text-charcoal/70 leading-relaxed">
          {isArabic ? (
            <>
              من الحلول المدمجة إلى الراحة العائلية،<br />
              كل كرسي Dandle مصمم ليشعرك بالراحة —<br />
              يومًا بعد يوم.
            </>
          ) : (
            <>
              From compact solutions to family-sized comfort,<br />
              every Dandle recliner is built to feel right —<br />
              day after day.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

export default CollectionIntro;
