import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import { useLang } from "@/hooks/useBilingualText";
import { useRef, useEffect, useState } from "react";

const COUNTER_TARGET = 2500;

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [inView, target]);
  return count;
}

const GiftOfComfort = () => {
  const navigate = useNavigate();
  const { isArabic } = useLang();
  const fontClass = isArabic ? 'font-body-ar' : 'font-body';
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCounter(COUNTER_TARGET, inView);

  return (
    <section 
      id="gift-of-comfort" 
      className="relative min-h-[500px] md:min-h-[600px] overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
      ref={ref}
    >
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/gift-lifestyle-cairo.jpg"
          alt="Dandle living room"
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ filter: 'brightness(0.35) saturate(0.9)' }}
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-28 flex items-center justify-center">
        <motion.div
          className="max-w-3xl w-full mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Gift Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-primary/20 mb-8"
            animate={{ boxShadow: ['0 0 20px rgba(184,92,56,0.05)', '0 0 40px rgba(184,92,56,0.15)', '0 0 20px rgba(184,92,56,0.05)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Gift className="w-6 h-6 text-primary" />
          </motion.div>

          {/* Counter */}
          <motion.p
            className={`text-primary text-sm tracking-widest mb-4 ${fontClass}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {count.toLocaleString()}+ {isArabic ? "عائلة" : "Families Seated"}
          </motion.p>

          <h2 
            className={`text-white font-bold leading-tight mb-4 ${isArabic ? 'font-body-ar' : 'font-headline'}`}
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)' }}
          >
            {isArabic ? "الهدية التي لا تُنسى" : "The Gift They Remember"}
          </h2>

          <p className={`text-white/50 text-lg mb-10 ${fontClass}`}>
            {isArabic ? "راحة تتحدث عن نفسها" : "Comfort that speaks for itself"}
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => navigate('/gift')}
              className={`relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-5 font-medium tracking-wide ${fontClass}`}
            >
              {/* Shimmer effect on button */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative z-10">
                {isArabic ? "أرسل هدية" : "Send Gift"}
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GiftOfComfort;
