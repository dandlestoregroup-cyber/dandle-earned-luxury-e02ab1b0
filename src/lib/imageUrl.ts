/**
 * CDN Image URL Helper
 * 
 * Converts local /images/ paths to Supabase Storage CDN URLs.
 * Single source of truth for image URL resolution.
 */

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images`;

const CACHE_BUST_KEY = "dandle_image_busts";

/** Get stored cache-bust timestamps */
function getCacheBusts(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(CACHE_BUST_KEY) || "{}");
  } catch { return {}; }
}

/** Mark a path as updated so all pages append a cache buster */
export function markImageUpdated(storagePath: string) {
  const busts = getCacheBusts();
  busts[storagePath] = Date.now();
  localStorage.setItem(CACHE_BUST_KEY, JSON.stringify(busts));
}

/**
 * Convert a local image path to its CDN URL.
 * Paths starting with /images/ are rewritten to the cloud storage bucket.
 * Appends cache-buster for recently updated images.
 */
export function cdnUrl(localPath: string): string {
  if (localPath.startsWith('/images/')) {
    const busts = getCacheBusts();
    const t = busts[localPath];
    const suffix = t ? `?t=${t}` : "";
    return `${STORAGE_BASE}${localPath}${suffix}`;
  }
  return localPath;
}

/**
 * Get the storage base URL for direct use (e.g. in manifests)
 */
export function getStorageBase(): string {
  return STORAGE_BASE;
}
