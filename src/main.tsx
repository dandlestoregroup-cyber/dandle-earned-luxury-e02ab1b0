import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";
import { registerSW } from "virtual:pwa-register";
import { initDandleUi } from "./dandle-ui";
import { initHeroVideoInstantPlay } from "./patches/heroVideoInstantPlay";

initDandleUi();
initHeroVideoInstantPlay();

registerSW({
  immediate: true,
  onNeedRefresh() {
    // Auto-reload when a new version is available
    if (confirm('A new version of Dandle is available. Reload now?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('[PWA] App ready for offline use');
  },
});

createRoot(document.getElementById("root")!).render(<App />);
