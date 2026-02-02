/**
 * Maps each product to available color variants with actual product images
 * Keys match the palette keys from palette.ts
 * Uses local images from public/images/ only
 */

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants with local paths only
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/relaxmax-hero-offwhite.jpg' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/relaxmax-mocha-taupe.webp' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/relaxmax-coastal-fog.webp' },
  ],
  'diva': [
    { swatchKey: 'desert-sage', imageSrc: '/images/diva-desert-sage-green.webp' },
    { swatchKey: 'terracotta', imageSrc: '/images/diva-terracotta-reclined.webp' },
    { swatchKey: 'giza-gold', imageSrc: '/images/diva-giza-gold.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/diva-oasis-green.webp' },
    { swatchKey: 'red', imageSrc: '/images/diva-red-front.jpg' },
  ],
  'cozycompanion': [
    { swatchKey: 'mocha-taupe', imageSrc: '/images/cozycompanion-mocha-taupe.webp' },
    { swatchKey: 'sandstorm-ochre', imageSrc: '/images/cozycompanion-yellow-front.jpg' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/cozycompanion-coastal-fog.webp' },
    { swatchKey: 'couple-lifestyle', imageSrc: '/images/cozycompanion-couple-lifestyle.webp' },
  ],
  'comfortplus': [
    { swatchKey: 'coastal-fog', imageSrc: '/images/comfortplus-coastal-fog-lifestyle.webp' },
    { swatchKey: 'tan', imageSrc: '/images/comfortplus-tan-front.webp' },
  ],
  'easyup': [
    { swatchKey: 'coastal-fog', imageSrc: '/images/easyup-standard-coastal-fog.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/easyup-standard-mocha-taupe.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-standard-oasis-green.webp' },
    { swatchKey: 'grey', imageSrc: '/images/easyup-standard-grey-front.webp' },
    { swatchKey: 'beige', imageSrc: '/images/easyup-beige-front.jpg' },
  ],
  'easyup-compact': [
    { swatchKey: 'grey', imageSrc: '/images/easyup-compact-grey-front.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-compact-oasis-green.webp' },
    { swatchKey: 'charcoal', imageSrc: '/images/easyup-compact-charcoal-front.jpg' },
  ],
  'worknest': [
    { swatchKey: 'desert-grey', imageSrc: '/images/worknest-desert-grey-reclined.webp' },
    { swatchKey: 'blue-nile-denim', imageSrc: '/images/worknest-blue-front.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/worknest-oasis-green.webp' },
  ],
  'spacesaver': [
    { swatchKey: 'desert-grey', imageSrc: '/images/spacesaver-desert-grey.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/spacesaver-mocha-taupe.webp' },
    { swatchKey: 'terracotta', imageSrc: '/images/spacesaver-terracotta-reclined.webp' },
    { swatchKey: 'red', imageSrc: '/images/spacesaver-red-front.webp' },
    { swatchKey: 'offwhite', imageSrc: '/images/spacesaver-offwhite-reclined.jpg' },
  ],
  'complete-set': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/complete-set-classic.jpg' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/complete-set-coastal-modern.jpg' },
    { swatchKey: 'family-modern', imageSrc: '/images/complete-set-family-modern.jpg' },
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
