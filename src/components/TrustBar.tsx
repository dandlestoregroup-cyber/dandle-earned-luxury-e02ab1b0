import { Shield, Truck, Factory } from "lucide-react";
import { useLang } from "@/hooks/useBilingualText";

const TrustBar = () => {
  const { isArabic } = useLang();

  const items = [
    { icon: Shield, en: "2-Year Structural Warranty", ar: "ضمان بنيوي سنتين" },
    { icon: Truck, en: "14-Day Delivery", ar: "توصيل ١٤ يوم" },
    { icon: Factory, en: "Made in Obour", ar: "صنع في عبور" },
  ];

  return (
    <div className="bg-secondary border-b border-border px-4 py-3">
      {/* Desktop: 3 columns */}
      <div className="hidden md:flex justify-center items-center gap-12">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <item.icon className="w-4 h-4 text-primary" />
            <span className={`text-xs font-medium text-foreground/70 tracking-wide ${isArabic ? 'font-body-ar' : 'font-body'}`}>
              {isArabic ? item.ar : item.en}
            </span>
          </div>
        ))}
      </div>
      {/* Mobile: horizontal scroll snap */}
      <div className="md:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide" dir={isArabic ? 'rtl' : 'ltr'}>
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 snap-center flex-shrink-0">
            <item.icon className="w-4 h-4 text-primary" />
            <span className={`text-xs font-medium text-foreground/70 tracking-wide whitespace-nowrap ${isArabic ? 'font-body-ar' : 'font-body'}`}>
              {isArabic ? item.ar : item.en}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
