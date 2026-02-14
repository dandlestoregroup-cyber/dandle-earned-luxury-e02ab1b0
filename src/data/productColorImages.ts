/**
 * Maps each product to available color variants with actual product images
 * Uses local /images/ paths (public folder) for reliability
 */

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants — local paths from public/images/
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'cognac-leather', imageSrc: '/images/relaxmax-primary-cognac.webp' },
    { swatchKey: 'alexandria-linen', imageSrc: '/images/relaxmax-alexandria-linen-variant.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/relaxmax-mocha-taupe-variant.webp' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/relaxmax-coastal-fog.webp' },
  ],
  'relaxmax-limited': [
    { swatchKey: 'camel-leather', imageSrc: '/images/dandle-relaxmax-limited-camel-leather-hero.jpg' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/relaxmax-limited-mocha-taupe.webp' },
  ],
  'spacesaver': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/spacesaver-primary-linen.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/spacesaver-mocha-taupe-variant.webp' },
    { swatchKey: 'desert-grey', imageSrc: '/images/spacesaver-desert-grey.webp' },
    { swatchKey: 'terracotta', imageSrc: '/images/spacesaver-terracotta-reclined-variant.webp' },
    { swatchKey: 'offwhite', imageSrc: '/images/spacesaver-primary.webp' },
  ],
  'comfortplus': [
    { swatchKey: 'tan', imageSrc: '/images/comfortplus-tan-lifestyle.webp' },
  ],
  'diva': [
    { swatchKey: 'terracotta', imageSrc: '/images/diva-primary-terracotta.webp' },
    { swatchKey: 'giza-gold', imageSrc: '/images/diva-giza-gold-variant.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/diva-oasis-green-reclined.webp' },
    { swatchKey: 'desert-sage', imageSrc: '/images/diva-desert-sage-variant.webp' },
  ],
  'worknest': [
    { swatchKey: 'oasis-green', imageSrc: '/images/worknest-primary-green.webp' },
    { swatchKey: 'blue-nile-denim', imageSrc: '/images/worknest-blue-nile.webp' },
    { swatchKey: 'desert-grey', imageSrc: '/images/worknest-desert-grey-variant.webp' },
  ],
  'easyup': [
    { swatchKey: 'grey', imageSrc: '/images/easyup-standard-grey-pregnant.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-standard-oasis-green-variant.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/easyup-standard-mocha-taupe.webp' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/easyup-standard-coastal-fog.webp' },
  ],
  'easyup-compact': [
    { swatchKey: 'charcoal', imageSrc: '/images/easyup-compact-charcoal-front.jpg' },
    { swatchKey: 'grey', imageSrc: '/images/easyup-compact-grey-front.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-compact-oasis-green.webp' },
  ],
  'cozycompanion': [
    { swatchKey: 'mocha-taupe', imageSrc: '/images/cozycompanion-mocha-taupe-front.webp' },
    { swatchKey: 'alexandria-linen', imageSrc: '/images/cozycompanion-lifestyle-elder.webp' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/cozycompanion-coastal-fog.webp' },
  ],
  'complete-set': [
    { swatchKey: 'family-modern', imageSrc: '/images/complete-set-final.webp' },
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
