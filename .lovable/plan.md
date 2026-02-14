

## Fix: Simplified Image Upload and Display System

### The Problem

Your image system has become unreliable because there are **4 competing layers** that determine which image shows on a product card:

1. **`lovableCatalog.ts`** -- defines `heroImage.src` per product
2. **`siteImageManifest.ts`** -- can override the catalog hero via `getLovableProduct()` if `status === 'exists'`
3. **`productColorImages.ts`** -- defines swatch-click images (used when a swatch is selected)
4. **`product.ts`** -- has its own `imageUrl` field (used as fallback)

When you upload a new image, it needs to land in the right place in **all 4 files** AND physically exist at the path referenced. If any layer is out of sync, you get blank images or wrong images.

Additionally, `cdnUrl()` rewrites `/images/filename.webp` to a cloud storage URL -- but many images only exist locally in `public/images/` and were never uploaded to cloud storage, causing 404s.

### The Fix

Consolidate the system so uploading an image is simple and predictable.

**Step 1: Make `productColorImages.ts` the single source of truth for swatch images**

- Keep using direct local paths (`/images/filename.webp`) since these are reliable and always available
- Remove `cdnUrl()` wrapping from `productImageData.ts` gallery entries -- use local paths there too
- This eliminates the "uploaded locally but CDN returns 404" problem entirely

**Step 2: Create an admin "Image Upload" page that actually works**

Replace the current broken upload flow with a simple drag-and-drop page at `/admin/upload-product-images`:

- Drop an image onto a product card slot (hero, swatch variant, or gallery)
- The image is saved to `public/images/` with the correct filename
- The code references are automatically correct because filenames follow a convention
- No edge function needed, no cloud storage sync needed

**Step 3: Simplify `getLovableProduct()` in the catalog**

- Remove the `siteImageManifest` override layer that silently replaces hero images
- The catalog `heroImage.src` becomes the final answer -- no surprises
- Gallery images come from `lovableCatalog.ts` directly

**Step 4: Provide a clear "How to upload" workflow for you**

Going forward, when you want to update an image:

1. **Attach the image** in chat (drag and drop into this chat)
2. **Tell me** which product and which slot (e.g., "RelaxMax hero" or "Diva oasis-green swatch")
3. I save it to `public/images/` with the correct filename
4. I update the relevant data file if the filename changed
5. Done -- it shows immediately, no CDN sync needed

### Technical Details

**Files to modify:**
- `src/catalog/lovableCatalog.ts` -- Remove `siteImageManifest` override in `getLovableProduct()`, use catalog paths directly
- `src/data/productImageData.ts` -- Remove `cdnUrl()` wrapper, use plain `/images/` paths
- `src/data/productColorImages.ts` -- Already using local paths (keep as-is)
- `src/components/ProductCard.tsx` -- No changes needed (already reads from catalog + productColorImages correctly)

**Files unchanged:**
- `src/lib/imageUrl.ts` -- Keep `cdnUrl()` available for future CDN migration, just stop using it as default
- `supabase/functions/upload-images/` -- Keep for future bulk CDN migration if needed

**Result:** One image upload = one file in `public/images/` = immediately visible on site. No more ghost images, no more CDN 404s, no more 4-layer overrides.

