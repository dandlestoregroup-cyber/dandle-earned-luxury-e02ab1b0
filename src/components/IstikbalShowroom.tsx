import { MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useBilingualText";

const IstikbalShowroom = () => {
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  const handleDirections = () => {
    window.open("https://maps.google.com/?q=Tivoli+Plaza+Heliopolis+Cairo", "_blank");
  };

  const handleReserve = () => {
    const msg = isArabic
      ? "مرحباً Dandle! أريد حجز موعد لزيارة غرفة التجربة في تيفولي بلازا."
      : "Hello DANDLE! I'd like to reserve priority time at the Experience Room, Tivoli Plaza.";
    window.open(`https://wa.me/201222804255?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Check if currently open (10AM-10PM)
  const now = new Date();
  const hour = now.getHours();
  const isOpen = hour >= 10 && hour < 22;

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
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border border-border shadow-sm">
                <span className={`text-[10px] font-bold tracking-widest text-foreground ${fontClass}`}>
                  {isArabic ? "مضيف التجربة" : "Experience Host"}
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

              <div className="flex items-center gap-2 mb-6">
                <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`text-xs font-medium text-foreground/70 ${fontClass}`}>
                  {isOpen 
                    ? (isArabic ? "مفتوح الآن" : "Open Now")
                    : (isArabic ? "مغلق" : "Closed")
                  }
                  {" · "}
                  {isArabic ? "يومياً ١٠ص-١٠م" : "Open Daily 10AM–10PM"}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleDirections}
                  variant="outline"
                  className={`border-border text-foreground hover:bg-secondary flex-1 rounded-full ${fontClass}`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isArabic ? "الاتجاهات" : "Get Directions"}
                </Button>

                <Button
                  onClick={handleReserve}
                  className={`bg-foreground hover:bg-foreground/90 text-background flex-1 rounded-full ${fontClass}`}
                >
                  {isArabic ? "احجز وقتك" : "Reserve Priority Time"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IstikbalShowroom;
