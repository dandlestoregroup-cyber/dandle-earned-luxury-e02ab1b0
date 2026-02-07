

# Hero Fix, Footer Redesign, Product Images, and Gift Section Improvement

## 1. Fix Hero Video -- Eliminate Placeholder Image Flash

**Problem:** The `heroVideoInstantPlay.ts` patch sets `video.style.opacity = '0.001'` (line 41), making the video invisible until `loadeddata` fires. Meanwhile the poster image (`/dandle-og-image.jpg`) shows as a cropped placeholder. The CSS class `is-ready` is added but never triggers an opacity transition back to 1.

**Fix in `src/patches/heroVideoInstantPlay.ts`:**
- Remove the `video.style.opacity = '0.001'` line entirely
- Remove the `is-ready` class logic (it does nothing without CSS)
- Keep poster as fallback but let the video render immediately at full opacity

**Fix in `src/components/hero/HeroVideo.tsx`:**
- Remove the `poster="/dandle-og-image.jpg"` attribute to prevent showing a cropped static image before video plays
- Add a `<link rel="preload" as="video" href="/videos/festive-hero.mp4">` in the head via a useEffect or in `index.html`
- Ensure `autoPlay muted playsInline` are all present (they are) so video starts immediately without user interaction

**Fix in `index.html`:**
- Add `<link rel="preload" as="video" href="/videos/festive-hero.mp4" type="video/mp4">` in the `<head>` for fastest possible fetch

## 2. Upload and Wire New Product Images

Copy the 4 uploaded images to `public/images/`:
- `user-uploads://1770135452290.jpg` -> `public/images/cozycompanion-hero-new.jpg` (CozyCompanion -- mom and daughter on green loveseat)
- `user-uploads://1770135443558-2.jpg` -> `public/images/easyup-standard-hero-new.jpg` (EasyUp Standard -- pregnant woman with lift chair)
- `user-uploads://1770140396013.jpg` -> `public/images/easyup-compact-hero-new.jpg` (EasyUp Compact -- linen lifted chair)
- `user-uploads://04_RelaxMax_Limited_Edition_mocha_taupe-Photoroom_1.webp` -> `public/images/relaxmax-limited-mocha-taupe.webp` (RelaxMax Limited Edition)

**Update `src/types/product.ts` imageUrl for each:**
- `cozycompanion`: imageUrl -> `/images/cozycompanion-hero-new.jpg`
- `easyup` (standard): imageUrl -> `/images/easyup-standard-hero-new.jpg`
- `easyup-compact`: imageUrl -> `/images/easyup-compact-hero-new.jpg`
- `relaxmax-limited`: imageUrl -> `/images/relaxmax-limited-mocha-taupe.webp`

**Update `src/data/productColorImages.ts`:**
- Add `relaxmax-limited` entry for `mocha-taupe` -> `/images/relaxmax-limited-mocha-taupe.webp`
- Update `productSwatches.ts` to add `mocha-taupe` to `relaxmax-limited`

**Update `src/catalog/lovableCatalog.ts`** (if it has hardcoded hero image paths for these products) to point to the new files.

## 3. Redesign Footer Elegantly

**File:** `src/components/Footer.tsx` (rewrite)

New design:
- 3-column layout on desktop (Brand | Quick Links | Connect), single column on mobile
- Brand column: "Dandle" headline + "Established 2022" + brief brand line
- Quick Links column: 2-column grid of all 8 links (Collection, Our Story, Warranty, Delivery, Contact, Careers, FAQ, Compare)
- Connect column: Phone number, Instagram/Facebook icons, WhatsApp link
- Service line as a centered strip below columns: "Handmade in Egypt. Delivered in 14 days. 2-year warranty."
- Subtle top border with gradient accent line (dandle-orange gradient)
- Bottom bar: copyright + legal links (Privacy, Terms)
- Proper `pb-24` for floating button clearance

## 4. Improve Gift Section with Stunning Effects

**File:** `src/components/GiftOfComfort.tsx` (rewrite)

Use the uploaded lifestyle image (`user-uploads://file_1770489837486.jpg`) as background:
- Copy to `public/images/gift-lifestyle-cairo.jpg`
- Full-bleed background image with parallax-like effect (using CSS `background-attachment: fixed` or framer-motion scroll transform)
- Larger card with split layout: left side shows the lifestyle image glimpse, right side has content
- Animated counter-like element: "X+ Families Seated" with a counting animation
- Floating product thumbnails around the card edges (subtle, decorative)
- Enhanced shimmer on the CTA button itself (not just the border)
- Headline changed to: "The Gift They Remember" / "الهدية التي لا تُنسى"
- Subtext: "Comfort that speaks for itself" / "راحة تتحدث عن نفسها"

## 5. Update Complete Set Image Using AI

**File:** `src/data/productColorImages.ts`
- Update the `complete-set` `family-modern` entry to use the uploaded lifestyle room image: copy `user-uploads://file_1770489837486.jpg` to `public/images/complete-set-lifestyle-cairo.jpg`
- This image shows a full room with multiple Dandle chairs (cognac recliner, cream sofa, green loveseat) and fills a 16:9 landscape container properly

## Technical Summary

### Files Created (5 images)
1. `public/images/cozycompanion-hero-new.jpg`
2. `public/images/easyup-standard-hero-new.jpg`
3. `public/images/easyup-compact-hero-new.jpg`
4. `public/images/relaxmax-limited-mocha-taupe.webp`
5. `public/images/gift-lifestyle-cairo.jpg` (also used for complete-set)

### Files Modified (7)
1. `src/patches/heroVideoInstantPlay.ts` -- remove opacity hack
2. `src/components/hero/HeroVideo.tsx` -- remove poster attribute
3. `index.html` -- add video preload link
4. `src/types/product.ts` -- update 4 product imageUrls
5. `src/data/productColorImages.ts` -- add relaxmax-limited mocha-taupe, update complete-set image
6. `src/data/productSwatches.ts` -- add mocha-taupe to relaxmax-limited
7. `src/components/Footer.tsx` -- elegant 3-column redesign

### Files Rewritten (1)
8. `src/components/GiftOfComfort.tsx` -- stunning gift section with lifestyle background

### Dependencies
- No new packages needed

