
# Strict Compliance Deployment: 11 Mandates Implementation Plan

## Executive Summary
This plan addresses all 11 mandates across 5 phases: Frontend Localization, Commercial Logic, Sales AI Agent, SEO/Analytics, and Content Audit. The execution requires surgical precision across 25+ files.

---

## PHASE 1: FRONTEND & LOCALIZATION

### MANDATE 1: Linguistic Separation

**Current State Analysis:**
- Language system exists at `src/i18n/strings.ts` with `getLangFromStorage()` as the source of truth
- `ProductCard.tsx` correctly uses Arabic format: `Arabic Name (English Name)` with LTR spans
- Some components (e.g., `HeroOffer.tsx`, `Partners.tsx`) use `data-en`/`data-ar` attributes but render English text regardless of language mode
- Mixed scripts detected in `Partners.tsx` line 163: Brand name "OMASH Damsuk" renders in English even in Arabic mode

**Required Changes:**

| File | Change |
|------|--------|
| `src/components/hero/HeroOffer.tsx` | Create `useLang()` hook integration; conditionally render `data-en` or `data-ar` text based on current language |
| `src/components/Partners.tsx` | Fix line 163 to render Arabic brand name when `isArabic=true` |
| `src/components/IstikbalShowroom.tsx` | Already correct - uses language switch properly |
| `src/components/WhatsAppFloat.tsx` | Add bilingual message support based on language |
| `src/components/hero/AnimatedHeadline.tsx` | Already handles bilingual - no changes needed |
| `src/components/ProductCard.tsx` | Already uses correct format - verified compliant |

**New Utility Function:**
```typescript
// src/hooks/useBilingualText.ts
export function useBilingualText(en: string, ar: string): string {
  const lang = getLangFromStorage();
  return lang === 'ar' ? ar : en;
}
```

---

### MANDATE 2: Istikbal Card Clone (OMASH Design)

**Current State Analysis:**
- OMASH hero card (`Partners.tsx` lines 130-185): Uses `rounded-[2.5rem]`, `shadow-2xl`, `border-champagne/20`, image with badge overlay, structured text block below
- Istikbal section (`IstikbalShowroom.tsx`): Completely different design - gradient background, two-column layout, no matching aesthetics

**Required Changes:**

| Component | Current | Target |
|-----------|---------|--------|
| Container | `bg-gradient-to-br from-bronze/90` | `bg-off-white rounded-[2.5rem] shadow-2xl border border-champagne/20` |
| Image | No hero image | Add lifestyle image with partner badge |
| Layout | Two-column grid | Single column with image above text |
| Typography | Mixed sizes | Match OMASH: `text-3xl md:text-4xl` headline |
| Badge | Icon-based features | Floating "Partner" badge with backdrop-blur |

**New Component Structure:**
```tsx
// IstikbalShowroom.tsx - Clone OMASH pattern
<div className="max-w-md mx-auto">
  <div className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-champagne/20">
    {/* Image Container with Badge */}
    <div className="relative h-64 md:h-80 w-full">
      <img src="/images/istikbal-showroom.webp" alt="..." />
      <div className="absolute top-4 right-4 bg-off-white/90 backdrop-blur-md px-3 py-1 rounded-full">
        <span className="text-[10px] font-black uppercase">Partner</span>
      </div>
    </div>
    {/* Text Content - Below Image */}
    <div className="p-8">
      {/* Match OMASH typography */}
    </div>
  </div>
</div>
```

**Redundancy Check:** Istikbal is mentioned in:
- `Partners.tsx` (supporting partner card) - KEEP
- `IstikbalShowroom.tsx` (dedicated section) - REDESIGN
- Footer - CHECK for duplicate mentions

---

### MANDATE 3: Video Performance

**Current State Analysis:**
- Hero video: `HeroGiftingSeason.tsx` → `HeroVideo.tsx`
- Video source: `/videos/festive-hero.mp4` (MP4 format)
- Preload hint exists in `index.html` line 24: `<link rel="preload" href="/videos/festive-hero.mp4" as="video" type="video/mp4">`
- `HeroVideo.tsx` applies GPU acceleration: `will-change: transform`, `translateZ(0)`
- Poster handling exists but starts at `opacity: 0.001`

**Required Changes:**

| Area | Change |
|------|--------|
| `index.html` | Add WebM preload alongside MP4; add `fetchpriority="high"` |
| `HeroVideo.tsx` | Add `poster` attribute explicitly; remove opacity:0.001 delay |
| `public/videos/` | Convert `festive-hero.mp4` to `festive-hero.webm` (requires manual conversion) |
| `HeroGiftingSeason.tsx` | Add network-aware loading with `navigator.connection` |

**Optimized Video Tag:**
```tsx
<video
  poster="/images/festive-hero-poster.webp"
  preload="auto"
  autoPlay
  muted
  playsInline
  className="w-full h-full object-cover"
  style={{ 
    willChange: 'transform',
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden'
  }}
>
  <source src="/videos/festive-hero.webm" type="video/webm" />
  <source src="/videos/festive-hero.mp4" type="video/mp4" />
</video>
```

---

### MANDATE 4: Mobile Optimization

**Current State Analysis:**
- Sticky CTA bar EXISTS in `ProductDetail.tsx` lines 393-426 (mobile only, appears after scrolling 600px)
- WhatsApp float button: Fixed position `bottom-6 right-6` with `z-50`
- No global mobile CTA bar on homepage/collection pages

**Required Changes:**

| Area | Change |
|------|--------|
| `src/components/MobileStickyBar.tsx` | NEW: Global sticky bar for homepage with "Find Your Recliner" CTA |
| `src/pages/Index.tsx` | Import and add MobileStickyBar at bottom |
| `WhatsAppFloat.tsx` | Adjust position to avoid overlap with sticky bar (bottom-20 on mobile) |
| Touch targets | Audit all buttons for 48x48px minimum |

**New Component:**
```tsx
// src/components/MobileStickyBar.tsx
const MobileStickyBar = () => (
  <div className="fixed bottom-0 left-0 right-0 md:hidden bg-off-white border-t border-champagne/20 p-4 z-50 shadow-elegant">
    <Button className="w-full bg-dandle-orange text-white py-4">
      Find Your Perfect Recliner
    </Button>
  </div>
);
```

---

## PHASE 2: COMMERCIAL LOGIC

### MANDATE 5: ValU Installment Calculation

**Current State Analysis:**
- `ValuInstallmentCalculator.tsx` EXISTS but is NOT integrated into product cards/pages
- Component calculates 6-60 month plans with 2% admin fee
- ProductCard shows only total price, no monthly installment
- ProductDetail shows only total price, no monthly installment

**Required Changes:**

| File | Change |
|------|--------|
| `src/components/ProductCard.tsx` | Add installment display below price: `From EGP ${(price/12).toFixed(0)}/mo` |
| `src/pages/ProductDetail.tsx` | Integrate `ValuInstallmentCalculator` in price section |
| `src/lib/installmentUtils.ts` | NEW: Export simple `calculateMonthlyPrice(price)` utility |

**Integration in ProductCard (line ~726):**
```tsx
{/* Price */}
<span className="font-headline text-lg text-charcoal font-semibold">
  {getPriceDisplay()}
</span>
{/* Installment Line - NEW */}
{product.price && !product.comingSoon && (
  <span className="text-sm text-dandle-orange font-medium">
    From {formatPrice(Math.ceil(product.price / 12))}/mo
  </span>
)}
```

---

### MANDATE 6: Payment Trust Badges

**Current State Analysis:**
- Trust badges exist in `ProductDetail.tsx` (Shield, Truck, Wrench icons)
- No payment method logos (ValU, Paymob, Visa) anywhere
- Cart drawer has no payment trust indicators

**Required Changes:**

| File | Change |
|------|--------|
| `public/images/payment/` | NEW: Add `valu-logo.svg`, `paymob-logo.svg`, `visa-logo.svg` |
| `src/components/PaymentTrustBadges.tsx` | NEW: Reusable component with 3 logos |
| `ProductDetail.tsx` | Add PaymentTrustBadges below Add to Cart button |
| `CartDrawer.tsx` | Add PaymentTrustBadges above checkout button |

**New Component:**
```tsx
// src/components/PaymentTrustBadges.tsx
const PaymentTrustBadges = () => (
  <div className="flex items-center justify-center gap-6 py-4 opacity-70">
    <img src="/images/payment/valu-logo.svg" alt="ValU" className="h-6" />
    <img src="/images/payment/paymob-logo.svg" alt="Paymob" className="h-6" />
    <img src="/images/payment/visa-logo.svg" alt="Visa" className="h-5" />
  </div>
);
```

---

## PHASE 3: SALES AI AGENT ("THUNDER")

### MANDATE 7: Deploy Agent Thunder

**Current State Analysis:**
- `nour-chat` edge function EXISTS with Nour persona (comfort stylist)
- System prompt (lines 239-257): Warm Egyptian hospitality, product knowledge, prices
- Requires JWT authentication (`verify_jwt = true`)
- No dedicated chat UI component on homepage

**Required Changes:**

| Area | Change |
|------|--------|
| `supabase/functions/thunder-chat/index.ts` | NEW: Clone nour-chat with THUNDER persona |
| `supabase/config.toml` | Add `[functions.thunder-chat]` with `verify_jwt = false` |
| `src/components/ThunderChat.tsx` | NEW: WhatsApp-style chat drawer |
| `src/components/ThunderButton.tsx` | NEW: Floating button (left side, opposite WhatsApp) |
| `src/pages/Index.tsx` | Add ThunderChat and ThunderButton |

**THUNDER Persona System Prompt:**
```typescript
const THUNDER_SYSTEM_PROMPT = `You are THUNDER SCOUT v14.5, Dandle's Senior Consultant.

PERSONALITY:
- TONE: Concise, Warm, Authoritative. No sales fluff.
- ROLE: You do not "help," you "consult."

KNOWLEDGE BASE:
- Delivery: 14 days nationwide
- Warranty: 2 years motor, 5 years frame
- Showroom: Citystars (RelaxMax model only available for in-person viewing)
- Payment: 40% down, 60% on delivery
- Installment: ValU financing available (610-1080 EGP/month)

AMAZON DEFENSE PROTOCOL:
If customer mentions Amazon: "Only items sold directly by Dandle are genuine. Amazon replicas lack our proprietary orthopedic foam and do not include our warranty."

PURCHASE PROTOCOL:
If customer wants to buy, respond: "I'll prepare a secure invoice for you. Please confirm: [Product], [Color], [City], [Quantity]."

NEVER:
- Promise discounts
- Make medical claims
- Promise faster delivery than 14 days`;
```

**Chat Component Architecture:**
```text
┌─────────────────────────┐
│ ThunderButton (Fixed)   │ ← Left side, z-50
└─────────────────────────┘
           ↓ onClick
┌─────────────────────────┐
│ ThunderChat (Drawer)    │
│ ├── Header: "Thunder"   │
│ ├── Messages (scrollable)│
│ ├── Input + Send        │
│ └── Powered by Lovable  │
└─────────────────────────┘
```

---

## PHASE 4: SEO & ANALYTICS

### MANDATE 8: SEO Structure

**Current State Analysis:**
- Homepage H1: Added in `HeroOffer.tsx` line 97 (sr-only)
- JSON-LD: Organization + LocalBusiness in `Index.tsx`; Product schema in `ProductDetail.tsx`
- Meta titles: Hardcoded, not optimized for search intent

**Required Changes:**

| Area | Change |
|------|--------|
| `src/pages/Index.tsx` | Add H2 for section titles (Collection, Partners, etc.) |
| `src/components/CollectionIntro.tsx` | Ensure H2 tag for section heading |
| `src/components/ProductGallery.tsx` | Add H2 "Our Collection" or similar |
| `index.html` | Optimize meta description for "Recliners in Egypt" keyword |

**Updated Meta Tags:**
```html
<title>Dandle Recliners Egypt - Premium Comfort Chairs | Free Delivery</title>
<meta name="description" content="Shop premium recliners in Egypt. Handcrafted comfort chairs with 2-year warranty, free delivery & installation. Best alternative to Lazy Boy Cairo." />
```

**Heading Hierarchy Audit:**

| Page | Current H1 | Required H2s |
|------|------------|--------------|
| Homepage | ✓ (sr-only) | Collection, Partners, Contact |
| Product Detail | ✓ (product title) | Details, Specs, Care |
| Collection | ✗ | Add "Our Recliner Collection" |

---

### MANDATE 9: Analytics Data Layer

**Current State Analysis:**
- NO analytics implementation detected
- No gtag, dataLayer, or event tracking code
- Hero analytics hook exists (`useHeroAnalytics.ts`) but only tracks video completion internally

**Required Changes:**

| File | Change |
|------|--------|
| `index.html` | Add Google Analytics 4 snippet (needs GA4 ID from client) |
| `src/hooks/useAnalytics.ts` | NEW: Analytics hook for ViewContent, AddToCart, InitiateCheckout |
| `src/pages/ProductDetail.tsx` | Fire ViewContent on page load |
| `src/stores/shopifyCartStore.ts` | Fire AddToCart in `addItem` function |
| `src/components/cart/CartDrawer.tsx` | Fire InitiateCheckout on checkout click |

**Analytics Hook:**
```typescript
// src/hooks/useAnalytics.ts
export const trackEvent = (eventName: string, params: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
  // Also push to dataLayer for GTM
  window.dataLayer?.push({ event: eventName, ...params });
};

export const trackViewContent = (product: { id: string; name: string; price: number }) => {
  trackEvent('view_item', {
    currency: 'EGP',
    value: product.price,
    items: [{ item_id: product.id, item_name: product.name }]
  });
};

export const trackAddToCart = (product: { id: string; name: string; price: number; quantity: number }) => {
  trackEvent('add_to_cart', {
    currency: 'EGP',
    value: product.price * product.quantity,
    items: [{ item_id: product.id, item_name: product.name, quantity: product.quantity }]
  });
};
```

---

## PHASE 5: CONTENT AUDIT & TECHNICAL DEBT

### MANDATE 10: Text Extraction

**Deliverable:** After implementation, generate a structured document containing:

```text
=== HOMEPAGE ===
[H1] Dandle Recliners - Premium Egyptian-Made Comfort Chairs
[Badge] The Art of Rest
[Headline] The Gift of Comfort
[Subtitle] For refined taste
[Body] Crafted in Egypt. Made for Real Homes.
[Proof] 14-Day Delivery • 2-Year Warranty
[CTA-1] Find Your Perfect Recliner
[CTA-2] Explore Collection
...

=== PRODUCT CARDS ===
[RelaxMax] Tagline: المقعد الافتراضي | Truth: مألوف. سهل. صحيح.
[ComfortPlus] Tagline: استرخِ عميقاً. فكّر بوضوح. | Truth: تحرّر. تجدد. عودة.
...

=== TRUST SIGNALS ===
[Badge-1] 2-Year Warranty
[Badge-2] Free Delivery
[Badge-3] Free Installation
...
```

This will be generated programmatically by scanning all components after implementation.

---

### MANDATE 11: Technical Debt Resolution

**Identified ToDos and Incomplete Items:**

| Issue | Location | Resolution |
|-------|----------|------------|
| Dual cart systems | `CartContext.tsx` + `shopifyCartStore.ts` | Deprecate CartContext, standardize on Zustand store |
| Broken srcset | `OptimizedImage.tsx` | Fixed in previous audit (verify) |
| Hardcoded warranty text | Multiple components | Create `src/constants/trust.ts` with centralized values |
| Nour chat requires auth | `supabase/config.toml` | Keep as-is (intentional for logged-in users) |
| Empty lead tables | `email_subscriptions`, `wishlist_leads` | Tables ready, capture logic works |

**Constants File:**
```typescript
// src/constants/trust.ts
export const TRUST_CLAIMS = {
  deliveryDays: 14,
  warrantyYears: 2,
  frameWarrantyYears: 5,
  installationCost: 0, // Free
};

export const getTrustText = (lang: 'en' | 'ar') => ({
  delivery: lang === 'ar' ? `توصيل خلال ${TRUST_CLAIMS.deliveryDays} يوم` : `${TRUST_CLAIMS.deliveryDays}-Day Delivery`,
  warranty: lang === 'ar' ? `ضمان ${TRUST_CLAIMS.warrantyYears} سنتين` : `${TRUST_CLAIMS.warrantyYears}-Year Warranty`,
});
```

---

## Execution Order

```text
1. MANDATE 1 → Linguistic Separation (3 files)
2. MANDATE 3 → Video Performance (2 files + 1 asset)
3. MANDATE 2 → Istikbal Card Clone (1 file)
4. MANDATE 4 → Mobile Sticky Bar (2 new files)
5. MANDATE 5 → ValU Installment Display (2 files)
6. MANDATE 6 → Payment Trust Badges (1 new component)
7. MANDATE 7 → Thunder Agent (2 new files + edge function)
8. MANDATE 8 → SEO Hierarchy (4 files)
9. MANDATE 9 → Analytics Layer (1 new hook + 3 integrations)
10. MANDATE 10 → Text Extraction (scripted output)
11. MANDATE 11 → Technical Debt Cleanup (constants + deprecation)
```

---

## Technical Notes

**New Files to Create:**
- `src/hooks/useBilingualText.ts`
- `src/hooks/useAnalytics.ts`
- `src/components/MobileStickyBar.tsx`
- `src/components/PaymentTrustBadges.tsx`
- `src/components/ThunderChat.tsx`
- `src/components/ThunderButton.tsx`
- `src/constants/trust.ts`
- `supabase/functions/thunder-chat/index.ts`

**Files to Modify:**
- `src/components/hero/HeroOffer.tsx`
- `src/components/hero/HeroVideo.tsx`
- `src/components/Partners.tsx`
- `src/components/IstikbalShowroom.tsx`
- `src/components/WhatsAppFloat.tsx`
- `src/components/ProductCard.tsx`
- `src/pages/ProductDetail.tsx`
- `src/pages/Index.tsx`
- `src/stores/shopifyCartStore.ts`
- `src/components/cart/CartDrawer.tsx`
- `supabase/config.toml`
- `index.html`

**Assets Needed:**
- `/public/videos/festive-hero.webm` (manual conversion)
- `/public/images/festive-hero-poster.webp` (video poster frame)
- `/public/images/payment/valu-logo.svg`
- `/public/images/payment/paymob-logo.svg`
- `/public/images/payment/visa-logo.svg`
- `/public/images/istikbal-showroom.webp` (for redesigned card)

**GA4 Requirement:**
- Client must provide Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX)

