
# Dandle v2.1 -- Ship-Ready Elevation Plan

## Overview
Implementing the corrected v2.1 spec across 3 phases: conversion-critical features first, UX polish second, engagement capture third. No typography changes. No unverified claims. All WhatsApp links use the existing `buildWhatsAppUrl` helper.

---

## Phase 1 -- Conversion Lift (Ship This Week)

### 1.1 Always-Visible Price + Installment on ProductCard
**File:** `src/components/ProductCard.tsx`
- Add a permanent installment line below the price in the bottom card footer (lines 732-746)
- Show "From X EGP/mo" using the existing `formatMonthlyInstallment` helper
- Use the lowest price (manual or single) for the monthly estimate
- Only show for purchasable products (not comingSoon/beFirstToKnow)

### 1.2 TrustBar -- Verified Statements Only
**New file:** `src/components/TrustBar.tsx`
- Rotating bar using `AnimatePresence` with 2 locked statements from `DANDLE` constants
- English: "Delivery in 14 days nationwide. 2-year warranty."
- Arabic: matching from constants
- Placed between Navigation and Hero in `Index.tsx`

### 1.3 Reduce 3D Tilt from 8deg to 4deg
**File:** `src/components/ProductCard.tsx` (line 98-99)
- Change `[8, -8]` to `[4, -4]` on both rotateX and rotateY transforms

---

## Phase 2 -- UX Polish (Week 2)

### 2.1 Scroll Progress Bar
**New file:** `src/components/ScrollProgress.tsx`
- Thin 2px primary-colored bar fixed at top of viewport
- Uses `window.scrollY / documentHeight` for width percentage
- Rendered in `Index.tsx` above Navigation

### 2.2 Back-to-Top Button
**New file:** `src/components/BackToTop.tsx`
- Appears after 50% scroll, smooth scroll to top on click
- Positioned above WhatsApp float on mobile, bottom-right on desktop
- Uses `framer-motion` for fade in/out

### 2.3 Skeleton Loading for ProductGallery
**New file:** `src/components/SkeletonProductCard.tsx`
- Matches ProductCard aspect ratio (4/5 image + footer)
- Uses existing `Skeleton` component from `ui/skeleton.tsx`
- ProductGallery shows skeleton grid briefly on mount

---

## Phase 3 -- Engagement Capture (Week 3)

### 3.1 Exit Intent Capture (Desktop Only)
**New file:** `src/components/ExitIntentCapture.tsx`
- Triggers on `mouseleave` when `clientY <= 0`
- Shows once per session (state flag, no localStorage abuse)
- WhatsApp link uses `buildWhatsAppUrl` from `src/lib/whatsapp.ts`
- Arabic-first modal: "Before you leave... Save your favorites"
- Dismiss permanently for session

### 3.2 PWA Install Banner
**New file:** `src/components/PWAInstallBanner.tsx`
- Captures `beforeinstallprompt` event in `useRef` (not state, survives re-renders)
- Shows branded banner after 2nd page visit (tracked via `localStorage` counter)
- Dismissible, stores dismissal in localStorage
- Uses Dandle brand styling, not browser default

### 3.3 Quick WhatsApp from ProductCard (Context Menu)
**File:** `src/components/ProductCard.tsx`
- Add `onContextMenu` handler to the card's `motion.div`
- Opens WhatsApp with pre-filled product inquiry message
- Uses existing WhatsApp number constant `201222804255`

---

## What is NOT included (Deferred)
- Product JSON-LD schema per product (needs real `/products/:id` routes -- routes already exist in App.tsx but render modals)
- Dynamic OG meta per product (needs SSR/prerender for social crawlers)
- Sitemap with product URLs (deferred until prerender decision)
- No unverified social proof numbers ("147 delivered", "4.9 rating")

---

## Technical Details

### Files Created (6)
- `src/components/TrustBar.tsx`
- `src/components/ScrollProgress.tsx`
- `src/components/BackToTop.tsx`
- `src/components/SkeletonProductCard.tsx`
- `src/components/ExitIntentCapture.tsx`
- `src/components/PWAInstallBanner.tsx`

### Files Modified (3)
- `src/components/ProductCard.tsx` -- reduce tilt, add installment line, add context menu WhatsApp
- `src/components/ProductGallery.tsx` -- optional skeleton loading state
- `src/pages/Index.tsx` -- add TrustBar, ScrollProgress, BackToTop, ExitIntentCapture, PWAInstallBanner

### Dependencies
- No new packages. Uses existing framer-motion, lucide-react, and project utilities.

### Risk Assessment
- Phase 1: Zero risk (locked data, existing helpers)
- Phase 2: Zero risk (additive UI components)
- Phase 3: Low risk (non-intrusive, session-scoped)
