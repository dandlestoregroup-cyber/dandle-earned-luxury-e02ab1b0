import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const ExitIntentCapture = () => {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0) setShow(true);
    };

    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, [dismissed]);

  const dismiss = () => {
    setShow(false);
    setDismissed(true);
  };

  const handleSave = () => {
    window.open(buildWhatsAppUrl("أهلاً، حابب أحفظ المفضلة عندي وأتابع العروض"), "_blank", "noopener");
    dismiss();
  };

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-obsidian/40 z-50 flex items-center justify-center p-4"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-dandle-white rounded-2xl shadow-xl p-8 max-w-sm w-full space-y-5"
            dir="rtl"
          >
            <button
              onClick={dismiss}
              className="absolute top-4 left-4 p-1.5 hover:bg-charcoal/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-charcoal/50" />
            </button>

            <div className="space-y-2 text-right">
              <h2 className="text-lg font-semibold text-charcoal font-body-ar">
                قبل ما تمشي...
              </h2>
              <p className="text-sm text-charcoal/60 font-body-ar">
                احفظ كراسيك المفضلة واحصل على تحديثات الأسعار
              </p>
            </div>

            <button
              onClick={handleSave}
              className="w-full bg-dandle-orange hover:bg-dandle-orange/90 text-dandle-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4" />
              <span className="font-body-ar">احفظ المفضلة</span>
            </button>

            <button
              onClick={dismiss}
              className="w-full text-charcoal/60 font-medium py-2 hover:bg-charcoal/5 rounded-lg transition-colors text-sm"
            >
              تصفح أكتر
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentCapture;
