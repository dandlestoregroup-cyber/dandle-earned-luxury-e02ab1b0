
# Plan: Fix Product Images & Bilingual RTL Support

## Problem Analysis

### 1. Product Images Not Replaced
The uploaded images were added as **gallery images** in `productImageData.ts`, but the **main product card images** come from:
- `productColorImages.ts` → Points to Supabase Storage URLs (e.g., `https://rbvbrxjnhmgrtxvwusxr.supabase.co/storage/v1/object/public/product-images/...`)
- The ProductCard component fetches images from these Supabase URLs, NOT from local `public/images/`

**To fix:** Need to either upload the new images to Supabase Storage or update the image mapping to use local paths.

### 2. Arabic Text Reversed / Not Showing
The `AnimatedHeadline` component splits text character-by-character and animates each letter. This breaks Arabic text because:
- It doesn't read the `data-ar` attribute
- Arabic text gets reversed when split by character without proper RTL handling
- The parent `data-en`/`data-ar` wrapper doesn't work because children are hardcoded

**Affected components:**
- `HeroOffer.tsx` - AnimatedHeadline shows "The Gift of Comfort" always
- All elements with `data-en`/`data-ar` that contain nested components

---

## Implementation Plan

### Phase 1: Fix Bilingual AnimatedHeadline (Hero)

**Update `src/components/hero/AnimatedHeadline.tsx`:**
- Accept bilingual props `textEn` and `textAr`
- Detect current language from storage
- For Arabic text, don't split by character (prevents reversal)
- Apply proper RTL direction

**Update `src/components/hero/HeroOffer.tsx`:**
- Pass both English and Arabic text to AnimatedHeadline
- Remove the wrapper div with data attributes

### Phase 2: Fix Product Images

**Option A (Recommended): Update productColorImages.ts to use local paths**
- Change image sources from Supabase URLs to local `/images/` paths for the newly uploaded images
- This ensures immediate visibility

**Option B: Upload to Supabase Storage**
- Use the admin extraction tool to upload images to Supabase Storage
- More complex but keeps architecture consistent

We'll go with Option A for immediate fix.

### Phase 3: Ensure All Site Text Follows Language Rules

**English mode:** All text in English
**Arabic mode:** All text in Arabic EXCEPT product names which show as:
> `ريلاكس ماكس (RelaxMax)`

**Review and update:**
- HeroOffer.tsx
- Quote.tsx  
- TopBanner.tsx
- ProductCard.tsx (already correct)
- Navigation.tsx
- Footer.tsx

---

## Technical Details

### AnimatedHeadline Fix
```tsx
// New props interface
interface AnimatedHeadlineProps {
  textEn: string;
  textAr: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}

// Detect language and render appropriately
const lang = getLangFromStorage();
const isArabic = lang === 'ar';
const text = isArabic ? textAr : textEn;

// For Arabic: don't split characters (animate as words or whole text)
// For English: existing character animation
```

### Product Images Fix
Update `productColorImages.ts` for products with new uploaded images:
- relaxmax-mocha-taupe.webp
- relaxmax-coastal-fog.webp
- comfortplus-coastal-fog-lifestyle.webp
- spacesaver-terracotta-reclined.webp
- worknest-desert-grey-reclined-2.webp
- spacesaver-mocha-taupe-reclined.webp
- easyup-lift-assist-lifestyle-2.webp
- easyup-compact-oasis-green-2.webp
- cozycompanion-mocha-taupe-2.webp
- cozycompanion-couple-lifestyle-2.webp

---

## Files to Modify

1. `src/components/hero/AnimatedHeadline.tsx` - Add bilingual support with RTL handling
2. `src/components/hero/HeroOffer.tsx` - Pass bilingual props to AnimatedHeadline
3. `src/data/productColorImages.ts` - Add local image paths or update existing mappings
4. `src/components/Quote.tsx` - Ensure proper RTL rendering
5. `src/dandle-ui.ts` - Review RTL text handling

## Success Criteria

1. Hero headline shows "The Gift of Comfort" in English mode, "هدية الراحة" in Arabic mode (no reversed letters)
2. All uploaded product images display correctly on product cards
3. Arabic mode shows all Arabic text except product names in brackets
4. No reversed Arabic letters anywhere on the site
