

## Fix: Remove poster image flash before hero video

### Problem
The video element has `poster="/dandle-og-image.jpg"` which shows a static image (ornate door with recliner) before the video starts playing. On mobile 4G, this creates a jarring few-second flash of an unrelated image before the cinematic video begins.

### Solution
Remove the `poster` attribute from the video element entirely. The parent container already has a solid black background (`#000`), so the user will see a clean black screen until the video loads and auto-plays -- which is the correct cinematic experience.

### Technical Details

**File: `src/components/hero/HeroVideo.tsx`**
- Remove `poster="/dandle-og-image.jpg"` from the `<video>` tag (line 101)
- The black background from the parent `HeroGiftingSeason` component already provides a clean pre-video state
- Video will still autoplay muted with `preload="auto"` for fastest possible start

This is a single-line change. No other files need modification.

