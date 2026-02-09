
# Dandle PWA Image Generation Brief

A complete prompt-by-prompt specification for generating all images needed for the Dandle PWA, with exact filenames, dimensions, upload instructions, and where each image appears in the app.

---

## How to Deliver Images

**API Endpoint:**
```
https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images
```

**Upload each image:**
```
POST /functions/v1/manage-images
Content-Type: application/json

{
  "filename": "<exact filename from table below>",
  "base64": "<base64-encoded image data, no data:image prefix>",
  "contentType": "image/webp"
}
```

**Verify uploads:**
```
GET /functions/v1/manage-images
```

Once uploaded, images are immediately live -- the app resolves all `/images/X` paths to `https://rbvbrxjnhmgrtxvwusxr.supabase.co/storage/v1/object/public/product-images/images/X` automatically. No code changes needed.

---

## Brand Rules (Apply to ALL images)

- Chair occupies 55-65% of frame, magnetic center
- 45-degree LEFT camera angle (hides controls on right armrest)
- 40-50% negative space
- ONE prop maximum (coffee cup, book, or reading lamp)
- Warm natural light (golden hour or soft morning)
- Real photography aesthetic -- visible fabric texture, no AI plastic sheen
- Human subjects: Egyptian women age 35-65, flowing uncovered hair, natural skin, never looking at camera
- Color palette: Deep Brown #3E2723, Dandle Orange #E67E22, Off White #FAF7F2, Warm Cream #F5E6D3
- Deliver as .webp, high quality (90+)

---

## CATEGORY 1: Product Hero Cards (1024x1024, 1:1)

These appear on the homepage product grid, collection page cards, and comparison tool. Each product needs one.

| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 1 | `dandle-relaxmax-hero.webp` | RelaxMax | Off-white RelaxMax flagship recliner on pure white background. 45-degree LEFT angle, premium leather texture with visible grain, controls hidden in shadow. Sharp focus on chair, clean product-card crop. |
| 2 | `dandle-relaxmax-limited-hero.webp` | RelaxMax Limited | Camel full-grain leather RelaxMax Limited Edition, 360-degree swivel base visible, dual cup holders. White background, 45-degree LEFT, luxurious premium feel. |
| 3 | `dandle-spacesaver-hero.webp` | SpaceSaver | Alexandria Linen SpaceSaver wall-hugger recliner, compact 75cm width emphasized. White background, 45-degree LEFT, wall-hugging profile visible. |
| 4 | `dandle-diva-hero.webp` | Diva | Desert Sage microsuede Diva recliner, bold personality chair. White background, 45-degree LEFT, rich fabric sheen visible, controls in shadow. |
| 5 | `dandle-comfortplus.jpg` | ComfortPlus | Mocha Taupe chenille ComfortPlus recliner, thick plush cushioning emphasized. White background, 45-degree LEFT, built-in massage impression. |
| 6 | `dandle-cozycompanion-hero.webp` | CozyCompanion | Amber Sand CozyCompanion loveseat recliner, two-seater width emphasized. White background, 45-degree LEFT, dual-seat scale visible. |
| 7 | `dandle-worknest-hero.webp` | WorkNest | Oasis Green WorkNest recliner, laptop tray attached and visible, brushed metal cupholder. White background, 45-degree LEFT, productivity-focused. |
| 8 | `dandle-easyup-standard-hero.jpg` | EasyUp Standard | Mocha Taupe EasyUp Standard lift recliner, lift base mechanism visible. White background, 45-degree LEFT. |
| 9 | `dandle-easyup-compact-hero.webp` | EasyUp Compact | Coastal Fog grey EasyUp Compact, compact footprint emphasized. White background, 45-degree LEFT. |
| 10 | `dandle-complete-set-hero.webp` | Complete Set | 3-piece living room set (two recliners + loveseat) arranged as a cohesive group. Warm cream background, slight overhead angle showing full arrangement. |

**App placement:** `src/data/productImageData.ts` (mainImage field), `src/catalog/lovableCatalog.ts` (heroImage), product cards on homepage grid, `/collection` page.

---

## CATEGORY 2: Color Swatch Variants (1024x1024 or 2:3)

When users click a color swatch on product detail pages, the main image swaps to show that exact chair in that fabric. Each needs a clean studio shot.

| # | Filename | Product | Color | Prompt |
|---|----------|---------|-------|--------|
| 1 | `relaxmax-primary-cognac.webp` | RelaxMax | Cognac Leather | Cognac full-grain leather RelaxMax, rich warm brown leather with visible grain. White bg, 45-degree LEFT. |
| 2 | `relaxmax-alexandria-linen.webp` | RelaxMax | Alexandria Linen | Light natural linen RelaxMax, soft woven texture. White bg, 45-degree LEFT. |
| 3 | `relaxmax-mocha-taupe.webp` | RelaxMax | Mocha Taupe | Warm grey-brown Mocha Taupe RelaxMax. White bg, 45-degree LEFT. |
| 4 | `relaxmax-coastal-fog.webp` | RelaxMax | Coastal Fog | Light grey Coastal Fog RelaxMax. White bg, 45-degree LEFT. |
| 5 | `spacesaver-primary-linen.webp` | SpaceSaver | Alexandria Linen | Linen SpaceSaver, compact profile. White bg, 45-degree LEFT. |
| 6 | `spacesaver-mocha-taupe.webp` | SpaceSaver | Mocha Taupe | Mocha Taupe SpaceSaver. White bg, 45-degree LEFT. |
| 7 | `spacesaver-desert-grey.webp` | SpaceSaver | Desert Grey | Desert Grey SpaceSaver. White bg, 45-degree LEFT. |
| 8 | `spacesaver-terracotta-reclined.webp` | SpaceSaver | Terracotta | Terracotta SpaceSaver in slight recline. White bg, 45-degree LEFT. |
| 9 | `spacesaver-primary.webp` | SpaceSaver | Off-White | Off-white SpaceSaver. White bg, 45-degree LEFT. |
| 10 | `diva-primary-terracotta.webp` | Diva | Terracotta | Rich terracotta Diva. White bg, 45-degree LEFT. |
| 11 | `diva-giza-gold.webp` | Diva | Giza Gold | Shimmering gold woven Diva. White bg, 45-degree LEFT. |
| 12 | `diva-oasis-green-reclined.webp` | Diva | Oasis Green | Oasis Green Diva in slight recline. White bg, 45-degree LEFT. |
| 13 | `diva-desert-sage-green.webp` | Diva | Desert Sage | Sage green microsuede Diva. White bg, 45-degree LEFT. |
| 14 | `worknest-primary-green.webp` | WorkNest | Oasis Green | Green WorkNest with laptop tray. White bg, 45-degree LEFT. |
| 15 | `worknest-blue-nile.webp` | WorkNest | Blue Nile Denim | Deep blue denim WorkNest. White bg, 45-degree LEFT. |
| 16 | `worknest-desert-grey.webp` | WorkNest | Desert Grey | Grey WorkNest. White bg, 45-degree LEFT. |
| 17 | `comfortplus-tan-lifestyle.webp` | ComfortPlus | Tan | Tan ComfortPlus, warm studio light. White bg, 45-degree LEFT. |
| 18 | `comfortplus-coastal-fog-lifestyle.webp` | ComfortPlus | Coastal Fog | Grey ComfortPlus. White bg, 45-degree LEFT. |
| 19 | `easyup-standard-grey-pregnant.webp` | EasyUp Std | Grey | Grey EasyUp Standard, gentle lift position. White bg, 45-degree LEFT. |
| 20 | `easyup-standard-oasis-green.webp` | EasyUp Std | Oasis Green | Green EasyUp Standard. White bg, 45-degree LEFT. |
| 21 | `easyup-standard-mocha-taupe.webp` | EasyUp Std | Mocha Taupe | Mocha Taupe EasyUp Standard. White bg, 45-degree LEFT. |
| 22 | `easyup-standard-coastal-fog.webp` | EasyUp Std | Coastal Fog | Coastal Fog EasyUp Standard. White bg, 45-degree LEFT. |
| 23 | `easyup-compact-charcoal-front.jpg` | EasyUp Compact | Charcoal | Dark charcoal EasyUp Compact. White bg, 45-degree LEFT. |
| 24 | `easyup-compact-grey-front.webp` | EasyUp Compact | Grey | Grey EasyUp Compact. White bg, 45-degree LEFT. |
| 25 | `easyup-compact-oasis-green.webp` | EasyUp Compact | Oasis Green | Green EasyUp Compact. White bg, 45-degree LEFT. |
| 26 | `cozycompanion-mocha-taupe-front.webp` | CozyCompanion | Mocha Taupe | Mocha Taupe loveseat. White bg, 45-degree LEFT. |
| 27 | `cozycompanion-lifestyle-elder.webp` | CozyCompanion | Alexandria Linen | Linen loveseat. White bg, 45-degree LEFT. |
| 28 | `cozycompanion-coastal-fog.webp` | CozyCompanion | Coastal Fog | Grey loveseat. White bg, 45-degree LEFT. |
| 29 | `complete-set-final.webp` | Complete Set | Family Modern | 3-piece set in coordinated neutral. Warm studio. |

**App placement:** `src/data/productColorImages.ts` -- each entry maps a swatch key to an image. Displayed on product detail page when a color swatch dot is clicked.

---

## CATEGORY 3: Product Gallery (2752x1536, 16:9)

These appear in the product detail page carousel -- swipeable gallery showing different angles, recline positions, and lifestyle contexts.

| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 1 | `relaxmax-lifestyle-day.png` | RelaxMax | Off-white RelaxMax in bright modern Cairo living room, natural daylight from floor-to-ceiling windows, Nile view, minimal decor, marble floors. Empty chair. |
| 2 | `relaxmax-lifestyle-night.png` | RelaxMax | Same RelaxMax, same room, evening ambiance -- warm lamp light, city lights through windows, cozy atmosphere. Empty chair. |
| 3 | `relaxmax-brown-lifestyle.jpg` | RelaxMax | Cognac leather RelaxMax in traditional Zamalek apartment, herringbone parquet, brass accents, warm tones. Empty chair. |
| 4 | `spacesaver-offwhite-reclined.jpg` | SpaceSaver | Off-white SpaceSaver fully reclined, footrest extended, side angle showing wall-hugging clearance. White background. |
| 5 | `spacesaver-offwhite-side.jpg` | SpaceSaver | Off-white SpaceSaver side profile, upright position, compact dimensions emphasized. White background. |
| 6 | `diva-terracotta-reclined.webp` | Diva | Terracotta Diva fully reclined, luxurious pose, fabric sheen visible. White background. |
| 7 | `worknest-oasis-green-lifestyle.webp` | WorkNest | Green WorkNest in modern home office, MacBook on tray, bookshelf background, warm afternoon light. |
| 8 | `easyup-beige-lifted.jpg` | EasyUp Std | Beige EasyUp in full lift position (45-degree tilt forward), mechanism visible. White background. |
| 9 | `easyup-lift-assist-lifestyle.webp` | EasyUp Std | Elderly Egyptian woman (65+, grey hair, no veil) using EasyUp lift to stand, warm home setting, independence moment. |
| 10 | `cozycompanion-couple-lifestyle.webp` | CozyCompanion | Egyptian couple (50s) sharing CozyCompanion loveseat, reading together, warm Zamalek living room, evening light. |
| 11 | `complete-set-coastal-modern.jpg` | Complete Set | Full 3-piece set in modern coastal villa, sea light, white walls, natural textures. |
| 12 | `complete-set-family-modern.jpg` | Complete Set | Full set in family living room, warm tones, lived-in feel, family photos on wall. |

**App placement:** `src/data/productImageData.ts` (galleryImages array), `src/catalog/lovableCatalog.ts` (gallery array). Shown in product detail page image carousel.

---

## CATEGORY 4: Lifestyle Scenes (2752x1536, 16:9)

These appear in the homepage lifestyle carousel and the "Lifestyle Gallery" section. They sell the dream -- the chair in aspirational Egyptian settings.

### Home Settings
| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 1 | `relaxmax_lifestyle_zamalek-living.webp` | RelaxMax | Off-white RelaxMax in Zamalek apartment. Egyptian woman (46, bob cut, flowing dark hair, beige cashmere, thin gold bracelet) curled reading. Herringbone parquet, French windows, Nile trees, brass lamp, single coffee cup. Golden hour. |
| 2 | `comfortplus_lifestyle_newgiza-villa.webp` | ComfortPlus | Mocha Taupe ComfortPlus in New Giza villa. Woman (52, salon waves, camel loungewear, gold necklace) fully reclined, eyes closed, ceramic mug. Travertine floors, glass doors, palm garden, abstract gold art. Golden hour. |
| 3 | `diva_lifestyle_reading-nook.webp` | Diva | Desert Sage Diva in reading nook. Woman (42, cream linen blouse, reading glasses) absorbed in leather-bound book. Floor-to-ceiling bookshelf, parquet, brass lamp, tea on side table. Warm afternoon light through sheer curtains. |
| 4 | `cozycompanion_lifestyle_family-moment.webp` | CozyCompanion | Mocha Taupe CozyCompanion. Mother (58, grey hair, cream cardigan) and daughter (32, dark waves, white blouse) sharing loveseat, smiling at each other. Zamalek apartment, parquet, family photos, warm ambient light. |

### Hotel/Hospitality
| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 5 | `relaxmax_lifestyle_hotel-suite.webp` | RelaxMax | Off-white RelaxMax in boutique hotel suite. Empty chair. Gouna resort: floor-to-ceiling windows, Red Sea view, neutral linen bedding, travertine, brass accents, single orchid. Soft morning light. |
| 6 | `diva_lifestyle_vacation-rental.webp` | Diva | Giza Gold Diva in Sahel beach house. Empty chair. Whitewashed walls, natural fiber rug, Mediterranean blue accents, terrace with sea glimpse, rattan decor. Golden hour. |
| 7 | `spacesaver_lifestyle_hotel-lobby.webp` | SpaceSaver | Alexandria Linen SpaceSaver in Cairo hotel lobby corner. Empty chair. Marble floors, brass details, art deco elements, single palm, ambient evening light, wall-hugging placement. |

### Office/Work
| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 8 | `worknest_lifestyle_ceo-suite.webp` | WorkNest | Nile Sapphire WorkNest in CEO office. Woman (48, professional blowout, navy blazer, thin gold watch) reviewing documents on laptop tray. Floor-to-ceiling windows, Cairo skyline, dark wood paneling, glass desk, pendant light. |
| 9 | `worknest_lifestyle_sodic-office.webp` | WorkNest | Blue Nile Denim WorkNest in modern office. Woman (40, ponytail, grey blazer) working on MacBook. Walnut accent wall, polished concrete, oak standing desk nearby, pendant light. |
| 10 | `easyup-standard_lifestyle_reception.webp` | EasyUp Std | Mocha Taupe EasyUp in professional reception. Empty chair. Medical/professional waiting area: clean white walls, green plant, warm wood accents, neutral carpet. Accessible comfort. |

**App placement:** `src/data/siteImageManifest.ts` -- lifestyle-home, lifestyle-hotel, lifestyle-office categories. Used by `src/utils/siteImageResolver.ts` -> `getLifestyleImagesForCarousel()` for the homepage carousel, and the `LifestyleGallery` component.

---

## CATEGORY 5: Gift Campaign (2752x1536, 16:9)

These power the "Gift of Comfort" section on the homepage and seasonal marketing.

| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 1 | `gift_hero_relaxmax.webp` | RelaxMax | Off-white RelaxMax with elegant cream ribbon bow, warm ambient light, Off White #FAF7F2 background with Warm Cream gradient. Single gift tag. Premium presentation. |
| 2 | `gift_cozycompanion_giving-moment.webp` | CozyCompanion | Amber Sand CozyCompanion. Daughter (35, elegant cream dress) presenting to mother (60, beige cardigan), mother's hand on heart. Zamalek living room, gift tag on chair. Emotional moment. |
| 3 | `gift_diva_unboxing.webp` | Diva | Desert Sage Diva being revealed. Protective covering removed, Dandle branded packaging, white-glove hands (cotton gloves only, no face). New Giza villa entry, travertine, natural light from doorway. |
| 4 | `gift_relaxmax_2026-campaign.webp` | RelaxMax | Giza Gold RelaxMax. Woman (48, elegant updo, champagne silk blouse, pearl earrings) in gratitude posture, eyes closed, hand on heart. Subtle New Year decor (orchid, candle), French windows, evening city lights. |

**App placement:** `src/data/siteImageManifest.ts` (gift-campaign category). Used by `src/components/GiftOfComfort.tsx` and `src/utils/siteImageResolver.ts` -> `getGiftCampaignBackground()`.

---

## CATEGORY 6: Detail/Macro Shots (2752x1536, 16:9)

Close-up craftsmanship shots for product detail pages and trust-building sections.

| # | Filename | Product | Prompt |
|---|----------|---------|--------|
| 1 | `detail_diva_velvet-stitching.webp` | Diva | Extreme macro: Nile Sapphire velvet headrest, double-stitch seams visible, fabric texture at 100%, shallow depth of field bokeh. Natural light revealing sheen. |
| 2 | `detail_comfortplus_massage.webp` | ComfortPlus | Macro: Coastal Fog chenille backrest, subtle fabric ripple from hidden massage rollers, plush cushion depth. Natural light, shallow focus. |
| 3 | `detail_worknest_laptop-tray.webp` | WorkNest | Macro: Brushed metal laptop tray, MacBook Air on surface, steel cupholder with ceramic mug, metal grain visible. Natural light, shallow DOF. |
| 4 | `detail_easyup_lift-base.webp` | EasyUp Std | Macro: Lift mechanism base, metal framework and hydraulic system, precision engineering. Clean studio light, shallow focus on mechanical details. |

**App placement:** `src/data/siteImageManifest.ts` (detail-macro category). Used in product detail pages for craftsmanship storytelling.

---

## CATEGORY 7: Beyond Products -- Brand and Trust Images

These are additional images a high-end Egyptian recliner business should have but are currently missing from the PWA.

| # | Suggested Filename | Purpose | Prompt | Where It Goes |
|---|-------------------|---------|--------|---------------|
| 1 | `brand-workshop.webp` | Our Story page | Close-up of craftsman's hands stitching leather on a recliner frame. Egyptian workshop, warm tungsten lighting, wood shavings, quality tools. Focus on hands and needle. | `/our-story` page, heritage section |
| 2 | `brand-warehouse.webp` | Trust/Quality | Dandle warehouse: rows of wrapped recliners ready for delivery, clean organized space, Egyptian workers in branded uniforms. Professional logistics. | Trust bar, delivery page |
| 3 | `brand-delivery-crew.webp` | Delivery page | Two Egyptian delivery men in clean uniforms carrying a wrapped recliner into a Cairo apartment building. Professional, careful handling. Warm daylight. | `/trust/delivery` page |
| 4 | `brand-showroom.webp` | Showroom/Partners | Modern furniture showroom in Cairo/Giza, multiple Dandle recliners displayed elegantly, warm lighting, minimal signage. Aspirational retail. | Partners section, showroom info |
| 5 | `brand-fabric-swatches.webp` | Product pages | Overhead flat-lay of 8-10 fabric swatches fanned out on marble surface. Rich textures: leather, velvet, chenille, linen. Natural light, shadows. | Fabric section, swatch selector |
| 6 | `brand-qc-inspection.webp` | Quality/Trust | Egyptian quality inspector examining recliner mechanism with precision tools. Clean factory setting, focused expression, white coat. | Warranty page, trust block |
| 7 | `hero-og-share.webp` | Social sharing | RelaxMax in warm Zamalek setting, overlaid with "Dandle - Earned Luxury" text space. 1200x630 for Open Graph. Warm, inviting, brand-forward. | `<meta og:image>`, social shares |
| 8 | `lifestyle-ramadan.webp` | Seasonal | CozyCompanion loveseat in warm living room, iftar table glimpse in background, lantern light (fanous), family warmth atmosphere. No people needed. | Seasonal campaign hero |
| 9 | `lifestyle-mothers-day.webp` | Seasonal | RelaxMax with single rose on armrest, soft morning light, gift-wrapped box nearby, intimate feminine setting. No people needed. | Seasonal campaign |

**Delivery:** Upload via the same API with filenames above. These would need to be wired into new sections/pages manually after upload -- they don't have existing data file entries yet.

---

## Summary Counts

| Category | Count | Dimensions | Format |
|----------|-------|-----------|--------|
| Product Hero Cards | 10 | 1024x1024 | .webp/.jpg |
| Color Swatch Variants | 29 | 1024x1024 | .webp/.jpg |
| Product Gallery | 12 | 2752x1536 | .webp/.jpg/.png |
| Lifestyle Scenes | 10 | 2752x1536 | .webp |
| Gift Campaign | 4 | 2752x1536 | .webp |
| Detail/Macro | 4 | 2752x1536 | .webp |
| Brand/Trust (new) | 9 | 2752x1536 | .webp |
| **Total** | **78** | | |

---

## Quick Reference: Upload and Verify

```text
1. Generate image per prompt above
2. Base64-encode the file (strip data:image/webp;base64, prefix)
3. POST to https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images
   Body: { "filename": "exact-name-from-table.webp", "base64": "...", "contentType": "image/webp" }
4. Verify: GET same URL -- check filename appears in response
5. Image is immediately live at:
   https://rbvbrxjnhmgrtxvwusxr.supabase.co/storage/v1/object/public/product-images/images/exact-name-from-table.webp
```

Categories 1-6 are auto-wired -- upload the file with the exact filename and it appears in the app immediately. Category 7 (Brand/Trust) images will need code wiring after upload.
