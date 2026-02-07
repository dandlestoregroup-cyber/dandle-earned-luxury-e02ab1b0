/**
 * Maps each product to available color variants with actual product images
 * Keys match the palette keys from palette.ts
 */

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants with new surgical i2i images
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'cognac-leather', imageSrc: '/images/relaxmax-primary-cognac.webp' },
    { swatchKey: 'alexandria-linen', imageSrc: '/images/relaxmax-alexandria-linen.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/relaxmax-mocha-taupe.webp' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/relaxmax-coastal-fog.webp' },
  ],
  'relaxmax-limited': [
    { swatchKey: 'camel-leather', imageSrc: '/images/dandle-relaxmax-limited-hero.webp' },
  ],
  'spacesaver': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/spacesaver-primary-linen.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/spacesaver-mocha-taupe.webp' },
    { swatchKey: 'desert-grey', imageSrc: '/images/spacesaver-desert-grey.webp' },
  ],
  'diva': [
    { swatchKey: 'terracotta', imageSrc: '/images/diva-primary-terracotta.webp' },
    { swatchKey: 'giza-gold', imageSrc: '/images/diva-giza-gold.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/diva-oasis-green.webp' },
  ],
  'worknest': [
    { swatchKey: 'oasis-green', imageSrc: '/images/worknest-primary-green.webp' },
    { swatchKey: 'blue-nile-denim', imageSrc: '/images/worknest-blue-nile.webp' },
    { swatchKey: 'desert-grey', imageSrc: '/images/worknest-desert-grey.webp' },
  ],
  'cozycompanion': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/cozycompanion-lifestyle-elder.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/dandle-cozycompanion-hero.webp' },
  ],
  'complete-set': [
    { swatchKey: 'family-modern', imageSrc: '/images/dandle-complete-set-hero.webp' },
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
