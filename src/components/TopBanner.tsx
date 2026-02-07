import { useLang } from "@/hooks/useBilingualText";

const TopBanner = () => {
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';

  return (
    <div 
      className="bg-gradient-to-r from-[#1A1A1A] via-[#2C1810] to-[#1A1A1A] text-white py-2.5 text-center"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <p className={`text-xs md:text-sm tracking-wide ${fontClass}`}>
        {isArabic 
          ? "صناعة يدوية في مصر • قابل للتخصيص بالكامل • توصيل خلال ١٤ يوم"
          : "Handmade in Egypt · Fully Customizable · Delivered in 14 Days"
        }
      </p>
    </div>
  );
};

export default TopBanner;
