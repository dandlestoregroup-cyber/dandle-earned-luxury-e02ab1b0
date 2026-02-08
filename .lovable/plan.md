

# Cloud Image Storage Migration

## What This Does
Moves all ~120 product images from the bundled `public/images/` folder to Lovable Cloud file storage, served via CDN. This makes the site load faster (especially on Egyptian 4G), reduces the app bundle size, and gives you a single place to manage images.

## How It Works

1. **Upload Edge Function** -- A new backend function that takes images from `public/images/` and uploads them to the existing `product-images` storage bucket under an `images/` prefix. This is a one-time migration tool you trigger from an admin page.

2. **Image URL Helper** -- A single utility (`src/lib/imageUrl.ts`) that converts any local path like `/images/relaxmax-hero.webp` into its CDN URL: `https://[cloud-url]/storage/v1/object/public/product-images/images/relaxmax-hero.webp`. Every image reference in the app flows through this function.

3. **Update All Image Data Files** -- The three data files that hold image paths (`productImageData.ts`, `productColorImages.ts`, `siteImageManifest.ts`) will import and use the URL helper instead of raw `/images/...` strings.

4. **OptimizedImage Upgrade** -- The existing image component already supports cloud storage `srcset` with width/quality parameters. Once URLs point to cloud storage, responsive resizing works automatically -- no code change needed there.

5. **Admin Upload Page** -- A simple page at `/admin/upload-images` that lists all images in `public/images/`, lets you upload them in bulk to cloud storage, and shows upload progress. After migration, the local files can be removed from the repo to shrink it.

## Execution Order

| Step | What | Files |
|------|-------|-------|
| 1 | Create the image URL helper | `src/lib/imageUrl.ts` |
| 2 | Create the bulk-upload edge function | `supabase/functions/upload-images/index.ts` |
| 3 | Create admin upload page | `src/pages/admin/UploadImages.tsx` |
| 4 | Wire admin route | `src/App.tsx` |
| 5 | Update `productImageData.ts` to use CDN URLs | `src/data/productImageData.ts` |
| 6 | Update `productColorImages.ts` to use CDN URLs | `src/data/productColorImages.ts` |
| 7 | Update `siteImageResolver.ts` to use the helper | `src/utils/siteImageResolver.ts` |
| 8 | Update hero fallback images in `useResponsiveImage.ts` | `src/hooks/useResponsiveImage.ts` |

## Technical Details

**`src/lib/imageUrl.ts`** -- Core helper:
```typescript
const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images`;

export function cdnUrl(localPath: string): string {
  // "/images/relaxmax-hero.webp" -> full CDN URL
  if (localPath.startsWith('/images/')) {
    return `${STORAGE_BASE}${localPath}`;
  }
  return localPath; // already absolute or other path
}
```

**Upload edge function** -- Reads a list of filenames posted to it, fetches each from the app's public URL, and uploads to the `product-images` bucket under the same path structure.

**Fallback strategy** -- The `cdnUrl` helper keeps working even if an image hasn't been uploaded yet, because the `product-images` bucket is already public. `OptimizedImage` already has error fallback to `placeholder.svg`.

## What Won't Change
- No catalogue data, pricing, or business logic touched
- No changes to the image composition rules or L-bracket system
- The existing AI image generation pipeline continues to write to the same bucket
- PWA precache config stays as-is (will cache CDN URLs instead)

