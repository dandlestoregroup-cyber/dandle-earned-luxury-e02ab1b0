1. Freeze the catalogue Do not touch product count, names, prices, variants, eligibility, or any catalogue fields. No new business rules. No “smart” pricing. No promos. No shipping logic. No bundles.


2. Upgrade the visual system without touching commerce Do:



Add a real image system: multi-angle + zoom + lazy loading + WebP/AVIF.

Keep it purely assets + UI. No pricing changes. No variants logic beyond what already exists. Implement:

Create /src/components/product/ProductImageGallery.tsx

Add angles: front, side, threeQuarter, back, detail

Add pinch/zoom (mobile) + magnifier (desktop)

Use responsive srcset + blur placeholder + loading=lazy for thumbnails


3. Make the UI feel premium (motion + micro-interactions) Do:



Replace basic hovers with physics-like transitions (subtle).

Use Framer Motion for card hover, press, page transitions.

Add scroll-reveal for sections (IntersectionObserver). Rules:

Respect prefers-reduced-motion.

No confetti. No gimmicks. Implement:

Create /src/components/ui/MotionProvider.tsx

Wrap App with MotionConfig (reduced motion aware)

Add AnimatePresence around routes

Add /src/components/ui/Reveal.tsx for scroll reveal


4. Turn product browsing into “real e-commerce” discovery Do:



Add search + filters + sorting over the same catalogue.

URL-synced state for shareable filtered views. Implement:

Install fuse.js

Create /src/hooks/useProductDiscovery.ts

Create /src/components/catalog/FilterBar.tsx (price range UI, feature toggles, mechanism toggle, color family)

Create /src/pages/Collection.tsx with:

Search input

Sort dropdown

FilterBar

Product grid Rules:


Filters must only read existing data. No computed business rules.


5. Add comparison (decision support) Do:



2–3 product compare page.

Sticky headers, mobile snap scroll. Implement:

Create /src/pages/Compare.tsx

Create /src/components/compare/ComparisonTable.tsx

Add “Compare” toggle on ProductCard that saves selected IDs in localStorage.


6. Make PDP (product detail) convert like e-commerce Do:



Clean, structured PDP layout:

Gallery left

Title + story + feature bullets

Clear mechanism selection (only if it already exists)

Clear CTA

Trust micro-block under CTA (delivery + warranty) Implement:


Refactor /src/pages/ProductDetail.tsx:

Above-the-fold grid layout

Tabs: Details / Specs / Care (content only)

Sticky CTA bar on mobile Rules:


Do not add any new add-ons, installation tiers, shipping, promos.


7. Make cart feel modern (without changing rules) Do:



Slide-in cart drawer

Better line-item UI, quantity stepper, remove, color shown, mechanism shown

Persist + restore Implement:

Create /src/components/cart/CartDrawer.tsx

Add keyboard focus trap + ESC close

Add empty-state UI + “Continue shopping” Rules:

No upsells. No thresholds. No shipping calculations.


8. Performance: get it fast on Egyptian 4G Do:



Route-level code splitting

Image optimization everywhere

Font loading fixed

Lighthouse 90+ Implement:

Add dynamic imports for heavy pages (ProductDetail, Compare, Gift)

Add /src/components/media/OptimizedImage.tsx (lazy + srcset + sizes + blur)

Preload critical fonts, set font-display: swap

Remove unused libraries

Add vite-plugin-pwa only if you will actually configure it (otherwise skip)


9. Accessibility and polish Do:



Keyboard nav works across nav/menu/cart

Visible focus states

Proper aria-labels

Reduced motion support Implement:

Add focus ring utilities in Tailwind

Add Skip-to-content link

Audit buttons/inputs for aria-labels


10. Raise the design ceiling (layout + typography + spacing) Do:



Increase negative space and section rhythm

Tighten type scale: consistent headings and body sizes

Consistent card radii and shadows Implement:

Create /src/styles/tokens.css for only colors/shadows (don’t change locked values)

Create /src/components/ui/Section.tsx for consistent section padding and max width

Replace scattered spacing with Section component across homepage


11. Clean architecture so it scales like a store Do:



Separate “catalog data” from “UI state” cleanly Implement:

/src/catalog/lovableCatalog.ts stays source of truth

/src/types/product.ts defines Product

/src/stores/cartStore.ts for cart state

/src/stores/uiStore.ts for drawers/modals

/src/pages/* only compose components


12. Build checks so quality doesn’t regress Do:



Basic CI checks: typecheck, build, lint

Forbidden terms scan (only if you already use it) Implement:

npm scripts: typecheck, lint, build

Add a simple grep scan script if needed


Order to execute (do in this exact sequence)

1. Performance base (code splitting + OptimizedImage + font loading)


2. Motion system (MotionProvider + route transitions + Reveal)


3. Product gallery upgrade (multi-angle + zoom)


4. PDP rebuild (layout + sticky mobile CTA)


5. Discovery (search + filters + sort + URL sync)


6. Compare page


7. Cart drawer polish


8. Accessibility pass


9. Design unification pass (Section + tokens usage)



Hard rules

Do not touch catalogue data, pricing, or business logic.

Any “e-commerce feel” must come from UI, navigation, discovery, PDP clarity, cart UX, speed, and polish.


If you paste your current file tree (or just App.tsx + routes + ProductDetail.tsx + ProductCard.tsx), I’ll output the exact file-by-file patch list (what to add/replace) in one go.