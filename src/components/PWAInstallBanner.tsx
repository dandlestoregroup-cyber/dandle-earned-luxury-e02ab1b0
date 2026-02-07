import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallBanner = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if already dismissed
    if (localStorage.getItem("dandle-pwa-dismissed") === "1") return;

    // Track visit count
    const visits = parseInt(localStorage.getItem("dandle-visit-count") || "0", 10) + 1;
    localStorage.setItem("dandle-visit-count", String(visits));

    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e as BeforeInstallPromptEvent;
      // Show banner only after 2nd visit
      if (visits >= 2) setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt.current) return;
    await deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    }
    deferredPrompt.current = null;
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("dandle-pwa-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50 bg-dandle-white border border-champagne/20 rounded-xl shadow-xl p-4"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 p-1 hover:bg-charcoal/5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-charcoal/40" />
          </button>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-dandle-orange/10 flex items-center justify-center flex-shrink-0">
              <Download className="w-5 h-5 text-dandle-orange" />
            </div>
            <div className="space-y-2 flex-1">
              <p className="text-sm font-semibold text-charcoal leading-tight">
                Add Dandle to your home screen
              </p>
              <p className="text-xs text-charcoal/50">
                Quick access, offline browsing
              </p>
              <button
                onClick={handleInstall}
                className="bg-dandle-orange hover:bg-dandle-orange/90 text-dandle-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallBanner;
