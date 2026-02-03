// Lovable Catalog - Single Source of Truth for Product Images
// This catalog is INDEPENDENT of Shopify and controls all visual rendering

import { siteImageManifest } from "@/data/siteImageManifest";
import { getStorageUrl } from "@/utils/siteImageResolver";

export interface LovableImage {
  src: string; // Import path or asset URL
  fallbackSrc?: string; // Optional fallback URL if src 404s
  width: number; // Exact pixel width
  height: number; // Exact pixel height
  alt: string; // Descriptive alt text
}

export interface LovableProduct {
  productHandle: string;
  title: string;
  subtitle: string;
  heroImage: LovableImage;
  gallery: LovableImage[];
  aspectRatio: number;  // width/height for perfect containers
}

// Product Images - Lovable as Visual Master
export const lovableCatalog: LovableProduct[] = [
  {
    productHandle: "relaxmax",
    title: "RelaxMax Recliner",
    subtitle: "The Default Seat",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-relaxmax-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle RelaxMax: The flagship recliner. Iconic cinematic comfort and perfectly balanced proportions."
    },
    gallery: [
      { src: "/images/relaxmax-lifestyle-day.png", width: 2752, height: 1536, alt: "RelaxMax Recliner - Day Lifestyle" },
      { src: "/images/relaxmax-lifestyle-night.png", width: 2752, height: 1536, alt: "RelaxMax Recliner - Night Lifestyle" },
      { src: "/images/relaxmax-brown-lifestyle.jpg", width: 2752, height: 1536, alt: "RelaxMax Recliner - Brown Lifestyle" }
    ]
  },
  {
    productHandle: "relaxmax-limited",
    title: "RelaxMax Limited Edition",
    subtitle: "Premium Meets Performance",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-relaxmax-limited-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle RelaxMax Limited Edition: 360° swivel, dual cup holders, premium full-grain leather."
    },
    gallery: []
  },
  {
    productHandle: "spacesaver",
    title: "SpaceSaver Recliner",
    subtitle: "Same Comfort, Smaller Footprint",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-spacesaver-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle SpaceSaver: Compact 75cm width with all RelaxMax features."
    },
    gallery: [
      { src: "/images/spacesaver-offwhite-reclined.jpg", width: 2752, height: 1536, alt: "SpaceSaver - Off-White Reclined" },
      { src: "/images/spacesaver-offwhite-side.jpg", width: 2752, height: 1536, alt: "SpaceSaver - Side View" },
      { src: "/images/spacesaver-desert-grey.webp", width: 2752, height: 1536, alt: "SpaceSaver - Desert Grey" },
      { src: "/images/spacesaver-desert-grey-reclined.webp", width: 2752, height: 1536, alt: "SpaceSaver - Desert Grey Reclined" },
      { src: "/images/spacesaver-mocha-taupe.webp", width: 2752, height: 1536, alt: "SpaceSaver - Mocha Taupe" }
    ]
  },
  {
    productHandle: "diva",
    title: "Diva Recliner",
    subtitle: "Where Style Meets Comfort",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-diva-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle Diva: Bold personality in vivid color and fine-grade fabrics."
    },
    gallery: [
      { src: "/images/diva-red-front.jpg", width: 2752, height: 1536, alt: "Diva Recliner - Front View" },
      { src: "/images/diva-terracotta-reclined.webp", width: 2752, height: 1536, alt: "Diva Recliner - Terracotta Reclined" },
      { src: "/images/diva-desert-sage-green.webp", width: 2752, height: 1536, alt: "Diva Recliner - Desert Sage Green" },
      { src: "/images/diva-giza-gold.webp", width: 2752, height: 1536, alt: "Diva Recliner - Giza Gold" },
      { src: "/images/diva-oasis-green.webp", width: 2752, height: 1536, alt: "Diva Recliner - Oasis Green" }
    ]
  },
  {
    productHandle: "cozycompanion",
    title: "CozyCompanion Loveseat",
    subtitle: "Comfort for Two",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-cozycompanion-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle CozyCompanion: A premium two-seated recliner loveseat."
    },
    gallery: [
      { src: "/images/cozycompanion-yellow-front.jpg", width: 2752, height: 1536, alt: "CozyCompanion - Yellow Front View" },
      { src: "/images/cozycompanion-couple-lifestyle.webp", width: 2752, height: 1536, alt: "CozyCompanion - Couple Lifestyle" },
      { src: "/images/cozycompanion-mocha-taupe.webp", width: 2752, height: 1536, alt: "CozyCompanion - Mocha Taupe" },
      { src: "/images/cozycompanion-coastal-fog.webp", width: 2752, height: 1536, alt: "CozyCompanion - Coastal Fog" }
    ]
  },
  {
    productHandle: "worknest",
    title: "WorkNest Recliner",
    subtitle: "Feel Better. Work Better.",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-worknest-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle WorkNest: The work chair that makes hours feel lighter."
    },
    gallery: [
      { src: "/images/worknest-oasis-green.webp", width: 2752, height: 1536, alt: "WorkNest - Oasis Green" },
      { src: "/images/worknest-desert-grey-reclined.webp", width: 2752, height: 1536, alt: "WorkNest - Desert Grey Reclined" },
      { src: "/images/worknest-oasis-green-lifestyle.webp", width: 2752, height: 1536, alt: "WorkNest - Oasis Green Lifestyle" }
    ]
  },
  {
    productHandle: "comfortplus",
    title: "ComfortPlus Recliner",
    subtitle: "Settle Deep. Think Clear.",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-comfortplus.jpg",
      width: 1024,
      height: 1024,
      alt: "Dandle ComfortPlus: Built-in massage experience that resets the day."
    },
    gallery: [
      { src: "/images/relaxmax-hero-offwhite.jpg", width: 2752, height: 1536, alt: "ComfortPlus - Off-White Variant" }
    ]
  },
  {
    productHandle: "easyup",
    title: "EasyUp Lift Recliner",
    subtitle: "Sit Easy, Stand Easier",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-easyup-standard-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle EasyUp Standard: Power lift for everyday independence."
    },
    gallery: [
      { src: "/images/easyup-beige-front.jpg", width: 2752, height: 1536, alt: "EasyUp - Beige Front" },
      { src: "/images/easyup-beige-lifted.jpg", width: 2752, height: 1536, alt: "EasyUp - Lifted Position" },
      { src: "/images/easyup-standard-coastal-fog.webp", width: 2752, height: 1536, alt: "EasyUp - Coastal Fog" },
      { src: "/images/easyup-standard-oasis-green.webp", width: 2752, height: 1536, alt: "EasyUp - Oasis Green" },
      { src: "/images/easyup-standard-mocha-taupe.webp", width: 2752, height: 1536, alt: "EasyUp - Mocha Taupe" },
      { src: "/images/easyup-standard-mocha-taupe-lifted.webp", width: 2752, height: 1536, alt: "EasyUp - Mocha Taupe Lifted" },
      { src: "/images/easyup-lift-assist-lifestyle.webp", width: 2752, height: 1536, alt: "EasyUp - Lift Assist Lifestyle" }
    ]
  },
  {
    productHandle: "easyup-compact",
    title: "EasyUp Compact Lift Recliner",
    subtitle: "Gentle Lift, Compact Design",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-easyup-compact-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle EasyUp Compact: Slim power lift in OMASH Damsuk textured leather."
    },
    gallery: [
      { src: "/images/easyup-compact-charcoal-front.png", width: 2752, height: 1536, alt: "EasyUp Compact - Charcoal Front" },
      { src: "/images/easyup-compact-charcoal-reclined.png", width: 2752, height: 1536, alt: "EasyUp Compact - Charcoal Reclined" },
      { src: "/images/easyup-compact-charcoal-side.png", width: 2752, height: 1536, alt: "EasyUp Compact - Charcoal Side" },
      { src: "/images/easyup-compact-oasis-green.webp", width: 2752, height: 1536, alt: "EasyUp Compact - Oasis Green" }
    ]
  },
  {
    productHandle: "complete-set",
    title: "Complete Living Room Set",
    subtitle: "Comfort for the Whole Family",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-complete-set-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle Complete Set: 3-piece living room set for the whole family."
    },
    gallery: [
      { src: "/images/complete-set-coastal-modern.jpg", width: 2752, height: 1536, alt: "Complete Set - Coastal Modern" },
      { src: "/images/complete-set-family-modern.jpg", width: 2752, height: 1536, alt: "Complete Set - Family Modern" },
      { src: "/images/complete-set-modern-fireplace.jpg", width: 2752, height: 1536, alt: "Complete Set - Modern Fireplace" },
      { src: "/images/complete-set-sunset-fireplace.jpg", width: 2752, height: 1536, alt: "Complete Set - Sunset Fireplace" }
    ]
  }
];

// Helper: Map catalog handles to manifest handles
const normalizeHandleForManifest = (handle: string): string => {
  // The catalog uses "easyup" while the manifest uses "easyup-standard"
  if (handle === "easyup") return "easyup-standard";
  return handle;
};

// Helper: Get product by handle - fail-safe
export function getLovableProduct(handle: string): LovableProduct | null {
  const base = lovableCatalog.find((p) => p.productHandle === handle) || null;
  if (!base) return null;

  // Hydrate hero + gallery from the site image manifest (generated images live in storage)
  const manifestHandle = normalizeHandleForManifest(base.productHandle);

  const heroManifest = siteImageManifest.find(
    (img) => img.category === "product-hero" && img.productHandle === manifestHandle
  );
  const galleryManifest = siteImageManifest.filter(
    (img) => img.category === "product-gallery" && img.productHandle === manifestHandle
  );

  // Only use storage URL if image actually exists (status === 'exists')
  // Otherwise fall back to generatedUrl or referenceUrl
  const getImageSrc = (img: typeof heroManifest) => {
    if (!img) return null;
    if (img.status === 'exists' && img.generatedUrl) {
      return img.generatedUrl;
    }
    // Fallback to referenceUrl for missing images
    return img.referenceUrl;
  };

  const heroImage = heroManifest
    ? {
        ...base.heroImage,
        src: getImageSrc(heroManifest) || base.heroImage.src,
        fallbackSrc: heroManifest.referenceUrl,
        width: heroManifest.dimensions.width,
        height: heroManifest.dimensions.height,
      }
    : base.heroImage;

  const generatedGallery = galleryManifest
    .filter((img) => img.status === 'exists') // Only include images that exist
    .map((img) => ({
      src: img.generatedUrl || img.referenceUrl,
      fallbackSrc: img.referenceUrl,
      width: img.dimensions.width,
      height: img.dimensions.height,
      alt: `${base.title} — ${img.setting}`,
    }));

  return {
    ...base,
    heroImage,
    gallery: generatedGallery.length ? [...generatedGallery, ...base.gallery] : base.gallery,
  };
}

// Helper: Get all product handles for routing
export function getAllProductHandles(): string[] {
  return lovableCatalog.map(p => p.productHandle);
}
