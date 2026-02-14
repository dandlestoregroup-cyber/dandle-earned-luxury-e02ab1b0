

## Upload Genspark Product Images and Update Site References

### What We Have

Your document contains 21 new product images hosted on Genspark/Manus CDN. These are the new truth and need to replace existing images across the site.

### Complete Image Manifest (from your document)

**Heroes (10 images):**

| Product | New Filename | Genspark URL |
|---------|-------------|--------------|
| RelaxMax | dandle-relaxmax-cognac-leather-hero.webp | dULgNtTbBzMdTZkP.webp |
| RelaxMax Limited | dandle-relaxmax-limited-camel-leather-hero.webp | (embedded in doc) |
| ComfortPlus | dandle-comfortplus-tan-hero.webp | yAVQbhxxedZgNgtT.webp |
| CozyCompanion | dandle-cozycompanion-mocha-taupe-hero.webp | SCBNCtpKUORKkWts.webp |
| Diva | dandle-diva-terracotta-hero.webp | (embedded in doc) |
| EasyUp Standard | dandle-easyup-standard-grey-hero.webp | EIAnetzTvQAMhswd.webp |
| EasyUp Compact | dandle-easyup-compact-charcoal-hero.webp | zBiRHcMhsIPxKTpN.webp |
| WorkNest | dandle-worknest-oasis-green-hero.webp | eFKPaFlCFEEXyGqu.webp |
| SpaceSaver | dandle-spacesaver-alexandria-linen-hero.webp | ywZYwCUwpIjqguuh.webp |
| Complete Set | complete-set-nile-view-living-room-lifestyle.webp | (embedded in doc) |

**Variants / Gallery (10 images):**

| Image | Genspark URL |
|-------|-------------|
| comfortplus-coastal-fog-variant.webp | gHDIPfQciBaEUZIT.webp |
| diva-desert-sage-variant.webp | PDZqIKXKqYkrJiDs.webp |
| diva-giza-gold-variant.webp | wApdkFcMIZcaPDeh.webp |
| easyup-standard-oasis-green-variant.webp | ZZmysbPBlVTwQaSY.webp |
| relaxmax-alexandria-linen-variant.webp | FdhyDvtpaMGNroZm.webp |
| relaxmax-mocha-taupe-variant.webp | AnOHTiiCgXmepbiE.webp |
| spacesaver-mocha-taupe-variant.webp | akmGLwQArviuIBXv.webp |
| spacesaver-terracotta-reclined-variant.webp | mHKoZTwJrtyLNuWx.webp |
| worknest-blue-nile-denim-variant.webp | (embedded in doc) |
| worknest-desert-grey-variant.webp | oYQRUEVDHaVdUrga.webp |

**Lifestyle (1 image):**

| Image | Genspark URL |
|-------|-------------|
| easyup-pregnant-woman-accessibility-lifestyle.webp | (embedded in doc) |

### Plan

**Step 1: Create a bulk import edge function**

A new `import-genspark-images` edge function that:
- Accepts an array of `{ filename, sourceUrl }` entries
- Fetches each image from the Genspark/Manus CDN
- Converts to bytes and uploads to the `product-images` storage bucket under `images/` prefix
- Returns success/failure per image

**Step 2: Update `productImageData.ts`**

Replace all hero `mainImage` and `galleryImages` entries with the new filenames from your document:
- Each product hero becomes `cdnUrl('/images/dandle-{product}-{color}-hero.webp')`
- Gallery entries use the new variant filenames
- Old filenames that have no replacement stay as fallbacks

**Step 3: Update `product.ts` imageUrl fields**

Update the `imageUrl` field on each product to match the new hero filenames (these are used for product cards in the gallery grid).

**Step 4: Trigger the import**

Call the new edge function with all 21 image URLs to populate cloud storage. For the 5 images where the URL was embedded in the doc (not parsed as text), we extract those from the document's embedded images directly.

### Note on Missing URLs

5 of 21 images had their URLs embedded as clickable links in the Word doc rather than plain text. For those (RelaxMax Limited hero, Diva hero, Complete Set lifestyle, EasyUp lifestyle, WorkNest Blue Nile variant), we will extract the actual images from the parsed document and upload them directly.

### Technical Details

- **Files modified:** `supabase/functions/import-genspark-images/index.ts` (new), `src/data/productImageData.ts`, `src/types/product.ts`
- **No catalog changes:** Pricing, names, and availability remain frozen
- **CDN system preserved:** All images still served through `cdnUrl()` from cloud storage

