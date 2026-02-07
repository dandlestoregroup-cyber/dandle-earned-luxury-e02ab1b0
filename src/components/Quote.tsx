import { motion } from "framer-motion";
import { useLang } from "@/hooks/useBilingualText";

const linesEn = [
  "We don't sell; it's for people who don't need convincing —",
  "people who know what they deserve and choose accordingly.",
  "They don't compare.",
  "They recognize.",
  "It attracts. No explanation.",
];

const linesAr = [
  "نحن لا نبيع؛ هذا لأشخاص لا يحتاجون إقناع —",
  "أشخاص يعرفون ما يستحقون ويختارون وفقاً لذلك.",
  "لا يقارنون.",
  "يتعرّفون.",
  "يجذب. بلا تفسير.",
];

const Quote = () => {
  const { isArabic } = useLang();
  const lines = isArabic ? linesAr : linesEn;
  const fontClass = isArabic ? 'font-body-ar' : 'font-headline';

  return (
    <section 
      className="relative min-h-[50vh] flex items-center justify-center bg-foreground py-20 md:py-28 px-6 overflow-hidden"
      dir={isArabic ? 'rtl' : 'ltr'}
    >
      <blockquote className="relative text-center max-w-2xl space-y-3">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            className={`text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed ${i === lines.length - 1 ? 'font-bold text-white mt-6' : 'font-light'} ${fontClass}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.p>
        ))}

        <motion.footer
          className="mt-10 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <span className="w-16 h-px bg-primary/30" />
          <span className={`text-primary/60 text-xs tracking-[0.2em] ${isArabic ? 'font-body-ar' : 'font-body'}`}>
            {isArabic ? "منذ ٢٠٢٢" : "Since 2022"}
          </span>
          <span className="w-16 h-px bg-primary/30" />
        </motion.footer>
      </blockquote>
    </section>
  );
};

export default Quote;
