
# AI Hero Image Regeneration for Consistent Sizing

Regenerate all 9 product hero images using AI (image-to-image) to produce consistent 1024x1024 square images, except the Complete Set which stays landscape (1920x1080).

## What This Does

Takes each current hero image, sends it through AI image generation to produce a clean, consistently-sized version:
- **9 single-chair products**: 1024x1024 (1:1 square) -- white/neutral background, centered chair, consistent framing
- **Complete Set**: 1920x1080 (16:9 landscape) -- room scene with full 3-piece arrangement

This ensures every product card on the homepage grid looks uniform and professional.

## How It Works

1. **New admin page** at `/admin/regenerate-heroes` with a simple UI showing all 10 products
2. For each product, click "Generate" to:
   - Fetch the current hero image from storage
   - Convert to base64 and send to the existing `generate-site-image` backend function
   - AI reframes the chair into the exact target dimensions with consistent styling
   - Uploads result back to storage, overwriting the current hero image
3. "Generate All" button to batch-process all 10 sequentially

## Products and Target Output

| Product | Current Hero Filename | Target Size | Prompt Summary |
|---------|----------------------|-------------|----------------|
| RelaxMax | `dandle-relaxmax-hero.webp` | 1024x1024 | Off-white recliner, pure white bg, 45deg LEFT, centered |
| RelaxMax Limited | `dandle-relaxmax-limited-hero.webp` | 1024x1024 | Camel leather, swivel base, white bg, 45deg LEFT |
| SpaceSaver | `dandle-spacesaver-hero.webp` | 1024x1024 | Linen SpaceSaver, compact, white bg, 45deg LEFT |
| Diva | `dandle-diva-hero.webp` | 1024x1024 | Desert Sage, white bg, 45deg LEFT |
| ComfortPlus | `comfortplus-hero-new.jpg` | 1024x1024 | Red chair, white bg, 45deg LEFT |
| CozyCompanion | `cozycompanion-hero-new.jpg` | 1024x1024 | Mother-daughter lifestyle, consistent crop |
| WorkNest | `dandle-worknest-hero.webp` | 1024x1024 | Oasis Green, laptop tray, white bg, 45deg LEFT |
| EasyUp Standard | `dandle-easyup-standard-hero.jpg` | 1024x1024 | Mocha Taupe, lift base, white bg, 45deg LEFT |
| EasyUp Compact | `dandle-easyup-compact-hero.webp` | 1024x1024 | Coastal Fog, compact, white bg, 45deg LEFT |
| Complete Set | `dandle-complete-set-hero.webp` | 1920x1080 | 3-piece arrangement, warm room, landscape |

## Technical Details

### Files to Create/Modify

| File | Change |
|------|--------|
| `src/pages/admin/RegenerateHeroes.tsx` | New admin page with generate UI |
| `src/App.tsx` | Add route `/admin/regenerate-heroes` |

### How the Generation Works

- Reuses the existing `generate-site-image` backend function (already deployed, handles AI calls and storage upload)
- Each hero image is fetched client-side, converted to base64, sent to the function with a standardized prompt
- The function calls the AI gateway (Gemini Flash Image model) for image-to-image transformation
- Result is uploaded to `product-images/images/{filename}` with `upsert: true`, replacing the current hero
- No changes to product data files needed -- same filenames are reused

### Admin Page UI

- Grid of 10 product cards showing current hero thumbnail
- Each card has: product name, current image preview, dimensions badge, "Generate" button
- Top bar: "Generate All" button, progress indicator
- After generation: before/after comparison, success/error status
- Rate limiting: 3-second delay between batch generations to avoid 429 errors

### Prompt Template (for square heroes)

```text
Reframe this Dandle recliner into a clean 1024x1024 product card image.
- Pure white background
- Chair occupies 55-65% of frame, perfectly centered
- 45-degree LEFT camera angle
- Preserve 100% of original chair design, color, and fabric texture
- Sharp focus, studio-quality lighting
- No props, no background elements
- Professional e-commerce product photography
```

### Prompt Template (for Complete Set landscape)

```text
Reframe this Dandle Complete Living Room Set into a 1920x1080 landscape image.
- 3-piece set (two recliners + loveseat) arranged cohesively
- Warm modern living room setting
- Golden hour lighting
- Chair designs must remain IDENTICAL to source
- Professional interior photography quality
```
