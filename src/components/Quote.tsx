import { motion } from "framer-motion";

const Quote = () => {
  const lineVariant = (delay: number) => ({
    initial: { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-foreground py-28 md:py-36 px-6 overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
      
      <motion.blockquote
        className="relative text-center max-w-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Opening quotation mark */}
        <motion.span 
          className="block font-serif text-6xl md:text-8xl text-primary/30 leading-none mb-6 select-none"
          {...lineVariant(0)}
        >
          "
        </motion.span>

        <motion.p 
          className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light leading-relaxed italic"
          data-en="We don't sell; it's for people who don't need convincing —"
          data-ar="نحن لا نبيع؛ هذا لمن لا يحتاجون إقناعاً —"
          {...lineVariant(0.1)}
        >
          We don't sell; it's for people who don't need convincing —
        </motion.p>
        
        <motion.p
          className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground/85 font-light leading-relaxed italic mt-3"
          data-en="people who know what they deserve and choose accordingly."
          data-ar="أناس يعرفون ما يستحقون ويختارون وفقاً لذلك."
          {...lineVariant(0.2)}
        >
          people who know what they deserve and choose accordingly.
        </motion.p>
        
        <motion.p
          className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground/70 font-light leading-relaxed italic mt-6"
          data-en="They don't compare."
          data-ar="لا يقارنون."
          {...lineVariant(0.3)}
        >
          They don't compare.
        </motion.p>
        
        <motion.p
          className="font-serif text-xl md:text-2xl lg:text-3xl text-primary-foreground font-normal leading-relaxed italic mt-2"
          data-en="They recognize."
          data-ar="يتعرّفون."
          {...lineVariant(0.38)}
        >
          They recognize.
        </motion.p>
        
        <motion.p
          className="font-serif text-2xl md:text-3xl lg:text-4xl text-primary font-medium leading-tight mt-8"
          data-en="It attracts. No explanation."
          data-ar="يجذب. بلا تفسير."
          {...lineVariant(0.45)}
        >
          It attracts. No explanation.
        </motion.p>
        
        <motion.footer 
          className="mt-12 flex items-center justify-center gap-6"
          {...lineVariant(0.55)}
        >
          <span className="w-20 h-px bg-gradient-to-r from-transparent to-primary/30" />
          <span 
            className="text-primary/60 text-xs tracking-[0.2em] font-body font-light"
            data-en="Since 2022"
            data-ar="منذ ٢٠٢٢"
          >
            Since 2022
          </span>
          <span className="w-20 h-px bg-gradient-to-l from-transparent to-primary/30" />
        </motion.footer>
      </motion.blockquote>
    </section>
  );
};

export default Quote;
