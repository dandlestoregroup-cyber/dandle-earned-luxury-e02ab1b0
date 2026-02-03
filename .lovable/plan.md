
# Image System Replacement + New Products

## Image Catalog (Single Source of Truth)

| File | Product ID | Image Purpose |
|------|-----------|---------------|
| `1_Dandle_RelaxMax.webp` | `relaxmax` | Hero Image |
| `2_Dandle_RelaxMax_Compact.webp` | `relaxmax-compact` | Hero Image (NEW) |
| `3_Dandle_Worknest.webp` | `worknest` | Hero Image |
| `4_Dandle_EasyUp_Compact.webp` | `easyup-compact` | Hero Image |
| `5_Dandle_EasyUp_Standard.webp` | `easyup` | Hero Image |
| `6_Dandle_CozyCompanion.webp` | `cozycompanion` | Hero Image |
| `7_Dandle_Diva.webp` | `diva` | Hero Image |
| `8_Dandle_The_Comfort_Collection.webp` | `complete-set` | Hero Image |
| `9_Dandle_RelaxMax_Limited_Edition.webp` | `relaxmax-limited` | Hero Image (NEW) |

---

## Phase 1: Copy Images to Project

Copy all 9 uploaded images to `public/images/` with clean naming:

```text
public/images/
├── dandle-relaxmax-hero.webp
├── dandle-relaxmax-compact-hero.webp     (NEW)
├── dandle-worknest-hero.webp
├── dandle-easyup-compact-hero.webp
├── dandle-easyup-standard-hero.webp
├── dandle-cozycompanion-hero.webp
├── dandle-diva-hero.webp
├── dandle-complete-set-hero.webp
└── dandle-relaxmax-limited-hero.webp     (NEW)
```

---

## Phase 2: Add New Products to Catalog

### A. Update `src/types/product.ts`

Add two new products with locked copy:

**RelaxMax Compact**
- ID: `relaxmax-compact`
- Tagline: "Same Comfort, Smaller Footprint"
- 3-Word Truth: "Compact. Cozy. Right."
- Price: TBD (Coming Soon or BeFirstToKnow)

**RelaxMax Limited Edition**
- ID: `relaxmax-limited`
- Tagline: "Premium Meets Performance"
- 3-Word Truth: "Swivel. Sip. Settle."
- Features: 360° swivel base, dual cup holders, premium leather
- Price: TBD (Flagship pricing)

### B. Update `src/components/ProductCard.tsx`

Add Arabic translations for new products:
```typescript
'relaxmax-compact': {
  name: 'ريلاكس ماكس كومباكت',
  englishName: 'RelaxMax Compact',
  tagline: 'نفس الراحة، مساحة أصغر',
  truth: 'مدمج. مريح. صحيح.'
},
'relaxmax-limited': {
  name: 'ريلاكس ماكس ليميتد إيديشن',
  englishName: 'RelaxMax Limited Edition',
  tagline: 'الفخامة تلتقي بالأداء',
  truth: 'دوار. رشفة. استرخاء.'
}
```

### C. Update `src/components/ProductGallery.tsx`

Add new products to the featured order:
```typescript
const featuredOrder = [
  "relaxmax",
  "relaxmax-limited",    // NEW - after RelaxMax
  "relaxmax-compact",    // NEW
  "easyup",
  "easyup-compact",
  "comfortplus",         // Note: No image in batch - keep existing
  "diva",
  "spacesaver",          // Note: No image in batch - keep existing
  "worknest",
  "cozycompanion",
  "complete-set",
];
```

---

## Phase 3: Replace All Image Mappings

### A. Update `src/catalog/lovableCatalog.ts`

Replace hero images for all 9 products with new uploaded images:

```typescript
{
  productHandle: "relaxmax",
  heroImage: {
    src: "/images/dandle-relaxmax-hero.webp",
    // ...
  }
}
// ... repeat for all products
```

### B. Update `src/data/productColorImages.ts`

Set new hero images as primary for each product:

```typescript
'relaxmax': [
  { swatchKey: 'cognac-leather', imageSrc: '/images/dandle-relaxmax-hero.webp' },
  // ... existing variants
],
'relaxmax-compact': [
  { swatchKey: 'mocha-fabric', imageSrc: '/images/dandle-relaxmax-compact-hero.webp' },
],
'relaxmax-limited': [
  { swatchKey: 'camel-leather', imageSrc: '/images/dandle-relaxmax-limited-hero.webp' },
],
// ... update all products
```

### C. Update `src/data/productImageData.ts`

Update main image references for all products.

---

## Phase 4: Ensure Container Sizing

### A. Review `ProductCard.tsx` aspect ratio

Current: `aspect-[3/4]` (portrait)

The uploaded images appear to be portrait orientation (approximately 3:4 or 2:3). Will verify and adjust if needed to ensure full image display without cropping.

### B. Review image object-fit

Current: `object-contain object-center`

This ensures full image visibility. Will verify no cropping occurs.

---

## Files to Modify

| File | Changes |
|------|---------|
| `public/images/` | Copy 9 new hero images |
| `src/types/product.ts` | Add 2 new products (RelaxMax Compact, RelaxMax Limited Edition) |
| `src/components/ProductCard.tsx` | Add Arabic translations for new products |
| `src/components/ProductGallery.tsx` | Add new products to featured order |
| `src/catalog/lovableCatalog.ts` | Replace hero images for all products |
| `src/data/productColorImages.ts` | Update primary color variants with new images |
| `src/data/productImageData.ts` | Update main image references |

---

## Missing Images Note

Two products from the current catalog have NO new images in this batch:
- **ComfortPlus** - Keep existing `/images/dandle-comfortplus.jpg`
- **SpaceSaver** - Keep existing `/images/dandle-spacesaver.jpg`

If you have images for these, please upload them in the next batch.

---

## Success Criteria

1. All 9 uploaded images display as hero images on product cards
2. Two new products (RelaxMax Compact, RelaxMax Limited Edition) visible in gallery
3. Images display at full size without cropping
4. Bilingual support works for new products
5. No 404 errors on any product images
