/* Product image data with new uploaded hero images */

import { generationManifest } from './imageGenerationManifest';
import { cdnUrl } from '@/lib/imageUrl';

// Build generated images by product
const generatedByProduct: Record<string, string[]> = {};
for (const entry of generationManifest) {
  const url = `/images/generated/${entry.outputFileName}`;
  (generatedByProduct[entry.productKey] ||= []).push(url);
}

export const productImageData: Record<string, { mainImage: string; galleryImages: string[] }> = {
  'relaxmax': {
    mainImage: cdnUrl('/images/dandle-relaxmax-hero.webp'),
    galleryImages: [
      cdnUrl('/images/relaxmax-hero-offwhite.jpg'),
      cdnUrl('/images/relaxmax-cognac-side.png'),
      cdnUrl('/images/relaxmax-cognac-reclined.png'),
      cdnUrl('/images/relaxmax-linen-front.png'),
      cdnUrl('/images/relaxmax-linen-side.png'),
      cdnUrl('/images/relaxmax-lifestyle-muse.png'),
      cdnUrl('/images/relaxmax-brown-lifestyle.jpg'),
      cdnUrl('/images/relaxmax-lifestyle-day.png'),
      cdnUrl('/images/relaxmax-lifestyle-night.png'),
      cdnUrl('/images/relaxmax-mocha-taupe.webp'),
      cdnUrl('/images/relaxmax-coastal-fog.webp'),
      ...(generatedByProduct['relaxmax'] || []),
    ],
  },
  'relaxmax-limited': {
    mainImage: cdnUrl('/images/dandle-relaxmax-limited-hero.webp'),
    galleryImages: [
      ...(generatedByProduct['relaxmax-limited'] || []),
    ],
  },
  'spacesaver': {
    mainImage: cdnUrl('/images/dandle-spacesaver-hero.webp'),
    galleryImages: [
      cdnUrl('/images/spacesaver-offwhite-reclined.jpg'),
      cdnUrl('/images/spacesaver-offwhite-side.jpg'),
      cdnUrl('/images/spacesaver-desert-grey.webp'),
      cdnUrl('/images/spacesaver-desert-grey-reclined.webp'),
      cdnUrl('/images/spacesaver-mocha-taupe.webp'),
      cdnUrl('/images/spacesaver-terracotta-reclined.webp'),
      cdnUrl('/images/spacesaver-mocha-taupe-reclined.webp'),
      ...(generatedByProduct['spacesaver'] || []),
    ],
  },
  'comfortplus': {
    mainImage: cdnUrl('/images/comfortplus-hero-new.jpg'),
    galleryImages: [
      cdnUrl('/images/comfortplus-coastal-fog-lifestyle.webp'),
      ...(generatedByProduct['comfortplus'] || []),
    ],
  },
  'diva': {
    mainImage: cdnUrl('/images/dandle-diva-hero.webp'),
    galleryImages: [
      cdnUrl('/images/diva-red-front.jpg'),
      cdnUrl('/images/diva-terracotta-reclined.webp'),
      cdnUrl('/images/diva-desert-sage-green.webp'),
      cdnUrl('/images/diva-giza-gold.webp'),
      cdnUrl('/images/diva-oasis-green.webp'),
      ...(generatedByProduct['diva'] || []),
    ],
  },
  'cozycompanion': {
    mainImage: cdnUrl('/images/cozycompanion-hero-new.jpg'),
    galleryImages: [
      cdnUrl('/images/cozycompanion-lifestyle-muse.png'),
      cdnUrl('/images/cozycompanion-beige-front.jpg'),
      cdnUrl('/images/cozycompanion-yellow-front.jpg'),
      cdnUrl('/images/cozycompanion-couple-lifestyle.jpg'),
      cdnUrl('/images/cozycompanion-couple-lifestyle.webp'),
      cdnUrl('/images/cozycompanion-mocha-taupe.webp'),
      cdnUrl('/images/cozycompanion-coastal-fog.webp'),
      cdnUrl('/images/cozycompanion-mocha-taupe-2.webp'),
      cdnUrl('/images/cozycompanion-couple-lifestyle-2.webp'),
      ...(generatedByProduct['cozycompanion'] || []),
    ],
  },
  'worknest': {
    mainImage: cdnUrl('/images/dandle-worknest-hero.webp'),
    galleryImages: [
      cdnUrl('/images/worknest-blue-front.webp'),
      cdnUrl('/images/worknest-oasis-green.webp'),
      cdnUrl('/images/worknest-desert-grey-reclined.webp'),
      cdnUrl('/images/worknest-oasis-green-lifestyle.webp'),
      cdnUrl('/images/worknest-desert-grey-reclined-2.webp'),
      ...(generatedByProduct['worknest'] || []),
    ],
  },
  'easyup': {
    mainImage: cdnUrl('/images/dandle-easyup-standard-hero.jpg'),
    galleryImages: [
      cdnUrl('/images/easyup-beige-front.jpg'),
      cdnUrl('/images/easyup-beige-lifted.jpg'),
      cdnUrl('/images/easyup-standard-grey-front.webp'),
      cdnUrl('/images/easyup-standard-coastal-fog.webp'),
      cdnUrl('/images/easyup-standard-oasis-green.webp'),
      cdnUrl('/images/easyup-standard-mocha-taupe.webp'),
      cdnUrl('/images/easyup-standard-mocha-taupe-lifted.webp'),
      cdnUrl('/images/easyup-lift-assist-lifestyle.webp'),
      cdnUrl('/images/easyup-lift-assist-lifestyle-2.webp'),
      ...(generatedByProduct['easyup'] || []),
    ],
  },
  'easyup-compact': {
    mainImage: cdnUrl('/images/dandle-easyup-compact-hero.webp'),
    galleryImages: [
      cdnUrl('/images/easyup-compact-charcoal-front.jpg'),
      cdnUrl('/images/easyup-compact-charcoal-reclined.png'),
      cdnUrl('/images/easyup-compact-charcoal-side.png'),
      cdnUrl('/images/easyup-compact-grey-front.webp'),
      cdnUrl('/images/easyup-compact-oasis-green.webp'),
      cdnUrl('/images/easyup-compact-oasis-green-2.webp'),
      ...(generatedByProduct['easyup-compact'] || []),
    ],
  },
  'complete-set': {
    mainImage: cdnUrl('/images/dandle-complete-set-hero.webp'),
    galleryImages: [
      cdnUrl('/images/complete-set-classic.jpg'),
      cdnUrl('/images/complete-set-coastal-modern.jpg'),
      cdnUrl('/images/complete-set-family-modern.jpg'),
      cdnUrl('/images/complete-set-modern-fireplace.jpg'),
      cdnUrl('/images/complete-set-sunset-fireplace.jpg'),
      ...(generatedByProduct['complete-set'] || []),
    ],
  },
};
