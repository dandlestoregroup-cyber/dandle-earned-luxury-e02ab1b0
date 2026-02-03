/* Product image data with new uploaded hero images */

import { generationManifest } from './imageGenerationManifest';

// Build generated images by product
const generatedByProduct: Record<string, string[]> = {};
for (const entry of generationManifest) {
  const url = `/images/generated/${entry.outputFileName}`;
  (generatedByProduct[entry.productKey] ||= []).push(url);
}

export const productImageData: Record<string, { mainImage: string; galleryImages: string[] }> = {
  'relaxmax': {
    mainImage: '/images/dandle-relaxmax-hero.webp',
    galleryImages: [
      '/images/relaxmax-hero-offwhite.jpg',
      '/images/relaxmax-brown-lifestyle.jpg',
      '/images/relaxmax-lifestyle-day.png',
      '/images/relaxmax-lifestyle-night.png',
      '/images/relaxmax-mocha-taupe.webp',
      '/images/relaxmax-coastal-fog.webp',
      ...(generatedByProduct['relaxmax'] || []),
    ],
  },
  'relaxmax-limited': {
    mainImage: '/images/dandle-relaxmax-limited-hero.webp',
    galleryImages: [
      ...(generatedByProduct['relaxmax-limited'] || []),
    ],
  },
  'spacesaver': {
    mainImage: '/images/dandle-spacesaver-hero.webp',
    galleryImages: [
      '/images/spacesaver-offwhite-reclined.jpg',
      '/images/spacesaver-offwhite-side.jpg',
      '/images/spacesaver-desert-grey.webp',
      '/images/spacesaver-desert-grey-reclined.webp',
      '/images/spacesaver-mocha-taupe.webp',
      '/images/spacesaver-terracotta-reclined.webp',
      '/images/spacesaver-mocha-taupe-reclined.webp',
      ...(generatedByProduct['spacesaver'] || []),
    ],
  },
  'comfortplus': {
    mainImage: '/images/dandle-comfortplus.jpg',
    galleryImages: [
      '/images/comfortplus-coastal-fog-lifestyle.webp',
      ...(generatedByProduct['comfortplus'] || []),
    ],
  },
  'diva': {
    mainImage: '/images/dandle-diva-hero.webp',
    galleryImages: [
      '/images/diva-red-front.jpg',
      '/images/diva-terracotta-reclined.webp',
      '/images/diva-desert-sage-green.webp',
      '/images/diva-giza-gold.webp',
      '/images/diva-oasis-green.webp',
      ...(generatedByProduct['diva'] || []),
    ],
  },
  'cozycompanion': {
    mainImage: '/images/dandle-cozycompanion-hero.webp',
    galleryImages: [
      '/images/cozycompanion-beige-front.jpg',
      '/images/cozycompanion-yellow-front.jpg',
      '/images/cozycompanion-couple-lifestyle.jpg',
      '/images/cozycompanion-couple-lifestyle.webp',
      '/images/cozycompanion-mocha-taupe.webp',
      '/images/cozycompanion-coastal-fog.webp',
      '/images/cozycompanion-mocha-taupe-2.webp',
      '/images/cozycompanion-couple-lifestyle-2.webp',
      ...(generatedByProduct['cozycompanion'] || []),
    ],
  },
  'worknest': {
    mainImage: '/images/dandle-worknest-hero.webp',
    galleryImages: [
      '/images/worknest-blue-front.webp',
      '/images/worknest-oasis-green.webp',
      '/images/worknest-desert-grey-reclined.webp',
      '/images/worknest-oasis-green-lifestyle.webp',
      '/images/worknest-desert-grey-reclined-2.webp',
      ...(generatedByProduct['worknest'] || []),
    ],
  },
  'easyup': {
    mainImage: '/images/dandle-easyup-standard-hero.jpg',
    galleryImages: [
      '/images/easyup-beige-front.jpg',
      '/images/easyup-beige-lifted.jpg',
      '/images/easyup-standard-grey-front.webp',
      '/images/easyup-standard-coastal-fog.webp',
      '/images/easyup-standard-oasis-green.webp',
      '/images/easyup-standard-mocha-taupe.webp',
      '/images/easyup-standard-mocha-taupe-lifted.webp',
      '/images/easyup-lift-assist-lifestyle.webp',
      '/images/easyup-lift-assist-lifestyle-2.webp',
      ...(generatedByProduct['easyup'] || []),
    ],
  },
  'easyup-compact': {
    mainImage: '/images/dandle-easyup-compact-hero.webp',
    galleryImages: [
      '/images/easyup-compact-charcoal-front.jpg',
      '/images/easyup-compact-charcoal-reclined.png',
      '/images/easyup-compact-charcoal-side.png',
      '/images/easyup-compact-grey-front.webp',
      '/images/easyup-compact-oasis-green.webp',
      '/images/easyup-compact-oasis-green-2.webp',
      ...(generatedByProduct['easyup-compact'] || []),
    ],
  },
  'complete-set': {
    mainImage: '/images/dandle-complete-set-hero.webp',
    galleryImages: [
      '/images/complete-set-classic.jpg',
      '/images/complete-set-coastal-modern.jpg',
      '/images/complete-set-family-modern.jpg',
      '/images/complete-set-modern-fireplace.jpg',
      '/images/complete-set-sunset-fireplace.jpg',
      ...(generatedByProduct['complete-set'] || []),
    ],
  },
};
