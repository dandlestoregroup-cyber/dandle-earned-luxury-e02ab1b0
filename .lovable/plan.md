
# Blocks 3, 4 & 5: Agent Thunder, SEO & Final Polish

## Overview
This plan covers three execution blocks that complete the Dandle website implementation:
- **Block 3:** Thunder AI Agent deployment with WhatsApp-style UI
- **Block 4:** SEO hierarchy and analytics implementation  
- **Block 5:** Final audit, linguistic purity sweep, and site content dump

---

## Block 3: Agent Thunder UI (Web Chat Interface)

### Current State
- Thunder Scout v14.5 already exists as an edge function (`supabase/functions/whatsapp-webhook/index.ts`)
- The Thunder system prompt and catalog are fully implemented for WhatsApp
- There is no web-based chat UI for Thunder (only WhatsApp float button exists)

### Implementation Tasks

#### 3.1 Create Thunder Edge Function for Web
**File:** `supabase/functions/thunder-chat/index.ts`

A new edge function that:
- Uses the existing Thunder Scout v14.5 system prompt
- Connects to Lovable AI gateway (no OpenAI key required)
- Handles streaming responses for real-time chat experience
- Enforces the Thunder Output Guard (4-line max, 1 question max, banned words filter)
- Does NOT require authentication (public chat)

#### 3.2 Create Thunder Chat Drawer Component
**File:** `src/components/ThunderChat.tsx`

WhatsApp-styled chat drawer featuring:
- Slide-up drawer from bottom-left (Vaul drawer component)
- Thunder branding with Sparkles icon
- Message bubbles styled like WhatsApp (user = right, agent = left)
- Typing indicator during streaming
- Bilingual support (Arabic/English based on detected language)
- Quick action chips: "What models do you have?", "Prices", "Showroom"

#### 3.3 Create Thunder Float Button
**File:** `src/components/ThunderButton.tsx`

Positioned bottom-left to avoid conflict with WhatsApp button:
- `fixed bottom-6 left-6 z-50`
- Gradient background (matches Nour styling)
- Sparkles or Zap icon
- Pulsing animation to draw attention
- Bilingual aria-label

#### 3.4 Integration
**File:** `src/pages/Index.tsx`

Add Thunder button and chat drawer to the homepage alongside existing components.

---

## Block 4: SEO Hierarchy & Analytics

### Current State
- Homepage has an `<h1 className="sr-only">` in HeroOffer.tsx
- Multiple pages have their own H1 tags (good)
- No dedicated analytics hook for e-commerce events
- Section headers use `<h2>` correctly in some places

### Implementation Tasks

#### 4.1 SEO Audit & Fix
Verify and enforce the single-H1 rule across all pages:

| Page | H1 Status | Action |
|------|-----------|--------|
| Index.tsx (Homepage) | sr-only H1 in HeroOffer | Keep as-is |
| ProductDetail.tsx | Product title is H1 | Keep as-is |
| Collection.tsx | Needs verification | Audit |
| OurStory.tsx | Has H1 | Keep as-is |

#### 4.2 Convert Section Titles to H2
Verify these components use `<h2>` for section headings:
- CollectionIntro.tsx - Uses H2
- ProductGallery.tsx - No heading (add H2 if needed)
- Partners.tsx - Uses H2
- IstikbalShowroom.tsx - Uses H2
- SocialProof.tsx - Uses H2
- Contact.tsx - Verify H2 usage

#### 4.3 Product Titles to H3
**File:** `src/components/ProductCard.tsx`

Ensure product names in the gallery grid use `<h3>` instead of `<h4>` or spans for proper SEO hierarchy.

#### 4.4 Create Analytics Hook
**File:** `src/hooks/useAnalytics.ts`

Export e-commerce tracking functions that push to `window.dataLayer`:
- `trackViewContent(productId, productName, price)`
- `trackAddToCart(productId, productName, price, quantity)`
- `trackInitiateCheckout(items, total)`
- `trackPurchase(orderId, items, total)`

#### 4.5 Integrate Analytics
**Files to update:**
- `src/pages/ProductDetail.tsx` - Add `trackViewContent` on mount
- `src/pages/ProductDetail.tsx` - Add `trackAddToCart` on button click
- `src/components/cart/CartDrawer.tsx` - Add `trackInitiateCheckout` on checkout click

---

## Block 5: Final Polish & Content Audit

### 5.1 Linguistic Purity Final Sweep

Full audit of remaining components for any language violations:

| Component | Check |
|-----------|-------|
| Footer.tsx | Ensure all aria-labels bilingual |
| WishlistModal.tsx | Verify button text bilingual |
| CartDrawer.tsx | Verify all strings bilingual |
| MobileStickyBar.tsx | Already bilingual |
| ProductModal.tsx | Verify modal content bilingual |

### 5.2 Remove Duplicate Istikbal Addresses
**Status:** Already addressed in IstikbalShowroom.tsx (centralized)
**Action:** Verify Contact.tsx does not duplicate branch addresses

### 5.3 Update Site Content Dump
**File:** `public/SITE_CONTENT_DUMP.md`

Refresh the content dump with any new text added since last generation, including:
- Thunder chat greeting messages
- Any new bilingual strings
- Updated component text

### 5.4 Hero Video Instant Load Enhancement
**Current:** `src/patches/heroVideoInstantPlay.ts` and `src/components/hero/HeroGiftingSeason.tsx`

Additional optimizations:
- Add inline critical CSS gradient fallback (already added)
- Ensure `fetchpriority="high"` on video element
- Verify poster image loads immediately
- Consider adding a static first-frame image as CSS background

### 5.5 Performance & Discoverability Checklist

| Item | Status | Action |
|------|--------|--------|
| Meta description | Present | Verify bilingual |
| Open Graph tags | Present | Already in index.html |
| JSON-LD Organization | Present | Already in Index.tsx |
| JSON-LD LocalBusiness | Present | Already in Index.tsx |
| JSON-LD Product | Present | In ProductDetail.tsx |
| robots.txt | Exists | Verify sitemap link |
| sitemap.xml | Exists | Verify all routes |
| Canonical URLs | Present | On product pages |
| Alt text on images | Verify | Audit key images |

---

## Technical Architecture

```text
Web Chat Flow:
┌─────────────────┐      ┌───────────────────────┐      ┌─────────────────────┐
│  ThunderButton  │──────│    ThunderChat.tsx    │──────│  thunder-chat/      │
│  (bottom-left)  │      │  (Vaul drawer + SSE)  │      │  index.ts           │
└─────────────────┘      └───────────────────────┘      │  (Edge Function)    │
                                                         │  - Thunder Prompt   │
                                                         │  - Lovable AI       │
                                                         │  - Output Guard     │
                                                         └─────────────────────┘

Analytics Flow:
┌────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│  ProductDetail │──────│  useAnalytics()  │──────│  window.dataLayer│
│  CartDrawer    │      │  - viewContent   │      │  (GTM/GA4/Meta)  │
│  Checkout      │      │  - addToCart     │      └──────────────────┘
└────────────────┘      │  - checkout      │
                        └──────────────────┘
```

---

## Files to Create

1. `supabase/functions/thunder-chat/index.ts` - Thunder web chat edge function
2. `src/components/ThunderChat.tsx` - Chat drawer UI
3. `src/components/ThunderButton.tsx` - Floating trigger button
4. `src/hooks/useAnalytics.ts` - E-commerce analytics hook

## Files to Modify

1. `src/pages/Index.tsx` - Add Thunder components
2. `src/components/ProductCard.tsx` - Change product title to H3
3. `src/pages/ProductDetail.tsx` - Add analytics tracking
4. `src/components/cart/CartDrawer.tsx` - Add checkout tracking
5. `supabase/config.toml` - Add thunder-chat function config
6. `public/SITE_CONTENT_DUMP.md` - Refresh content dump

---

## Success Criteria

1. **Thunder Chat:** Users can click the bottom-left button and chat with Thunder Scout in real-time
2. **SEO:** Each page has exactly one H1, sections use H2, product cards use H3
3. **Analytics:** View content, add to cart, and checkout events fire to dataLayer
4. **Linguistic Purity:** Zero cross-language violations in either mode
5. **Performance:** Hero video starts within 100ms of page load (no black screen)
6. **Content Audit:** SITE_CONTENT_DUMP.md reflects all current site text

---

## Execution Order

1. Create Thunder edge function and update config.toml
2. Create ThunderChat drawer component
3. Create ThunderButton floating component
4. Add Thunder components to Index.tsx
5. Create useAnalytics hook
6. Integrate analytics into ProductDetail and CartDrawer
7. SEO hierarchy fixes (H2/H3 verification)
8. Linguistic purity sweep
9. Refresh SITE_CONTENT_DUMP.md
10. Final testing

