import { MapPin, Calendar, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/hooks/useBilingualText";

// All 4 Istikbal showroom locations in Egypt
const branches = [
  {
    nameEn: "Istikbal Dokki",
    nameAr: "إستيكبال الدقي",
    addressEn: "84 Mohy El Din Abou El Ezz St., Dokki, Giza",
    addressAr: "84 محيي الدين أبو العز، الدقي، محافظة الجيزة",
    city: "Giza",
  },
  {
    nameEn: "Istikbal City Stars",
    nameAr: "إستيكبال سيتي ستارز",
    addressEn: "City Stars Mall, Nasr City, Cairo",
    addressAr: "سيتي ستارز مول، مدينة نصر، القاهرة",
    city: "Cairo",
  },
  {
    nameEn: "Istikbal Nasr City",
    nameAr: "إستيكبال مدينة نصر",
    addressEn: "28 Atiya Al Sawalhi St., Zone 8, Nasr City, Cairo",
    addressAr: "28 عطية الصوالحي، المنطقة الثامنة، مدينة نصر، القاهرة",
    city: "Cairo",
  },
  {
    nameEn: "Istikbal Alexandria",
    nameAr: "إستيكبال الإسكندرية",
    addressEn: "24 Fawzi Moaz St., Ezbet Saad, Sidi Gaber, Alexandria",
    addressAr: "24 محمد فوزي معاذ، عزبة سعد، سيدي جابر، الإسكندرية",
    city: "Alexandria",
  },
];

// Istikbal partner data
const istikbalPartner = {
  nameEn: "Istikbal",
  nameAr: "إستيكبال",
  taglineEn: "Showroom Network",
  taglineAr: "شبكة المعارض",
  valueEn: "Try before you decide. See the build quality up close, in person.",
  valueAr: "جرّب قبل ما تقرر. شوف الجودة بنفسك في المعرض.",
  meaningEn: "4 branches across Cairo & Alexandria.",
  meaningAr: "4 فروع في القاهرة والإسكندرية.",
  highlightEn: "Experience RelaxMax in-person at City Stars",
  highlightAr: "جرب ريلاكس ماكس شخصياً في سيتي ستارز",
  image: "/images/dandle-partnerships-room.png",
};

const IstikbalShowroom = () => {
  const { isArabic } = useLang();

  const handleBookAppointment = () => {
    const message = isArabic
      ? "مرحباً Dandle! أريد حجز موعد لزيارة معرض إستيكبال وتجربة الريكلاينرز. من فضلكم أخبروني بالمواعيد المتاحة."
      : "Hello DANDLE! I'd like to book an appointment to visit the Istikbal showroom and experience your recliners. Please let me know available slots.";
    window.open(`https://wa.me/201222804255?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section
      className="py-20 md:py-28 bg-cream"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className={`text-xs text-bronze tracking-wide font-light uppercase ${isArabic ? 'font-body-ar' : 'font-body'}`}>
            {isArabic ? "جرب بنفسك" : "Experience In-Person"}
          </span>
          <h2 className={`text-3xl md:text-4xl text-charcoal mt-4 font-light ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
            {isArabic ? "تعال واشعر بالفرق" : "Come Feel the Difference"}
          </h2>
          <p className={`text-charcoal/60 mt-3 max-w-xl mx-auto ${isArabic ? 'font-body-ar' : 'font-body'}`}>
            {isArabic
              ? "جرب Dandle في صالات عرض إستيكبال. اجلس، استرخِ، واكتشف أي موديل يناديك."
              : "Experience Dandle at Istikbal showrooms. Sit, relax, and discover which model calls to you."
            }
          </p>
        </div>

        {/* Istikbal Hero Card - OMASH Clone */}
        <div className="max-w-md mx-auto mb-12">
          <div
            className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-champagne/20"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Image with Partner Badge */}
            <div className="relative h-64 md:h-80 w-full">
              <img
                src={istikbalPartner.image}
                alt="Istikbal Showroom Partnership"
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
                  {isArabic ? istikbalPartner.taglineAr : istikbalPartner.taglineEn}
                </span>
              </div>

              {/* Brand Name */}
              <h3 className={`text-3xl md:text-4xl text-charcoal mb-3 leading-tight ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                {isArabic ? istikbalPartner.nameAr : istikbalPartner.nameEn}
              </h3>

              {/* Value Statement */}
              <p className={`text-sm font-semibold text-dandle-orange mb-4 uppercase tracking-wide ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? "شريك رسمي" : "Official Partner"}
              </p>

              {/* Description */}
              <p className={`text-charcoal/60 text-sm leading-relaxed mb-6 ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                {isArabic ? istikbalPartner.meaningAr : istikbalPartner.meaningEn}
              </p>

              {/* Product Highlight Badge */}
              <div className="flex items-center gap-3 bg-cream/50 border border-champagne/20 px-4 py-3 rounded-xl mb-6">
                <div className="w-2 h-2 rounded-full bg-dandle-orange animate-pulse flex-shrink-0" />
                <span className={`text-xs font-semibold text-charcoal ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                  {isArabic ? istikbalPartner.highlightAr : istikbalPartner.highlightEn}
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleBookAppointment}
                  size="lg"
                  className="bg-dandle-orange hover:bg-dandle-orange/90 text-white font-medium text-sm px-5 py-4 rounded-full flex-1"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {isArabic ? "احجز موعد" : "Book Appointment"}
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-charcoal/20 text-charcoal hover:bg-charcoal/5 font-medium px-5 py-4 rounded-full flex-1"
                  onClick={() => window.open("tel:+201222804255")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {isArabic ? "اتصل" : "Call"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Branch Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {branches.map((branch) => (
            <div
              key={branch.nameEn}
              className="bg-off-white p-5 rounded-xl border border-champagne/10 hover:shadow-elegant transition-shadow duration-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-dandle-orange/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-dandle-orange" />
                </div>
                <div>
                  <h4 className={`text-sm font-medium text-charcoal mb-1 ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                    {isArabic ? branch.nameAr : branch.nameEn}
                  </h4>
                  <p className={`text-charcoal/60 text-xs leading-relaxed ${isArabic ? 'font-body-ar' : 'font-body'}`}>
                    {isArabic ? branch.addressAr : branch.addressEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IstikbalShowroom;