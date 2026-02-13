

## Fix: Hero Video Poster Flash + Broken OMASH Partner Image

### Issues Found

1. **Video poster flash**: The `<video>` element still has `poster="/dandle-og-image.jpg"` (line 101 in `HeroVideo.tsx`), which shows a static ornate-door image for 1-2 seconds before the video starts playing. The parent already has a black background, so removing the poster gives a clean cinematic start.

2. **OMASH partner image broken**: The OMASH card shows a blank white rectangle because the image path `/images/dandle-omash-partnership.webp` is routed through `cdnUrl()` which rewrites it to Supabase storage -- but the file likely doesn't exist there. The actual file exists locally at `public/images/dandle-omash-partnership.webp`. Fix: use the local path directly instead of the CDN rewrite.

3. **Nav obstruction**: Already resolved in a previous change (TrustBar moved after Hero). Confirmed working.

---

### Changes

**File 1: `src/components/hero/HeroVideo.tsx`**
- Remove `poster="/dandle-og-image.jpg"` from the `<video>` tag (line 101)
- The solid black background from the parent container provides the pre-video state

**File 2: `src/components/Partners.tsx`**
- Change the OMASH image from `cdnUrl(IMAGES.PARTNER_OMASH)` to the direct local path `"/images/dandle-omash-partnership.webp"` so the image loads from `public/` instead of being routed to cloud storage where it doesn't exist
- Remove the unused `cdnUrl` and `IMAGES` imports if no longer needed

---

### Why This Works
- Removing the poster eliminates the flash -- users see black, then the video fades in
- Using the local path for the OMASH image bypasses the CDN rewrite that points to a non-existent storage file
- Both are single-line fixes with no side effects

