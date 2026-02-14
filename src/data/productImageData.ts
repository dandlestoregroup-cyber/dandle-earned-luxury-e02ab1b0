/* Product image data — Genspark v1 (Feb 2026) */

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
    mainImage: cdnUrl('/images/dandle-relaxmax-cognac-leather-hero.webp'),
    galleryImages: [
      cdnUrl('/images/relaxmax-alexandria-linen-variant.webp'),
      cdnUrl('/images/relaxmax-mocha-taupe-variant.webp'),
      cdnUrl('/images/relaxmax-coastal-fog.webp'),
      cdnUrl('/images/relaxmax-lifestyle-day.png'),
      cdnUrl('/images/relaxmax-lifestyle-night.png'),
      ...(generatedByProduct['relaxmax'] || []),
    ],
  },
  'relaxmax-limited': {
    mainImage: cdnUrl('/images/dandle-relaxmax-limited-camel-leather-hero.jpg'),
    galleryImages: [
      cdnUrl('/images/relaxmax-limited-mocha-taupe.webp'),
      ...(generatedByProduct['relaxmax-limited'] || []),
    ],
  },
  'spacesaver': {
    mainImage: cdnUrl('/images/dandle-spacesaver-alexandria-linen-hero.webp'),
    galleryImages: [
      cdnUrl('/images/spacesaver-mocha-taupe-variant.webp'),
      cdnUrl('/images/spacesaver-terracotta-reclined-variant.webp'),
      cdnUrl('/images/spacesaver-desert-grey.webp'),
      cdnUrl('/images/spacesaver-desert-grey-reclined.webp'),
      ...(generatedByProduct['spacesaver'] || []),
    ],
  },
  'comfortplus': {
    mainImage: cdnUrl('/images/dandle-comfortplus-tan-hero.webp'),
    galleryImages: [
      cdnUrl('/images/comfortplus-coastal-fog-variant.webp'),
      ...(generatedByProduct['comfortplus'] || []),
    ],
  },
  'diva': {
    mainImage: cdnUrl('/images/dandle-diva-terracotta-hero.jpg'),
    galleryImages: [
      cdnUrl('/images/diva-desert-sage-variant.webp'),
      cdnUrl('/images/diva-giza-gold-variant.webp'),
      cdnUrl('/images/diva-oasis-green.webp'),
      ...(generatedByProduct['diva'] || []),
    ],
  },
  'cozycompanion': {
    mainImage: cdnUrl('/images/dandle-cozycompanion-mocha-taupe-hero.webp'),
    galleryImages: [
      cdnUrl('/images/cozycompanion-alexandria-linen-variant.jpg'),
      cdnUrl('/images/cozycompanion-coastal-fog.webp'),
      cdnUrl('/images/cozycompanion-couple-lifestyle.webp'),
      cdnUrl('/images/cozycompanion-couple-lifestyle-2.webp'),
      ...(generatedByProduct['cozycompanion'] || []),
    ],
  },
  'worknest': {
    mainImage: cdnUrl('/images/dandle-worknest-oasis-green-hero.webp'),
    galleryImages: [
      cdnUrl('/images/worknest-blue-nile-denim-variant.jpg'),
      cdnUrl('/images/worknest-desert-grey-variant.webp'),
      cdnUrl('/images/worknest-oasis-green-lifestyle.webp'),
      ...(generatedByProduct['worknest'] || []),
    ],
  },
  'easyup': {
    mainImage: cdnUrl('/images/dandle-easyup-standard-grey-hero.webp'),
    galleryImages: [
      cdnUrl('/images/easyup-standard-oasis-green-variant.webp'),
      cdnUrl('/images/easyup-pregnant-woman-accessibility-lifestyle.jpg'),
      cdnUrl('/images/easyup-standard-coastal-fog.webp'),
      cdnUrl('/images/easyup-standard-mocha-taupe.webp'),
      cdnUrl('/images/easyup-lift-assist-lifestyle.webp'),
      ...(generatedByProduct['easyup'] || []),
    ],
  },
  'easyup-compact': {
    mainImage: cdnUrl('/images/dandle-easyup-compact-charcoal-hero.webp'),
    galleryImages: [
      cdnUrl('/images/easyup-compact-grey-front.webp'),
      cdnUrl('/images/easyup-compact-oasis-green.webp'),
      cdnUrl('/images/easyup-compact-oasis-green-2.webp'),
      ...(generatedByProduct['easyup-compact'] || []),
    ],
  },
  'complete-set': {
    mainImage: cdnUrl('/images/complete-set-nile-view-living-room-lifestyle.jpg'),
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
