import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getLangFromStorage } from "@/i18n/strings";

interface AnimatedHeadlineProps {
  textEn: string;
  textAr: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

const AnimatedHeadline = ({ textEn, textAr, className = "", delay = 0.5, style }: AnimatedHeadlineProps) => {
  const [lang, setLang] = useState<'en' | 'ar'>('ar');

  useEffect(() => {
    setLang(getLangFromStorage());
    // Listen for language changes
    const interval = setInterval(() => {
      const currentLang = getLangFromStorage();
      setLang(prev => prev !== currentLang ? currentLang : prev);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const isArabic = lang === 'ar';
  const text = isArabic ? textAr : textEn;

  // For Arabic: animate as whole text (no character split to prevent reversal)
  // For English: character-by-character animation
  if (isArabic) {
    return (
      <motion.h1
        className={className}
        style={{ 
          textShadow: '0 4px 30px rgba(0,0,0,0.9)', 
          direction: 'rtl',
          ...style 
        }}
        dir="rtl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {text}
      </motion.h1>
    );
  }

  // English: character-by-character animation
  const container = {
    hidden: {},
    show: { 
      transition: { 
        staggerChildren: 0.018,
        delayChildren: delay,
      } 
    },
  };

  const char = {
    hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const } 
    },
  };

  return (
    <motion.h1
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
      style={{ textShadow: '0 4px 30px rgba(0,0,0,0.9)', ...style }}
    >
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={char} style={{ display: "inline-block" }}>
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedHeadline;
