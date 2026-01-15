/**
 * Maps each product to available color variants with actual product images
 * Keys match the palette keys from palette.ts
 * Images served from Supabase Storage (product-images bucket)
 */

const STORAGE_BASE = 'https://rbvbrxjnhmgrtxvwusxr.supabase.co/storage/v1/object/public/product-images';

export type ColorVariant = {
  swatchKey: string;
  imageSrc: string;
};

// Product-specific color variants with Supabase Storage URLs
export const productColorImages: Record<string, ColorVariant[]> = {
  'relaxmax': [
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-alexandria-linen.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-mocha-taupe.webp` },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-nile-sapphire.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-desert-grey.webp` },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-coastal-fog.webp` },
    { swatchKey: 'desert-sage', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-desert-sage.webp` },
    { swatchKey: 'nile-mist', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-nile-mist.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-giza-gold.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/relaxmax/relaxmax-oasis-green.webp` },
  ],
  'diva': [
    // DIVA: Sapphire Blue, Amber Sand, Desert Grey, Terracotta, Giza Gold, Alexandria Linen
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/diva/diva-nile-sapphire.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/diva/diva-amber-sand.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/diva/diva-desert-grey.webp` },
    { swatchKey: 'nile-mist', imageSrc: `${STORAGE_BASE}/diva/diva-nile-mist.webp` }, // Terracotta
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/diva/diva-giza-gold.webp` },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/diva/diva-alexandria-linen.webp` },
  ],
  'cozycompanion': [
    // COZYCOMPANION: Mocha Taupe, Sandstorm Ochre, Clay Pottery, Papyrus Stripe, Oasis Green, Amber Sand
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-mocha-taupe.webp` },
    { swatchKey: 'sandstorm-ochre', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-sandstorm-ochre.webp` },
    { swatchKey: 'clay-pottery', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-clay-pottery.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-papyrus-stripe.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-oasis-green.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/cozycompanion/cozycompanion-amber-sand.webp` },
  ],
  'comfortplus': [
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-alexandria-linen.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-desert-grey.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-mocha-taupe.webp` },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-coastal-fog.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-amber-sand.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-papyrus-stripe.webp` },
    { swatchKey: 'clay-pottery', imageSrc: `${STORAGE_BASE}/comfortplus/comfortplus-clay-pottery.webp` },
  ],
  'easyup': [
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/easyup/easyup-alexandria-linen.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/easyup/easyup-desert-grey.webp` },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/easyup/easyup-coastal-fog.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/easyup/easyup-mocha-taupe.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/easyup/easyup-oasis-green.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/easyup/easyup-amber-sand.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/easyup/easyup-papyrus-stripe.webp` },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/easyup/easyup-nile-sapphire.webp` },
  ],
  'easyup-compact': [
    // Limited to 3 colors only: Navy Blue, Stone Grey, Espresso Brown
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/easyup-compact/easyup-compact-nile-sapphire.webp` },
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/easyup-compact/easyup-compact-desert-grey.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/easyup-compact/easyup-compact-mocha-taupe.webp` },
  ],
  'worknest': [
    // WORKNEST: Desert Grey, Coastal Fog, Desert Sage, Blue Nile, Mocha Taupe, Alexandria Linen
    { swatchKey: 'desert-grey', imageSrc: `${STORAGE_BASE}/worknest/worknest-desert-grey.webp` },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/worknest/worknest-coastal-fog.webp` },
    { swatchKey: 'desert-sage', imageSrc: `${STORAGE_BASE}/worknest/worknest-desert-sage.webp` },
    { swatchKey: 'blue-nile-denim', imageSrc: `${STORAGE_BASE}/worknest/worknest-blue-nile-denim.webp` },
    { swatchKey: 'mocha-taupe', imageSrc: `${STORAGE_BASE}/worknest/worknest-mocha-taupe.webp` },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/worknest/worknest-alexandria-linen.webp` },
  ],
  'spacesaver': [
    { swatchKey: 'nile-mist', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-nile-mist.webp` },
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-alexandria-linen.webp` },
    { swatchKey: 'desert-sage', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-desert-sage.webp` },
    { swatchKey: 'papyrus-stripe', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-papyrus-stripe.webp` },
    { swatchKey: 'amber-sand', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-amber-sand.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-giza-gold.webp` },
    { swatchKey: 'sandstorm-ochre', imageSrc: `${STORAGE_BASE}/spacesaver/spacesaver-sandstorm-ochre.webp` },
  ],
  'complete-set': [
    // COMPLETE SET: Alexandria Linen, Coastal Fog, Nile Sapphire, Oasis Green, Giza Gold, Blue Nile
    { swatchKey: 'alexandria-linen', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-alexandria-linen.webp` },
    { swatchKey: 'coastal-fog', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-coastal-fog.webp` },
    { swatchKey: 'nile-sapphire', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-nile-sapphire.webp` },
    { swatchKey: 'oasis-green', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-oasis-green.webp` },
    { swatchKey: 'giza-gold', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-giza-gold.webp` },
    { swatchKey: 'blue-nile-denim', imageSrc: `${STORAGE_BASE}/complete-set/complete-set-blue-nile-denim.webp` },
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
