/**
 * CDN Image URL Helper
 * 
 * Converts local /images/ paths to Supabase Storage CDN URLs.
 * Single source of truth for image URL resolution.
 */

const STORAGE_BASE = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/product-images`;

/**
 * Convert a local image path to its CDN URL.
 * Paths starting with /images/ are rewritten to the cloud storage bucket.
 * All other paths (absolute URLs, /placeholder.svg, etc.) are returned as-is.
 */
export function cdnUrl(localPath: string): string {
  if (localPath.startsWith('/images/')) {
    return `${STORAGE_BASE}${localPath}`;
  }
  return localPath;
}

/**
 * Get the storage base URL for direct use (e.g. in manifests)
 */
export function getStorageBase(): string {
  return STORAGE_BASE;
}
