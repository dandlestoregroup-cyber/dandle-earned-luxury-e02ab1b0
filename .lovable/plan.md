

# Dandle Front Page -- Restoration and Fine-Tuning Plan

## Overview
This plan restores key removed features, refines the Quote section's tone, enhances the GiftOfComfort section with visual polish, adds a gradient TopBanner, enriches ThunderDock with product-aware prefilled WhatsApp messages, and applies minute fine-tuning across the homepage for a launch-ready experience.

---

## 1. Restore Gradient TopBanner (Very Top of Page)

**File:** `src/components/TopBanner.tsx` (rewrite)
**File:** `src/pages/Index.tsx` (add TopBanner before ScrollProgress)

- Gradient background: `bg-gradient-to-r from-[#1A1A1A] via-[#2C1810] to-[#1A1A1A]`
- Content emphasizing handmade craftsmanship: "Handmade in Egypt. Fully Customizable. Delivered in 14 Days." / Arabic equivalent
- Bilingual support using `useLang()` hook
- Small text, centered, white on dark gradient
- This justifies the 14-day delivery (handmade = takes time) and positions customizability as a feature

---

## 2. Restore Quote Section (Meaningful, Not Cocky)

**File:** `src/components/Quote.tsx` (rewrite)

Restore the full 5-line locked brand hook with staggered fade-in animation:

1. "We don't sell; it's for people who don't need convincing --"
2. "people who know what they deserve and choose accordingly."
3. "They don't compare."
4. "They recognize."
5. "It attracts. No explanation."

- Each line fades in with a 0.15s stagger delay
- Footer retains "Since 2022" with decorative lines
- Background stays `bg-foreground` (dark), `min-h-[50vh]`
- This gives context to "It attracts. No explanation." so it reads as aspirational rather than arrogant

---

## 3. Restore Footer with Full Links and Service Lines

**File:** `src/components/Footer.tsx` (rewrite)

Restore the comprehensive footer from the locked spec:
- Links: Collection, Our Story, Warranty, Delivery, Contact, Careers, FAQ, Compare
- Service lines from `DANDLE` constants: "Delivery in 14 days nationwide. 2-year warranty."
- Social icons: Instagram, Facebook (existing)
- Phone number displayed
- Proper bottom padding (`pb-24`) to avoid overlap with floating elements
- "Established 2022" line

---

## 4. Enhance ThunderDock with Product-Aware Intelligence

**File:** `src/components/ThunderDock.tsx` (rewrite)

Restore full Thunder intelligence:
- **Context detection**: Detect if user is on a product page via URL or scrolled-to product section
- **Prefilled WhatsApp messages** using `buildWhatsAppUrl`:
  - General: "Hi Dandle, I'm interested in your recliners. Can you help?"
  - Product-specific: "Hi Dandle, I'm interested in [Product Name] - [Price]. Can you help?"
  - Visit: "I'd like to visit the Experience Room at Tivoli Plaza to try [Product/recliners]."
- **Dock button text** changes contextually:
  - Homepage: "How can we help?" / "كيف نساعدك؟"
  - Near products: "Order on WhatsApp" / "اطلب عبر واتساب"
- Use the official WhatsApp SVG icon (already exists in file)
- Keep the 2-lane sheet (Message + Visit) with Open Now badge

---

## 5. GiftOfComfort Section Redesign (Stunning Effects)

**File:** `src/components/GiftOfComfort.tsx` (rewrite)

Redesign as a visually striking card:
- Full-width container with a centered card layout (`max-w-4xl mx-auto`)
- Glassmorphic card effect: `bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl`
- Animated gradient border shimmer effect using framer-motion
- Gift icon (Lucide `Gift`) with a subtle glow animation
- Headline: "For Refined Taste" / "لأصحاب الذوق الرفيع"
- Subtext: "Give the gift of comfort" / "أهدِ راحة"
- CTA button with hover scale effect
- Background remains dark with the product image at low opacity

---

## 6. Complete Set Image -- Proper 16:9 Landscape Fill

**File:** `src/components/ProductCard.tsx` (modify line 214)

Change `object-contain` to `object-cover` ONLY for landscape cards so the Complete Set image fills the 16:9 container without whitespace:
```
className={`w-full h-full ${landscape ? 'object-cover' : 'object-contain'} object-center`}
```

---

## 7. Remove Extra Swatch Images (Only Show Current Display)

The current swatch system already shows only one image at a time -- the `displayImage` is computed from `currentSwatchKey`. The arrows cycle through swatches. No additional images are displayed simultaneously, so this is already correct. No code change needed.

---

## 8. Installment Display Fine-Tuning

**File:** `src/components/ProductCard.tsx` (modify lines 291-301)

- Make the installment line more prominent and barrier-reducing
- Change format to: "Starting from X EGP/month" with slightly larger text
- Add "ValU" label for credibility: "ValU | From X EGP/mo"
- Style: `text-sm text-primary font-semibold` (bump from `font-medium`)
- For dual-price products (manual/power), use the lower price for monthly calculation

---

## 9. Minor Fine-Tuning Across Components

### 9a. ProductCard -- Use Lower Price for Installment
When product has `priceManual` and `pricePower`, calculate installment from `priceManual` (lower price) to minimize the displayed barrier.

### 9b. CozyCompanion Swatch Cleanup
Remove `couple-lifestyle` from `productSwatches.ts` line 9 -- lifestyle images are not color variants and create confusion when clicking swatches.

### 9c. TrustBar -- Add "Handmade" Reference
Update the 3rd trust item from "Made in Obour" to "Handmade in Obour" / "صناعة يدوية في عبور" to reinforce the handmade messaging.

---

## Technical Summary

### Files Modified (8)
1. `src/components/TopBanner.tsx` -- gradient banner with handmade + customizable messaging
2. `src/components/Quote.tsx` -- full 5-line brand hook with stagger animation
3. `src/components/Footer.tsx` -- comprehensive links, service lines, phone
4. `src/components/ThunderDock.tsx` -- product-aware prefilled WhatsApp messages
5. `src/components/GiftOfComfort.tsx` -- glassmorphic card redesign with animations
6. `src/components/ProductCard.tsx` -- landscape object-cover, prominent installment line
7. `src/components/TrustBar.tsx` -- "Handmade in Obour" update
8. `src/pages/Index.tsx` -- add TopBanner import and placement

### Files with Minor Edits (1)
9. `src/data/productSwatches.ts` -- remove `couple-lifestyle` from CozyCompanion

### Dependencies
- No new packages. Uses existing framer-motion, lucide-react, and project utilities.

### Risk Assessment
- All changes are additive or cosmetic refinements
- Zero risk of breaking existing cart, navigation, or product data flows
- WhatsApp prefill messages use the existing `buildWhatsAppUrl` helper
