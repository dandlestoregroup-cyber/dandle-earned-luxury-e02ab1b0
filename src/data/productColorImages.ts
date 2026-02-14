/**
 * Maps each product to available color variants with actual product images
 * Keys match the palette keys from palette.ts
 */

import { cdnUrl } from '@/lib/imageUrl';

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants with new surgical i2i images
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'cognac-leather', imageSrc: cdnUrl('/images/relaxmax-primary-cognac.webp') },
    { swatchKey: 'alexandria-linen', imageSrc: cdnUrl('/images/relaxmax-alexandria-linen.webp') },
    { swatchKey: 'mocha-taupe', imageSrc: cdnUrl('/images/relaxmax-mocha-taupe.webp') },
    { swatchKey: 'coastal-fog', imageSrc: cdnUrl('/images/relaxmax-coastal-fog.webp') },
  ],
  'relaxmax-limited': [
    { swatchKey: 'camel-leather', imageSrc: cdnUrl('/images/dandle-relaxmax-limited-hero.webp') },
    { swatchKey: 'mocha-taupe', imageSrc: cdnUrl('/images/relaxmax-limited-mocha-taupe.webp') },
  ],
  'spacesaver': [
    { swatchKey: 'alexandria-linen', imageSrc: cdnUrl('/images/spacesaver-primary-linen.webp') },
    { swatchKey: 'mocha-taupe', imageSrc: cdnUrl('/images/spacesaver-mocha-taupe.webp') },
    { swatchKey: 'desert-grey', imageSrc: cdnUrl('/images/spacesaver-desert-grey.webp') },
    { swatchKey: 'terracotta', imageSrc: cdnUrl('/images/spacesaver-terracotta-reclined.webp') },
    { swatchKey: 'offwhite', imageSrc: cdnUrl('/images/spacesaver-primary.webp') },
  ],
  'comfortplus': [
    { swatchKey: 'tan', imageSrc: cdnUrl('/images/comfortplus-tan-lifestyle.webp') },
    { swatchKey: 'coastal-fog', imageSrc: cdnUrl('/images/comfortplus-coastal-fog-lifestyle.webp') },
  ],
  'diva': [
    { swatchKey: 'terracotta', imageSrc: cdnUrl('/images/diva-primary-terracotta.webp') },
    { swatchKey: 'giza-gold', imageSrc: cdnUrl('/images/diva-giza-gold.webp') },
    { swatchKey: 'oasis-green', imageSrc: cdnUrl('/images/diva-oasis-green-reclined.webp') },
    { swatchKey: 'desert-sage', imageSrc: cdnUrl('/images/diva-desert-sage-green.webp') },
  ],
  'worknest': [
    { swatchKey: 'oasis-green', imageSrc: cdnUrl('/images/worknest-primary-green.webp') },
    { swatchKey: 'blue-nile-denim', imageSrc: cdnUrl('/images/worknest-blue-nile.webp') },
    { swatchKey: 'desert-grey', imageSrc: cdnUrl('/images/worknest-desert-grey.webp') },
  ],
  'easyup': [
    { swatchKey: 'grey', imageSrc: cdnUrl('/images/easyup-standard-grey-pregnant.webp') },
    { swatchKey: 'oasis-green', imageSrc: cdnUrl('/images/easyup-standard-oasis-green.webp') },
    { swatchKey: 'mocha-taupe', imageSrc: cdnUrl('/images/easyup-standard-mocha-taupe.webp') },
    { swatchKey: 'coastal-fog', imageSrc: cdnUrl('/images/easyup-standard-coastal-fog.webp') },
  ],
  'easyup-compact': [
    { swatchKey: 'charcoal', imageSrc: cdnUrl('/images/easyup-compact-charcoal-front.jpg') },
    { swatchKey: 'grey', imageSrc: cdnUrl('/images/easyup-compact-grey-front.webp') },
    { swatchKey: 'oasis-green', imageSrc: cdnUrl('/images/easyup-compact-oasis-green.webp') },
  ],
  'cozycompanion': [
    { swatchKey: 'mocha-taupe', imageSrc: cdnUrl('/images/cozycompanion-mocha-taupe-front.webp') },
    { swatchKey: 'alexandria-linen', imageSrc: cdnUrl('/images/cozycompanion-lifestyle-elder.webp') },
    { swatchKey: 'coastal-fog', imageSrc: cdnUrl('/images/cozycompanion-coastal-fog.webp') },
  ],
  'complete-set': [
    { swatchKey: 'family-modern', imageSrc: cdnUrl('/images/complete-set-final.webp') },
  ],
};

// Helper to get image for a product + color combination
export function getProductColorImage(productId: string, swatchKey: string): string | null {
  const variants = productColorImages[productId];
  if (!variants) return null;
  const variant = variants.find(v => v.swatchKey === swatchKey);
  return variant?.imageSrc || null;
}

// Helper to get available swatch keys for a product
export function getProductSwatchKeys(productId: string): string[] {
  const variants = productColorImages[productId];
  return variants?.map(v => v.swatchKey) || [];
}

// Get first available image for a product (default hero)
export function getProductDefaultImage(productId: string): string | null {
  const variants = productColorImages[productId];
  return variants?.[0]?.imageSrc || null;
}
