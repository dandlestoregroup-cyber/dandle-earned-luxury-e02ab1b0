/**
 * Maps each product to available color variants with actual product images
 * Keys match the palette keys from palette.ts
 * Mix of local images (public/images/) and Supabase Storage URLs
 */

const STORAGE_BASE = 'https://rbvbrxjnhmgrtxvwusxr.supabase.co/storage/v1/object/public/product-images';

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants with local paths and Supabase Storage URLs
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/relaxmax-hero-offwhite.jpg' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/relaxmax-mocha-taupe.webp' },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-nile-sapphire.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-desert-grey.webp` },
    { swatchKey: 'coastal-fog', imageSrc: '/images/relaxmax-coastal-fog.webp' },
    { swatchKey: 'desert-sage', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-desert-sage.webp` },
    { swatchKey: 'nile-mist', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-nile-mist.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-giza-gold.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-oasis-green.webp` },
  ],
  'diva': [
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/diva/diva-nile-sapphire.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/diva/diva-amber-sand.webp` },
    { swatchKey: 'desert-grey', imageSrc: '/images/diva-desert-sage-green.webp' },
    { swatchKey: 'nile-mist', imageSrc: '/images/diva-terracotta-reclined.webp' },
    { swatchKey: 'giza-gold', imageSrc: '/images/diva-giza-gold.webp' },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/diva/diva-alexandria-linen.webp` },
    { swatchKey: 'oasis-green', imageSrc: '/images/diva-oasis-green.webp' },
  ],
  'cozycompanion': [
    { swatchKey: 'mocha-taupe', imageSrc: '/images/cozycompanion-mocha-taupe.webp' },
    { swatchKey: 'sandstorm-ochre', imageSrc: '/images/cozycompanion-yellow-front.jpg' },
    { swatchKey: 'clay-pottery', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-clay-pottery.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-papyrus-stripe.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-oasis-green.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-amber-sand.webp` },
    { swatchKey: 'coastal-fog', imageSrc: '/images/cozycompanion-coastal-fog.webp' },
  ],
  'comfortplus': [
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-alexandria-linen.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-desert-grey.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-mocha-taupe.webp` },
    { swatchKey: 'coastal-fog', imageSrc: '/images/comfortplus-coastal-fog-lifestyle.webp' },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-amber-sand.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-papyrus-stripe.webp` },
    { swatchKey: 'clay-pottery', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-clay-pottery.webp` },
    { swatchKey: 'tan', imageSrc: '/images/comfortplus-tan-front.webp' },
  ],
  'easyup': [
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/easyup/easyup-alexandria-linen.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/easyup/easyup-desert-grey.webp` },
    { swatchKey: 'coastal-fog', imageSrc: '/images/easyup-standard-coastal-fog.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/easyup-standard-mocha-taupe.webp' },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-standard-oasis-green.webp' },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/easyup/easyup-amber-sand.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/easyup/easyup-papyrus-stripe.webp` },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/easyup/easyup-nile-sapphire.webp` },
  ],
  'easyup-compact': [
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/easyup-compact/easyup-compact-nile-sapphire.webp` },
    { swatchKey: 'desert-grey', imageSrc: '/images/easyup-compact-grey-front.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/easyup-compact/easyup-compact-mocha-taupe.webp` },
    { swatchKey: 'oasis-green', imageSrc: '/images/easyup-compact-oasis-green.webp' },
    { swatchKey: 'charcoal', imageSrc: '/images/easyup-compact-charcoal-front.jpg' },
  ],
  'worknest': [
    { swatchKey: 'desert-grey', imageSrc: '/images/worknest-desert-grey-reclined.webp' },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/worknest/worknest-coastal-fog.webp` },
    { swatchKey: 'desert-sage', imageSrc: `${STORAGE_BASE}/worknest/worknest-desert-sage.webp` },
    { swatchKey: 'blue-nile-denim', imageSrc: '/images/worknest-blue-front.webp' },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/worknest/worknest-mocha-taupe.webp` },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/worknest/worknest-alexandria-linen.webp` },
    { swatchKey: 'oasis-green', imageSrc: '/images/worknest-oasis-green.webp' },
  ],
  'spacesaver': [
    { swatchKey: 'nile-mist', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-nile-mist.webp` },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-alexandria-linen.webp` },
    { swatchKey: 'desert-sage', imageSrc: '/images/spacesaver-desert-grey.webp' },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-papyrus-stripe.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-amber-sand.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-giza-gold.webp` },
    { swatchKey: 'sandstorm-ochre', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-sandstorm-ochre.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: '/images/spacesaver-mocha-taupe.webp' },
    { swatchKey: 'terracotta', imageSrc: '/images/spacesaver-terracotta-reclined.webp' },
    { swatchKey: 'red', imageSrc: '/images/spacesaver-red-front.webp' },
  ],
  'complete-set': [
    { swatchKey: 'alexandria-linen', imageSrc: '/images/complete-set-classic.jpg' },
    { swatchKey: 'coastal-fog', imageSrc: '/images/complete-set-coastal-modern.jpg' },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-nile-sapphire.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-oasis-green.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-giza-gold.webp` },
    { swatchKey: 'blue-nile-denim', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-blue-nile-denim.webp` },
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
