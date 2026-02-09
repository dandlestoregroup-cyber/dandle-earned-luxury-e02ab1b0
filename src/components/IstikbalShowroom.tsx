import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useBilingualText";

const IstikbalShowroom = () => {
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  const handleDirections = () => {
    window.open("https://maps.google.com/?q=Tivoli+Plaza+Heliopolis+Cairo", "_blank");
  };

  return (
    <section
      className="py-20 md:py-28 bg-secondary"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={`text-xs text-primary tracking-wide ${fontClass}`}>
            {isArabic ? "جرب بنفسك" : "Experience In-Person"}
          </span>
          <h2 className={`text-3xl md:text-4xl text-foreground mt-4 font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
            {isArabic ? "جرب قبل الشراء" : "Try Before You Buy"}
          </h2>
        </div>

        {/* Hero Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-background rounded-2xl overflow-hidden shadow-subtle border border-border">
            {/* Image */}
            <div className="relative h-64 md:h-80 w-full">
              <img
                src="/images/dandle-partnerships-room.png"
                alt={isArabic ? "غرفة التجربة" : "Experience Room"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Coming Soon Badge */}
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                <span className={`text-[11px] font-bold tracking-widest text-primary-foreground ${fontClass}`}>
                  {isArabic ? "قريباً" : "Coming Soon"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className={`p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
              <h3 className={`text-2xl md:text-3xl text-foreground mb-2 font-bold ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? "غرفة التجربة" : "Experience Room"}
              </h3>
              
              <p className={`text-sm text-muted-foreground mb-1 ${fontClass}`}>
                Tivoli Plaza, Heliopolis
              </p>

              <p className={`text-xs text-muted-foreground/70 mb-6 ${fontClass}`}>
                {isArabic ? "سيتم الإعلان عن مواعيد الافتتاح قريباً" : "Opening dates to be announced soon"}
              </p>

              {/* CTA Button */}
              <Button
                onClick={handleDirections}
                variant="outline"
                className={`border-border text-foreground hover:bg-secondary w-full rounded-full ${fontClass}`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                {isArabic ? "شاهد الموقع" : "View Location"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IstikbalShowroom;
