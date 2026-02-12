# Manus.ai Integration Guide — Dandle Earned Luxury

> **Last updated:** 2026-02-12
> **Site:** https://dandle-earned-luxury.lovable.app
> **Code changes:** Lovable.dev (relay requests to owner)
> **Image changes:** Use the Cloud API below

---

## 1. Cloud Image API

**Endpoint:** `https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images`
**Authentication:** None required (open access)

### Operations

| Method | Purpose | Payload |
|--------|---------|---------|
| `GET` | List all images in storage | — |
| `POST` | Upload or replace an image | `{ "filename": "example.webp", "base64": "<data>", "contentType": "image/webp" }` |
| `DELETE` | Remove an image | `{ "filename": "example.webp" }` |

### cURL Examples

```bash
# List all images
curl https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images

# Upload an image
curl -X POST https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images \
  -H "Content-Type: application/json" \
  -d '{"filename":"relaxmax-hero.webp","base64":"<BASE64_DATA>","contentType":"image/webp"}'

# Delete an image
curl -X DELETE https://rbvbrxjnhmgrtxvwusxr.supabase.co/functions/v1/manage-images \
  -H "Content-Type: application/json" \
  -d '{"filename":"old-image.webp"}'
```

### How Images Appear on the Live Site

```
Manus.ai (generates/edits images)
    │
    ▼  POST { filename, base64, contentType: "image/webp" }
    │
Cloud Storage (product-images bucket)
    │
    ▼  cdnUrl("/images/{filename}") auto-resolves
    │
Live Website (dandle-earned-luxury.lovable.app)
```

Once uploaded, images appear on the site within seconds (CDN cache refresh). No code changes needed for image swaps.

---

## 2. Image Specifications

| Spec | Value |
|------|-------|
| **Format** | `.webp` (mandatory for ALL new uploads) |
| **Product Heroes** | 1024×1024 px (1:1 square) |
| **Complete Set Hero** | 2752×1536 px (16:9 landscape) |
| **Lifestyle Gallery** | 2752×1536 px (16:9) |
| **Gift Campaign** | 2752×1536 px (16:9) |
| **Detail/Macro** | 2752×1536 px (16:9) |
| **Color Swatches** | 1024×1024 px (1:1) |
| **Max file size** | Under 2 MB per image |
| **Quality** | 80–90% WebP compression |

### Brand Visual Rules

- **L-brackets:** Dandle Orange `#E67E22`, 8px stroke, 55px length, 40px inset, all 4 corners
- **Chair angle:** 45° LEFT camera angle (hides controls on right armrest)
- **Composition:** Chair = 60% of frame, magnetic center, 40–50% negative space
- **Human subjects:** Egyptian woman age 35–65, flowing uncovered hair, natural skin texture, NO veil/hijab, NOT looking at camera
- **Props:** ONE maximum (coffee cup, book, or reading light)
- **Aesthetic:** Real photography feel — warm natural light, no AI sheen

---

## 3. Complete Color Palette (25 Colors)

| Key | English Name | Arabic Name | Hex | Material |
|-----|-------------|-------------|-----|----------|
| `nile-sapphire` | Nile Sapphire Blue | ازرق النيل الياقوتي | `#2E5D7B` | Velvet |
| `alexandria-linen` | Alexandria Linen | كتان الإسكندرية | `#C4A77D` | Belgian Linen |
| `desert-sage` | Desert Sage | المريمية الصحراوية | `#8B9A6B` | Microsuede |
| `desert-grey` | Desert Grey | الرمادي الصحراوي | `#5C5C5C` | Leather |
| `amber-sand` | Amber Sand | رمل العنبر | `#C19A6B` | Nubuck Leather |
| `mocha-taupe` | Mocha Taupe | موكا تاوب | `#6B5B4D` | Chenille |
| `coastal-fog` | Coastal Fog Grey | رمادي ضباب الساحل | `#8A8D8F` | Chenille |
| `nile-mist` | Nile Mist Terracotta | تيراكوتا ضباب النيل | `#C67B5C` | Cotton Velvet |
| `giza-gold` | Giza Gold Weave | ذهب الجيزة المنسوج | `#B8860B` | Woven Fabric |
| `oasis-green` | Oasis Green | أخضر الواحة | `#4A7C59` | Performance Fabric |
| `blue-nile-denim` | Blue Nile Denim | دنيم النيل الأزرق | `#4A6B8A` | Recycled Denim |
| `sandstorm-ochre` | Sandstorm Ochre | مغرة العاصفة الرملية | `#CC7722` | Cotton Blend |
| `papyrus-stripe` | Papyrus Stripe | شريط البردي | `#E8DCC4` | Linen Blend |
| `clay-pottery` | Clay Pottery | فخار الطين | `#8B4513` | Textured Woven |
| `cognac-leather` | Cognac Leather | جلد الكونياك | `#8B4513` | Full-Grain Leather |
| `camel-leather` | Camel Leather | جلد الجمل | `#C19A6B` | Full-Grain Leather |
| `espresso-brown` | Espresso Brown | بني إسبريسو | `#4A3728` | Full-Grain Leather |
| `charcoal` | Charcoal | الفحمي | `#36454F` | Textured Leather |
| `terracotta` | Terracotta | تيراكوتا | `#CB6D51` | Cotton Velvet |
| `offwhite` | Off White | أوف وايت | `#F5F5DC` | Linen Blend |
| `tan` | Tan | تان | `#D2B48C` | Faux Leather |
| `grey` | Grey | رمادي | `#808080` | Fabric |
| `beige` | Beige | بيج | `#C8B99A` | Fabric |
| `red` | Red | أحمر | `#B22222` | Cotton Velvet |
| `family-modern` | Family Modern | عائلي عصري | `#8A8D8F` | Performance Fabric |

---

## 4. Product-to-Swatch Mapping

| Product | Swatch Keys | Current Hero Filename |
|---------|-------------|----------------------|
| `relaxmax` | cognac-leather, alexandria-linen, mocha-taupe, coastal-fog | `dandle-relaxmax-hero.webp` |
| `relaxmax-limited` | camel-leather, mocha-taupe | `relaxmax-limited-mocha-taupe.webp` |
| `spacesaver` | alexandria-linen, mocha-taupe, desert-grey, terracotta, offwhite | `dandle-spacesaver-hero.webp` |
| `comfortplus` | tan, coastal-fog | `comfortplus-hero-new.jpg` |
| `diva` | terracotta, giza-gold, oasis-green, desert-sage | `dandle-diva.jpg` |
| `cozycompanion` | mocha-taupe, alexandria-linen, coastal-fog | `cozycompanion-hero-new.jpg` |
| `easyup-standard` | grey, oasis-green, mocha-taupe, coastal-fog | `easyup-standard-hero-new.jpg` |
| `easyup-compact` | charcoal, grey, oasis-green | `easyup-compact-hero-new.jpg` |
| `worknest` | oasis-green, blue-nile-denim, desert-grey | `dandle-worknest.jpg` |
| `complete-set` | family-modern | `complete-set-final.webp` |

---

## 5. All Replaceable Filenames

### Color Variant / Swatch Images

Upload these exact filenames to update swatch-click images:

```
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

### Homepage Section Images

| Section | Filename | Purpose |
|---------|----------|---------|
| Gift of Comfort BG | `gift-lifestyle-cairo.jpg` | Full-bleed background |
| Showroom | `dandle-partnerships-room.png` | Experience Room section |
| Partners | `dandle-omash-partnership.webp` | OMASH partnership |

---

## 6. Lifestyle Gallery Slots (Homepage Carousel)

These images appear in the lifestyle carousel. Upload via the API and they appear automatically:

| ID | Filename | Setting | Product |
|----|----------|---------|---------|
| lifestyle-home-zamalek | `relaxmax_lifestyle_zamalek-living.webp` | Zamalek apartment | RelaxMax |
| lifestyle-home-newgiza | `comfortplus_lifestyle_newgiza-villa.webp` | New Giza villa | ComfortPlus |
| lifestyle-home-reading | `diva_lifestyle_reading-nook.webp` | Reading nook | Diva |
| lifestyle-home-family | `cozycompanion_lifestyle_family-moment.webp` | Family moment | CozyCompanion |
| lifestyle-home-newcairo-villa | `comfortplus_lifestyle_newcairo-villa.webp` | New Cairo compound villa | ComfortPlus |
| lifestyle-home-marassi | `cozycompanion_lifestyle_marassi.webp` | Marassi apartment | CozyCompanion |
| lifestyle-home-katameya | `complete-set_lifestyle_katameya-villa.webp` | Katameya Heights villa | Complete Set |
| lifestyle-home-zamalek-penthouse | `worknest_lifestyle_zamalek-penthouse.webp` | Zamalek Nile-view penthouse | WorkNest |
| lifestyle-hotel-suite | `relaxmax_lifestyle_hotel-suite.webp` | Boutique hotel suite | RelaxMax |
| lifestyle-hotel-vacation | `diva_lifestyle_vacation-rental.webp` | Sahel vacation rental | Diva |
| lifestyle-hotel-lobby | `spacesaver_lifestyle_hotel-lobby.webp` | Hotel lobby | SpaceSaver |
| lifestyle-hotel-northcoast | `relaxmax_lifestyle_northcoast-hacienda.webp` | North Coast Hacienda villa | RelaxMax |
| lifestyle-hotel-sokhna | `diva_lifestyle_sokhna-terrace.webp` | Ain Sokhna chalet terrace | Diva |
| lifestyle-hotel-gouna | `spacesaver_lifestyle_gouna-hotel.webp` | El Gouna boutique hotel | SpaceSaver |
| lifestyle-hotel-fourseasons | `relaxmax-limited_lifestyle_fivestar-suite.webp` | Four Seasons style suite | RelaxMax Limited |
| lifestyle-office-executive | `worknest_lifestyle_ceo-suite.webp` | CEO executive suite | WorkNest |
| lifestyle-office-sodic | `worknest_lifestyle_sodic-office.webp` | SODIC office | WorkNest |
| lifestyle-office-reception | `easyup-standard_lifestyle_reception.webp` | Professional reception | EasyUp Standard |

---

## 7. Testing Capabilities

Manus can perform the following tests against the live site:

| Test | How |
|------|-----|
| **Image readiness** | `GET` the manage-images endpoint, verify all filenames exist |
| **Speed test** | Fetch published URL, measure load times, run Lighthouse via headless browser |
| **Visual QA** | Screenshot published site, compare against design spec |
| **Broken image check** | Scan page for 404 image responses |
| **Mobile responsiveness** | Screenshot at 390×844 and 1920×1080 viewports |

### Published URLs

- **Live site:** https://dandle-earned-luxury.lovable.app
- **Preview (dev):** https://id-preview--e9672d8a-f84c-4786-ad81-3938214a9d25.lovable.app

---

## 8. Workflow: Who Does What

| Task | Handler |
|------|---------|
| Generate / edit images | **Manus.ai** via Cloud API |
| Upload images to storage | **Manus.ai** via `POST` to manage-images |
| Code changes (layout, components, new features) | **Lovable.dev** (relay request to owner) |
| Design system / color palette changes | **Lovable.dev** |
| Image readiness checks, speed tests, visual QA | **Manus.ai** |
| Any owner-requested changes | Owner relays to appropriate handler |

---

## 9. Important Notes

1. **Format:** ALL new images MUST be `.webp` format
2. **Naming:** Use exact filenames from this guide — the site resolves them automatically
3. **Size:** Keep under 2 MB per image for optimal CDN performance
4. **Cache:** Changes appear within seconds; if stale, append `?t=timestamp` to force refresh
5. **No auth needed:** The API is open access for image management
6. **Code changes:** Cannot be made via the image API — relay to Lovable.dev through the owner
