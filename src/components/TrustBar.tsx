import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DANDLE } from "@/data/constants";
import { useLang } from "@/hooks/useBilingualText";

const TrustBar = () => {
  const { isArabic } = useLang();
  const [index, setIndex] = useState(0);

  const lines = [
    DANDLE.footerEN,
    DANDLE.footerAR,
  ];

  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % lines.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-off-white border-b border-champagne/20 px-6 py-2.5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="text-center text-xs font-medium text-charcoal/70 tracking-wide"
          dir={index === 1 ? "rtl" : "ltr"}
        >
          {lines[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default TrustBar;
