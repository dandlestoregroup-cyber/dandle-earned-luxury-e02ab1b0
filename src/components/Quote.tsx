import { motion } from "framer-motion";

const Quote = () => {
  return (
    <section className="relative min-h-[40vh] flex items-center justify-center bg-foreground py-20 md:py-28 px-6 overflow-hidden">
      <motion.blockquote
        className="relative text-center max-w-2xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.p 
          className="font-headline text-2xl md:text-3xl lg:text-4xl text-white font-bold leading-tight"
          data-en="It attracts. No explanation."
          data-ar="يجذب. بلا تفسير."
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          It attracts. No explanation.
        </motion.p>
        
        <motion.footer 
          className="mt-10 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="w-16 h-px bg-primary/30" />
          <span 
            className="text-primary/60 text-xs tracking-[0.2em] font-body"
            data-en="Since 2022"
            data-ar="منذ ٢٠٢٢"
          >
            Since 2022
          </span>
          <span className="w-16 h-px bg-primary/30" />
        </motion.footer>
      </motion.blockquote>
    </section>
  );
};

export default Quote;
