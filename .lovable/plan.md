

# Manus.ai Integration Guide + Lifestyle Gallery Expansion + PWA Upgrade

This plan consolidates three things into one deliverable:
1. A comprehensive instruction document for Manus.ai with all image slots, colors, sizes, and API access
2. New lifestyle gallery images targeting Egyptian high-end hospitality (hotels, North Coast, Sokhna, villas, apartments)
3. Upgrading the PWA to top-notch standards

---

## Part 1: Manus.ai Instruction Document

Create a new file `public/MANUS_INTEGRATION_GUIDE.md` containing everything Manus.ai needs:

### Cloud API Access

- **Endpoint:** `https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images`
- **No authentication required** (open access)
- **Operations:**
  - `GET` -- List all images in storage
  - `POST` -- Upload/replace: `{ "filename": "example.webp", "base64": "<data>", "contentType": "image/webp" }`
  - `DELETE` -- Remove: `{ "filename": "example.webp" }`

### Image Specifications (ALL images)

| Spec | Value |
|---|---|
| Format | `.webp` (mandatory for all new uploads) |
| Product Heroes | 1024x1024px (1:1 square) |
| Complete Set Hero | 2752x1536px (16:9 landscape) |
| Lifestyle Gallery | 2752x1536px (16:9) |
| Gift Campaign | 2752x1536px (16:9) |
| Detail/Macro | 2752x1536px (16:9) |
| Color Swatches | 1024x1024px (1:1) |
| Max file size | Under 2MB per image |
| Quality | 80-90% WebP compression |

### Complete Color Palette (25 colors)

| Key | English Name | Arabic Name | Hex | Material |
|---|---|---|---|---|
| nile-sapphire | Nile Sapphire Blue | ازرق النيل الياقوتي | #2E5D7B | Velvet |
| alexandria-linen | Alexandria Linen | كتان الإسكندرية | #C4A77D | Belgian Linen |
| desert-sage | Desert Sage | المريمية الصحراوية | #8B9A6B | Microsuede |
| desert-grey | Desert Grey | الرمادي الصحراوي | #5C5C5C | Leather |
| amber-sand | Amber Sand | رمل العنبر | #C19A6B | Nubuck Leather |
| mocha-taupe | Mocha Taupe | موكا تاوب | #6B5B4D | Chenille |
| coastal-fog | Coastal Fog Grey | رمادي ضباب الساحل | #8A8D8F | Chenille |
| nile-mist | Nile Mist Terracotta | تيراكوتا ضباب النيل | #C67B5C | Cotton Velvet |
| giza-gold | Giza Gold Weave | ذهب الجيزة المنسوج | #B8860B | Woven Fabric |
| oasis-green | Oasis Green | أخضر الواحة | #4A7C59 | Performance Fabric |
| blue-nile-denim | Blue Nile Denim | دنيم النيل الأزرق | #4A6B8A | Recycled Denim |
| sandstorm-ochre | Sandstorm Ochre | مغرة العاصفة الرملية | #CC7722 | Cotton Blend |
| papyrus-stripe | Papyrus Stripe | شريط البردي | #E8DCC4 | Linen Blend |
| clay-pottery | Clay Pottery | فخار الطين | #8B4513 | Textured Woven |
| cognac-leather | Cognac Leather | جلد الكونياك | #8B4513 | Full-Grain Leather |
| camel-leather | Camel Leather | جلد الجمل | #C19A6B | Full-Grain Leather |
| espresso-brown | Espresso Brown | بني إسبريسو | #4A3728 | Full-Grain Leather |
| charcoal | Charcoal | الفحمي | #36454F | Textured Leather |
| terracotta | Terracotta | تيراكوتا | #CB6D51 | Cotton Velvet |
| offwhite | Off White | أوف وايت | #F5F5DC | Linen Blend |
| tan | Tan | تان | #D2B48C | Faux Leather |
| grey | Grey | رمادي | #808080 | Fabric |
| beige | Beige | بيج | #C8B99A | Fabric |
| red | Red | أحمر | #B22222 | Cotton Velvet |
| family-modern | Family Modern | عائلي عصري | #8A8D8F | Performance Fabric |

### Product-to-Swatch Mapping (which colors each product uses)

| Product | Swatch Keys | Current Hero Filename |
|---|---|---|
| relaxmax | cognac-leather, alexandria-linen, mocha-taupe, coastal-fog | dandle-relaxmax-hero.webp |
| relaxmax-limited | camel-leather, mocha-taupe | relaxmax-limited-mocha-taupe.webp |
| spacesaver | alexandria-linen, mocha-taupe, desert-grey, terracotta, offwhite | dandle-spacesaver-hero.webp |
| comfortplus | tan, coastal-fog | comfortplus-hero-new.jpg |
| diva | terracotta, giza-gold, oasis-green, desert-sage | dandle-diva.jpg |
| cozycompanion | mocha-taupe, alexandria-linen, coastal-fog | cozycompanion-hero-new.jpg |
| easyup-standard | grey, oasis-green, mocha-taupe, coastal-fog | easyup-standard-hero-new.jpg |
| easyup-compact | charcoal, grey, oasis-green | easyup-compact-hero-new.jpg |
| worknest | oasis-green, blue-nile-denim, desert-grey | dandle-worknest.jpg |
| complete-set | family-modern | complete-set-final.webp |

### All Color Variant Image Filenames (swatch click images)

These are the filenames Manus can replace to update swatch-click images:

```text
relaxmax-primary-cognac.webp
relaxmax-alexandria-linen.webp
relaxmax-mocha-taupe.webp
relaxmax-coastal-fog.webp
relaxmax-limited-mocha-taupe.webp
spacesaver-primary-linen.webp
spacesaver-mocha-taupe.webp
spacesaver-desert-grey.webp
spacesaver-terracotta-reclined.webp
spacesaver-primary.webp
comfortplus-tan-lifestyle.webp
comfortplus-coastal-fog-lifestyle.webp
diva-primary-terracotta.webp
diva-giza-gold.webp
diva-oasis-green-reclined.webp
diva-desert-sage-green.webp
cozycompanion-mocha-taupe-front.webp
cozycompanion-lifestyle-elder.webp
cozycompanion-coastal-fog.webp
easyup-standard-grey-pregnant.webp
easyup-standard-oasis-green.webp
easyup-standard-mocha-taupe.webp
easyup-standard-coastal-fog.webp
easyup-compact-charcoal-front.jpg
easyup-compact-grey-front.webp
easyup-compact-oasis-green.webp
worknest-primary-green.webp
worknest-blue-nile.webp
worknest-desert-grey.webp
complete-set-final.webp
```

### Homepage Section Image Slots

| Section | Filename | Purpose |
|---|---|---|
| Gift of Comfort BG | gift-lifestyle-cairo.jpg | Full-bleed background |
| Showroom | dandle-partnerships-room.png | Experience Room section |
| Partners | dandle-omash-partnership.webp | OMASH partnership |

### Lifestyle Gallery Slots (carousel on homepage)

These are the images that appear in the lifestyle carousel. Manus uploads them via the API and they appear automatically:

| ID | Filename | Setting | Product |
|---|---|---|---|
| lifestyle-home-zamalek | relaxmax_lifestyle_zamalek-living.webp | Zamalek apartment | RelaxMax |
| lifestyle-home-newgiza | comfortplus_lifestyle_newgiza-villa.webp | New Giza villa | ComfortPlus |
| lifestyle-home-reading | diva_lifestyle_reading-nook.webp | Reading nook | Diva |
| lifestyle-home-family | cozycompanion_lifestyle_family-moment.webp | Family moment | CozyCompanion |
| lifestyle-hotel-suite | relaxmax_lifestyle_hotel-suite.webp | Boutique hotel suite | RelaxMax |
| lifestyle-hotel-vacation | diva_lifestyle_vacation-rental.webp | Sahel vacation rental | Diva |
| lifestyle-hotel-lobby | spacesaver_lifestyle_hotel-lobby.webp | Hotel lobby | SpaceSaver |
| lifestyle-office-executive | worknest_lifestyle_ceo-suite.webp | CEO executive suite | WorkNest |
| lifestyle-office-sodic | worknest_lifestyle_sodic-office.webp | SODIC office | WorkNest |
| lifestyle-office-reception | easyup-standard_lifestyle_reception.webp | Professional reception | EasyUp Standard |

### Testing Capabilities Manus Can Perform

- **Image readiness check:** `GET` the manage-images endpoint, verify all filenames exist
- **Speed test:** Fetch published URL and measure load times, run Lighthouse via headless browser
- **Visual QA:** Screenshot published site, compare against design spec
- **Any changes requested** by the owner are relayed to Lovable.dev for code changes; image changes go through the API above

### How It All Connects

```text
Manus.ai (generates/edits images)
    |
    v  POST { filename, base64, contentType: "image/webp" }
    |
Cloud Storage (product-images bucket)
    |
    v  cdnUrl("/images/{filename}") auto-resolves
    |
Live Website (dandle-earned-luxury.lovable.app)
```

Lovable.dev handles all code and layout changes. Manus handles image generation and upload via the API. Changes reflect on the site as soon as the CDN cache refreshes (typically seconds).

---

## Part 2: Expand Lifestyle Gallery for High-End Egyptian Market

Add new lifestyle images to `siteImageManifest.ts` targeting hotels, North Coast, Sokhna, high-end apartments, and villas:

### New Images to Add (8 new entries)

| ID | Category | Setting | Product | Caption EN | Caption AR |
|---|---|---|---|---|---|
| lifestyle-hotel-northcoast | lifestyle-hotel | North Coast Hacienda villa | RelaxMax | North Coast Living | حياة الساحل الشمالي |
| lifestyle-hotel-sokhna | lifestyle-hotel | Ain Sokhna chalet terrace | Diva | Sokhna Retreat | ملاذ السخنة |
| lifestyle-hotel-gouna | lifestyle-hotel | El Gouna boutique hotel | SpaceSaver | El Gouna Elegance | أناقة الجونة |
| lifestyle-home-newcairo-villa | lifestyle-home | New Cairo compound villa | ComfortPlus | Villa Comfort | راحة الفيلا |
| lifestyle-home-marassi | lifestyle-home | Marassi apartment | CozyCompanion | Marassi Living | حياة مراسي |
| lifestyle-hotel-fourseasons | lifestyle-hotel | Four Seasons style suite | RelaxMax Limited | Five-Star Suite | جناح خمس نجوم |
| lifestyle-home-katameya | lifestyle-home | Katameya Heights villa | Complete Set | Family Villa | فيلا العائلة |
| lifestyle-home-zamalek-penthouse | lifestyle-home | Zamalek Nile-view penthouse | WorkNest | Penthouse Office | مكتب البنتهاوس |

Each entry includes a detailed AI generation prompt following brand constraints (45-degree left angle, L-brackets, Egyptian subjects, no veil, etc.).

### Files Modified

| File | Change |
|---|---|
| `src/data/siteImageManifest.ts` | Add 8 new lifestyle entries with prompts for North Coast, Sokhna, Gouna, villas, penthouses |

---

## Part 3: Upgrade PWA to Top-Notch Standards

The current PWA config is minimal (placeholder icons, generic manifest). Upgrade to production-grade:

### Changes to `vite.config.ts`

- Update manifest with proper branding: name "Dandle Recliners Egypt", theme_color "#B85C38", background_color "#FFFFFF", lang "ar", dir "rtl", orientation "portrait"
- Reference proper PWA icons (`pwa-192x192.png`, `pwa-512x512.png`) instead of placeholder.svg
- Add Workbox runtime caching strategies for images (CacheFirst, 30 days), Google Fonts (CacheFirst, 365 days)
- Set `maximumFileSizeToCacheInBytes: 5 * 1024 * 1024` for large hero assets
- Add `navigateFallbackDenylist: [/^\/~oauth/]` for OAuth safety
- Add `display: "standalone"`, `start_url: "/"`

### Changes to `index.html`

- Add `<meta name="theme-color" content="#B85C38">`
- Add `<meta name="apple-mobile-web-app-capable" content="yes">`
- Add `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
- Add `<link rel="apple-touch-icon" href="/pwa-192x192.png">`

### Files Modified

| File | Change |
|---|---|
| `public/MANUS_INTEGRATION_GUIDE.md` | New file -- complete integration guide for Manus.ai |
| `src/data/siteImageManifest.ts` | Add 8 new lifestyle entries for hotels, North Coast, Sokhna, villas |
| `vite.config.ts` | Upgrade PWA manifest, add Workbox caching, proper icons |
| `index.html` | Add mobile meta tags for PWA |

