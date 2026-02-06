

# Consolidate: Add PWA + Utility Hooks (Non-Destructive)

## What This Does
Adds PWA installability, offline awareness, WhatsApp helper centralization, and a share hook -- without touching the existing app structure, routing, product data, or components.

## What We Will NOT Do (and Why)
Your spec proposes replacing `App.tsx`, `src/types/product.ts`, creating a new `src/data/products.ts`, and rebuilding the product grid/card/sheet components from scratch. The existing app is a full multi-page e-commerce site with 20+ routes, cart system, bilingual support, navigation, hero video, partners, trust blocks, etc. Replacing `App.tsx` would destroy all of that. The existing product type and data in `src/types/product.ts` is the locked single source of truth (catalog freeze). We will not duplicate or replace it.

## Changes

### 1. Install `vite-plugin-pwa`
Single new dependency. Everything else in your install list is already present.

### 2. Update `vite.config.ts` -- Append PWA Plugin
Keep existing config (react, lovable-tagger, aliases, server). Add VitePWA plugin with:
- Manifest: name "Dandle Recliners Egypt", short_name "Dandle", description "Earned comfort. Quiet luxury. Refined taste.", theme_color `#E67E22`, background_color `#FAF7F2`, display standalone, orientation portrait, lang ar, dir rtl
- Icons: pwa-192x192.png, pwa-512x512.png
- Workbox: cache images (30 days, max 200), Google Fonts (365 days)

### 3. Update `index.html` -- Add PWA Meta Tags
Add to `<head>`:
- `<meta name="theme-color" content="#E67E22">`
- `<link rel="apple-touch-icon" href="/pwa-192x192.png">`
- `<meta name="apple-mobile-web-app-capable" content="yes">`
- `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`

### 4. Delete `public/sw.js`
Currently only caches a non-existent model file. The PWA plugin generates a proper service worker.

### 5. Update `src/main.tsx` -- Register PWA Service Worker
Add `import { registerSW } from 'virtual:pwa-register'` and call `registerSW({ immediate: true })`. Keep all existing imports (i18n, dandle-ui, heroVideoInstantPlay).

### 6. Create `src/hooks/useOnlineStatus.ts`
Returns `boolean` for online/offline state using `navigator.onLine` + event listeners.

### 7. Create `src/components/OfflineNotice.tsx`
Fixed top banner showing Arabic offline message with WifiOff icon. Uses `useOnlineStatus` hook. Only renders when offline.

### 8. Create `src/hooks/useShare.ts`
Uses Web Share API with clipboard fallback. Accepts product name and current URL.

### 9. Create `src/lib/whatsapp.ts`
Centralizes WhatsApp URL building with the existing number (201222804255 from WhatsAppFloat.tsx). Uses `buildWhatsAppUrl(message)` helper.

### 10. Create `src/lib/format.ts`
`formatEGP(price: number)` helper returning formatted string with locale separators.

### 11. Create `src/data/constants.ts`
Locked truth constants: `deliveryDays: 14`, `warrantyYears: 2`, footer text in EN/AR, WhatsApp number.

### 12. Add OfflineNotice to `src/pages/Index.tsx`
Import and render `<OfflineNotice />` at the top of the Index page layout.

### 13. Create PWA Icon Placeholders
Add `public/pwa-192x192.png` and `public/pwa-512x512.png` (orange-branded placeholder icons).

## Files Summary

| Action | File |
|--------|------|
| Install | `vite-plugin-pwa` |
| Edit | `vite.config.ts` (append PWA plugin) |
| Edit | `index.html` (add 4 meta tags) |
| Edit | `src/main.tsx` (add SW registration, keep everything else) |
| Edit | `src/pages/Index.tsx` (add OfflineNotice) |
| Delete | `public/sw.js` |
| Create | `src/hooks/useOnlineStatus.ts` |
| Create | `src/hooks/useShare.ts` |
| Create | `src/components/OfflineNotice.tsx` |
| Create | `src/lib/whatsapp.ts` |
| Create | `src/lib/format.ts` |
| Create | `src/data/constants.ts` |
| Create | `public/pwa-192x192.png` |
| Create | `public/pwa-512x512.png` |

## What Does NOT Change
- `src/App.tsx` -- all routes, providers, cart context untouched
- `src/types/product.ts` -- locked catalog, no schema changes
- `tailwind.config.ts` -- already correct (Montserrat + Cairo, brand colors)
- `src/components/ProductCard.tsx` -- existing card with swatches untouched
- `src/components/WhatsAppFloat.tsx` -- keeps working, can optionally be refactored later to use the new `whatsapp.ts` helper
- `src/components/MobileStickyBar.tsx` -- keeps working as-is

