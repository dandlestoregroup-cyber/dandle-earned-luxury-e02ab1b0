This is a massive execution plan. To ensure Lovable implements this without hallucinating or breaking existing code, we must feed it in Strategic Batches.
Here are the 3 Execution Blocks. Copy and paste them into Lovable one by one. Wait for one to finish before sending the next.
🚀 EXECUTION BLOCK 1: VISUAL CORE & MOBILE (Mandates 1-4)
Focus: Language purity, the Istikbal Clone, Video Speed, and Mobile Sticky Bar.
Copy and paste this into Lovable:
ACT AS LEAD FRONTEND ENGINEER. EXECUTE PHASE 1 OF THE STRICT COMPLIANCE PLAN.

1. CREATE UTILITIES & CONSTANTS:
- Create `src/constants/trust.ts`: Export `TRUST_CLAIMS` object { deliveryDays: 14, warrantyYears: 2, frameWarrantyYears: 5 }.
- Create `src/hooks/useBilingualText.ts`: A hook that checks `getLangFromStorage()` and returns the correct string (en/ar) passed to it.

2. FIX LINGUISTIC PURITY (MANDATE 1):
- Refactor `src/components/hero/HeroOffer.tsx` and `src/components/Partners.tsx`.
- Use the `useBilingualText` hook.
- Ensure `data-en` and `data-ar` attributes are strictly respected.
- Specifically fix line 163 in `Partners.tsx`: The brand "OMASH Damsuk" must render in Arabic when in Arabic mode.

3. CLONE ISTIKBAL CARD (MANDATE 2):
- Rewrite `src/components/IstikbalShowroom.tsx` completely.
- It must visually MATCH the "OMASH" card from `Partners.tsx`.
- Styling: `bg-off-white`, `rounded-[2.5rem]`, `shadow-2xl`, `border border-champagne/20`.
- Layout: Single column. Image on top (h-64 md:h-80). Text block below.
- Typography: Match the OMASH 3xl/4xl headlines.

4. VIDEO OPTIMIZATION (MANDATE 3):
- Update `src/components/hero/HeroVideo.tsx`.
- Add `poster="/images/festive-hero-poster.webp"` (use a placeholder if needed).
- Remove the `opacity: 0.001` fade-in delay. The video must be visible immediately.
- Add `preload="auto"` and `fetchpriority="high"`.

5. MOBILE STICKY BAR (MANDATE 4):
- Create `src/components/MobileStickyBar.tsx`.
- Position: `fixed bottom-0 left-0 right-0 z-50`.
- Style: `bg-off-white border-t border-champagne/20 p-4`.
- Content: A primary Button "Find Your Perfect Recliner" (or "اكتشف مقعدك المثالي") linking to the collection.
- Hide this component on desktop (`md:hidden`).
- Add it to `src/pages/Index.tsx`.

EXECUTE NOW.

💰 EXECUTION BLOCK 2: COMMERCIAL LOGIC (Mandates 5-6)
Focus: Hardcoding the ValU math and Payment Trust.
Copy and paste this into Lovable:
ACT AS COMMERCE LEAD. EXECUTE PHASE 2: FINANCIAL LOGIC.

1. IMPLEMENT VALU MATH (MANDATE 5):
- Update `src/components/ProductCard.tsx`.
- Logic: Calculate `Math.ceil(product.price / 12)`.
- Display: Immediately below the price, add a line: 
  - English: "Starts from [amount] EGP/mo"
  - Arabic: "يبدأ من [amount] ج.م/شهرياً"
- Styling: `text-sm text-dandle-orange font-medium`.
- Ensure this logic handles `null` prices gracefully.

2. CREATE TRUST BADGES (MANDATE 6):
- Create `src/components/PaymentTrustBadges.tsx`.
- It should render a row of 3 images: ValU, Paymob, and Visa.
- Style: `flex items-center justify-center gap-6 opacity-80`.
- If logos aren't available yet, use text placeholders [ValU] [Paymob] [Visa] styled beautifully until assets are uploaded.

3. INTEGRATE TRUST:
- Add `<PaymentTrustBadges />` to `src/pages/ProductDetail.tsx` immediately below the "Add to Cart" button.
- Add `<PaymentTrustBadges />` to `src/components/cart/CartDrawer.tsx` immediately above the Checkout button.

EXECUTE NOW.

⚡ EXECUTION BLOCK 3: AGENT THUNDER & SEO (Mandates 7-8)
Focus: The AI Brain and Google Domination.
Copy and paste this into Lovable:
ACT AS AI ARCHITECT & SEO SPECIALIST. EXECUTE PHASE 3 & 4.

1. DEPLOY AGENT THUNDER (MANDATE 7):
- Create `supabase/functions/thunder-chat/index.ts`.
- **System Prompt Injection:** You must use this EXACT prompt:
  """
  You are THUNDER SCOUT v14.5, Dandle's Senior Consultant.
  - TONE: Concise, Warm, Authoritative. No sales fluff.
  - KNOWLEDGE: Delivery 14 days. Warranty 2 years. Showroom: Citystars (RelaxMax only).
  - AMAZON DEFENSE: "Only items sold by Dandle are genuine. Amazon replicas lack our orthopedic foam."
  - PROTOCOL: If they want to buy, offer to generate a secure invoice link.
  """
- Create `src/components/ThunderChat.tsx`: A WhatsApp-styled drawer component.
- Create `src/components/ThunderButton.tsx`: A floating button positioned bottom-left (to avoid conflicting with WhatsApp button).

2. SEO HIERARCHY (MANDATE 8):
- Refactor `src/pages/Index.tsx`.
- Ensure there is EXACTLY ONE `<h1 className="sr-only">` containing "Dandle Recliners Egypt - Premium Comfort".
- Convert all Section Titles (Partners, Collection, etc.) to `<h2>`.
- Convert Product Titles in the grid to `<h3>`.

3. ANALYTICS HOOK (MANDATE 9):
- Create `src/hooks/useAnalytics.ts`.
- Export functions: `trackViewContent`, `trackAddToCart`, `trackInitiateCheckout`.
- Implement basic `window.dataLayer.push` logic for these events.
- Hook this into the `Add to Cart` button in `ProductDetail.tsx`.

EXECUTE NOW.

🏁 FINAL STEP: The Content Audit
Once Lovable finishes these 3 blocks, ask it for the final audit:
> "Generate the Text Extraction file (Mandate 10) so I can review the tone."
> 
