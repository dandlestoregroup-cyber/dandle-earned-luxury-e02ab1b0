

# Save Google Business Profile Setup as Reference Document + Align Structured Data

## What This Does

Two things:
1. Saves the complete Google Business Profile (GBP) setup instructions as a reference document at `public/GOOGLE_BUSINESS_PROFILE.md` -- accessible at your published URL just like the Manus guide
2. Updates the `LocalBusiness` structured data in `src/utils/structuredData.ts` to align with the GBP data (service areas, business type, description)

## Changes

### 1. New File: `public/GOOGLE_BUSINESS_PROFILE.md`

The complete GBP setup guide you provided, formatted as a clean Markdown reference document covering:
- Business name, categories, type
- Service areas (20+ cities)
- Business description
- Services list (7 items)
- Product names (9 products, exact names)
- Photo upload checklist
- Review system guidelines
- Verification prep
- Trust footer in EN/AR

### 2. Update: `src/utils/structuredData.ts`

Align the `generateLocalBusinessSchema` function with GBP data:
- Change `@type` from `FurnitureStore` to include `HomeGoodsStore` as additional type
- Add `description` matching the GBP business description
- Add `areaServed` with the full list of Egyptian service cities
- Add `hasOfferCatalog` listing the 9 product names
- Keep existing fields (name, url, telephone, priceRange)

This ensures Google sees consistent data between your GBP listing and your website's structured data.

### Technical Detail

| File | Change |
|---|---|
| `public/GOOGLE_BUSINESS_PROFILE.md` | New file -- complete GBP setup reference |
| `src/utils/structuredData.ts` | Update LocalBusiness schema to match GBP service areas and description |

