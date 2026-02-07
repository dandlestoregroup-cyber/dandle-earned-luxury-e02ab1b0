import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { useLang } from "@/hooks/useBilingualText";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useLocation } from "react-router-dom";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ThunderDock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [nearProducts, setNearProducts] = useState(false);
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';
  const location = useLocation();

  const isProductPage = location.pathname.startsWith('/product');

  // Detect if user scrolled near product gallery
  useEffect(() => {
    const handleScroll = () => {
      const gallery = document.getElementById('products');
      if (gallery) {
        const rect = gallery.getBoundingClientRect();
        setNearProducts(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const now = new Date();
  const isStoreOpen = now.getHours() >= 10 && now.getHours() < 22;

  const showProductContext = nearProducts || isProductPage;

  const dockLabel = showProductContext
    ? (isArabic ? "اطلب عبر واتساب" : "Order on WhatsApp")
    : (isArabic ? "كيف نساعدك؟" : "How can we help?");

  const getWhatsAppMessage = () => {
    if (isArabic) return "مرحباً Dandle! أنا مهتم بكراسي الاسترخاء. ممكن تساعدوني؟";
    return "Hi Dandle, I'm interested in your recliners. Can you help?";
  };

  const getVisitMessage = () => {
    if (isArabic) return "أريد زيارة غرفة التجربة في تيفولي بلازا لتجربة الكراسي.";
    return "I'd like to visit the Experience Room at Tivoli Plaza to try recliners.";
  };

  return (
    <>
      {/* Dock Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-foreground text-background shadow-elegant hover:shadow-refined transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.4 }}
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className={`text-sm font-medium ${fontClass}`}>{dockLabel}</span>
      </motion.button>

      {/* Thunder Sheet */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-elegant max-w-lg mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-border" />
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className={`absolute top-4 p-2 text-muted-foreground hover:text-foreground ${isArabic ? 'left-4' : 'right-4'}`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="px-6 pb-8 pt-2 space-y-4">
                <h3 className={`text-xl font-bold text-foreground ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
                  {isArabic ? "تواصل مع Dandle" : "Connect with Dandle"}
                </h3>

                {/* Lane 1: WhatsApp */}
                <button
                  onClick={() => {
                    window.open(buildWhatsAppUrl(getWhatsAppMessage()), "_blank");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className={isArabic ? 'text-right' : 'text-left'}>
                    <p className={`font-bold text-foreground ${fontClass}`}>
                      {isArabic ? "تحدث عبر واتساب" : "Chat on WhatsApp"}
                    </p>
                    <p className={`text-xs text-muted-foreground ${fontClass}`}>
                      {isArabic ? "رد فوري" : "Instant response"}
                    </p>
                  </div>
                </button>

                {/* Lane 2: Visit */}
                <button
                  onClick={() => {
                    window.open(buildWhatsAppUrl(getVisitMessage()), "_blank");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-border hover:bg-secondary transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-foreground" />
                  </div>
                  <div className={`${isArabic ? 'text-right' : 'text-left'} flex-1`}>
                    <p className={`font-bold text-foreground ${fontClass}`}>
                      {isArabic ? "جرب بنفسك" : "Try in Person"}
                    </p>
                    <p className={`text-xs text-muted-foreground ${fontClass}`}>
                      Tivoli Plaza, Heliopolis
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className={`text-xs font-medium text-foreground/70 ${fontClass}`}>
                      {isStoreOpen 
                        ? (isArabic ? "مفتوح" : "Open Now")
                        : (isArabic ? "مغلق" : "Closed")
                      }
                    </span>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThunderDock;
