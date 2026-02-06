
# Fix: SpaceSaver "Be First to Know" + Swatch-Image Alignment

## Problem Summary

1. **SpaceSaver missing `beFirstToKnow: true`** in `src/types/product.ts` -- violates locked business spec
2. **Swatch clicks show wrong images** because `productSwatches.ts` lists palette keys that have NO matching entry in `productColorImages.ts`, causing fallback to the default hero image regardless of which swatch the user clicks

## Root Cause Analysis

The two data files are out of sync:

| File | Purpose | Problem |
|------|---------|---------|
| `productSwatches.ts` | Lists 5-7 palette keys per product for UI swatch dots | Includes colors with no photo |
| `productColorImages.ts` | Maps swatch keys to actual image files | Missing entries for many palette keys |

When a user clicks swatch index 4 (e.g. `nile-mist` for RelaxMax), `getProductColorImage('relaxmax', 'nile-mist')` returns `null` because no image is mapped, and the card falls back to the default hero -- giving the appearance of a "random" chair image.

## Fix Strategy

**Principle: Only show swatches that have real product images.** Remove unmapped palette keys from `productSwatches.ts` so that every visible swatch dot corresponds to an actual photo in `productColorImages.ts`.

## Changes

### 1. `src/types/product.ts` -- Add `beFirstToKnow` to SpaceSaver

Add `beFirstToKnow: true` to the SpaceSaver product definition (around line 162). This restores the locked business rule that SpaceSaver uses WhatsApp lead capture.

### 2. `src/data/productSwatches.ts` -- Align swatches to available images

Trim each product's swatch list to ONLY keys that exist in `productColorImages.ts`:

```text
relaxmax:        cognac-leather, alexandria-linen, mocha-taupe, coastal-fog  (remove nile-mist, oasis-green)
relaxmax-limited: camel-leather  (keep as-is, only 1 image)
spacesaver:      mocha-taupe, desert-grey, coastal-fog, terracotta, offwhite  (keep as-is, all have images)
comfortplus:     coastal-fog, tan  (trim to 2 -- only these have images; add 'tan' to palette if missing)
diva:            terracotta, desert-sage, giza-gold, oasis-green, red  (remove nile-sapphire, alexandria-linen)
cozycompanion:   mocha-taupe, sandstorm-ochre, coastal-fog  (remove papyrus-stripe, oasis-green, amber-sand)
easyup:          oasis-green, mocha-taupe, grey, beige  (remove desert-grey, alexandria-linen, papyrus-stripe, nile-sapphire; add grey/beige to palette if missing)
easyup-compact:  charcoal, grey, oasis-green  (trim to match images; remove desert-grey, mocha-taupe)
worknest:        oasis-green, desert-grey, blue-nile-denim  (remove mocha-taupe, coastal-fog, alexandria-linen)
complete-set:    family-modern, alexandria-linen, coastal-fog  (remove oasis-green, giza-gold, blue-nile-denim)
```

### 3. `src/data/palette.ts` -- Add missing palette entries

Add entries for any swatch keys used in `productColorImages.ts` that are missing from the palette:
- `tan` (if missing)
- `grey` (if missing)
- `beige` (if missing)
- `red` (if missing)
- `desert-sage` (if missing)

Each needs a hex value and bilingual name (English + Arabic).

### 4. `src/data/productColorImages.ts` -- Fix duplicate key in easyup

The `easyup` entry has `oasis-green` listed TWICE (lines 53 and 55). Remove the duplicate so `Array.find()` always returns the correct image.

## No Other Files Change

The `ProductCard.tsx` logic is correct -- it properly calls `getProductColorImage(product.id, currentSwatchKey)`. The bug is purely a data alignment issue between the two mapping files.

## Verification

After these changes:
- Every swatch dot on every product card maps to a real photo
- Clicking any swatch instantly shows the correct chair in the correct color
- SpaceSaver shows "Be First to Know" badge and WhatsApp redirect on click
- No "random chair" fallbacks occur
