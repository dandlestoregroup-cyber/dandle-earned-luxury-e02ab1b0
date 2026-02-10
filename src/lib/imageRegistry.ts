/**
 * Canonical Image Registry
 * 
 * Single source of truth for all homepage image storage paths.
 * Every homepage image MUST be referenced through this registry
 * and rendered via cdnUrl(IMAGES.KEY).
 */

export const IMAGES = {
  // Gift section
  GIFT_BACKGROUND: "/images/gift-lifestyle-cairo.jpg",
  
  // Showroom / Experience Room
  SHOWROOM_IMAGE: "/images/dandle-partnerships-room.png",
  
  // Partners
  PARTNER_OMASH: "/images/dandle-omash-partnership.webp",
} as const;

export type ImageRegistryKey = keyof typeof IMAGES;
