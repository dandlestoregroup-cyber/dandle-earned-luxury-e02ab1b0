import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLang } from "@/hooks/useBilingualText";
import ThunderChat from "./ThunderChat";

export const ThunderButton = () => {
  const { isArabic } = useLang();
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom,0px))] md:bottom-6 left-4 md:left-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary via-accent to-primary shadow-elegant flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        aria-label={isArabic ? "تحدث مع ثاندر" : "Chat with Thunder"}
      >
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <Sparkles className="w-6 h-6 text-white relative z-10" />
        
        {/* Tooltip on hover - desktop only */}
        <div className="absolute left-full ml-3 hidden md:group-hover:block">
          <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
            <p className="text-sm font-medium">
              {isArabic ? "اسأل ثاندر" : "Ask Thunder"}
            </p>
            <p className="text-xs text-muted-foreground">
              {isArabic ? "مستشار الراحة" : "Comfort Consultant"}
            </p>
          </div>
        </div>
      </motion.button>

      <ThunderChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ThunderButton;
