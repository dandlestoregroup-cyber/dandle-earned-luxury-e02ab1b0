// Lovable Catalog - Single Source of Truth for Product Images
// Simplified: no siteImageManifest override, catalog paths are final

export interface LovableImage {
  src: string;
  fallbackSrc?: string;
  width: number;
  height: number;
  alt: string;
}

export interface LovableProduct {
  productHandle: string;
  title: string;
  subtitle: string;
  heroImage: LovableImage;
  gallery: LovableImage[];
  aspectRatio: number;
}

// Product Images - Lovable as Visual Master
export const lovableCatalog: LovableProduct[] = [
  {
    productHandle: "relaxmax",
    title: "RelaxMax Recliner",
    subtitle: "The Default Seat",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-relaxmax-cognac-leather-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle RelaxMax: The flagship recliner. Iconic cinematic comfort and perfectly balanced proportions."
    },
    gallery: [
      { src: "/images/relaxmax-lifestyle-day.png", width: 2752, height: 1536, alt: "RelaxMax Recliner - Day Lifestyle" },
      { src: "/images/relaxmax-lifestyle-night.png", width: 2752, height: 1536, alt: "RelaxMax Recliner - Night Lifestyle" },
      { src: "/images/relaxmax-brown-lifestyle.jpg", width: 2752, height: 1536, alt: "RelaxMax Recliner - Brown Lifestyle" },
      { src: "/images/relaxmax-mediterranean-home-lifestyle.webp", width: 2752, height: 1536, alt: "RelaxMax in Mediterranean Home" },
      { src: "/images/relaxmax-hotel-room-lifestyle.webp", width: 2752, height: 1536, alt: "RelaxMax in Hotel Room" },
      { src: "/images/relaxmax-lounge-lifestyle.webp", width: 2752, height: 1536, alt: "RelaxMax in Modern Lounge" },
      { src: "/images/relaxmax-cozy-adobe-lifestyle.webp", width: 2752, height: 1536, alt: "RelaxMax in Cozy Adobe Home" }
    ]
  },
  {
    productHandle: "relaxmax-limited",
    title: "RelaxMax Limited Edition",
    subtitle: "Premium Meets Performance",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-relaxmax-limited-camel-leather-hero.jpg",
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
      src: "/images/dandle-spacesaver-alexandria-linen-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle SpaceSaver: Compact 75cm width with all RelaxMax features."
    },
    gallery: [
      { src: "/images/spacesaver-offwhite-reclined.jpg", width: 2752, height: 1536, alt: "SpaceSaver - Off-White Reclined" },
      { src: "/images/spacesaver-offwhite-side.jpg", width: 2752, height: 1536, alt: "SpaceSaver - Side View" },
      { src: "/images/spacesaver-desert-grey.webp", width: 2752, height: 1536, alt: "SpaceSaver - Desert Grey" },
      { src: "/images/spacesaver-desert-grey-reclined.webp", width: 2752, height: 1536, alt: "SpaceSaver - Desert Grey Reclined" },
      { src: "/images/spacesaver-mocha-taupe.webp", width: 2752, height: 1536, alt: "SpaceSaver - Mocha Taupe" },
      { src: "/images/spacesaver-office-lifestyle.webp", width: 2752, height: 1536, alt: "SpaceSaver in Home Office" }
    ]
  },
  {
    productHandle: "diva",
    title: "Diva Recliner",
    subtitle: "Where Style Meets Comfort",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-diva-terracotta-hero.jpg",
      width: 1024,
      height: 1024,
      alt: "Dandle Diva: Bold personality in vivid color and fine-grade fabrics."
    },
    gallery: [
      { src: "/images/diva-red-front.jpg", width: 2752, height: 1536, alt: "Diva Recliner - Front View" },
      { src: "/images/diva-terracotta-reclined.webp", width: 2752, height: 1536, alt: "Diva Recliner - Terracotta Reclined" },
      { src: "/images/diva-desert-sage-green.webp", width: 2752, height: 1536, alt: "Diva Recliner - Desert Sage Green" },
      { src: "/images/diva-giza-gold.webp", width: 2752, height: 1536, alt: "Diva Recliner - Giza Gold" },
      { src: "/images/diva-oasis-green.webp", width: 2752, height: 1536, alt: "Diva Recliner - Oasis Green" },
      { src: "/images/diva-mediterranean-home-lifestyle.webp", width: 2752, height: 1536, alt: "Diva in Mediterranean Home" },
      { src: "/images/diva-lounge-lifestyle.webp", width: 2752, height: 1536, alt: "Diva in Modern Lounge" }
    ]
  },
  {
    productHandle: "cozycompanion",
    title: "CozyCompanion Loveseat",
    subtitle: "Comfort for Two",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-cozycompanion-mocha-taupe-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle CozyCompanion: A premium two-seated recliner loveseat — mother and daughter reading together."
    },
    gallery: [
      { src: "/images/cozycompanion-yellow-front.jpg", width: 2752, height: 1536, alt: "CozyCompanion - Yellow Front View" },
      { src: "/images/cozycompanion-couple-lifestyle.webp", width: 2752, height: 1536, alt: "CozyCompanion - Couple Lifestyle" },
      { src: "/images/cozycompanion-mocha-taupe.webp", width: 2752, height: 1536, alt: "CozyCompanion - Mocha Taupe" },
      { src: "/images/cozycompanion-coastal-fog.webp", width: 2752, height: 1536, alt: "CozyCompanion - Coastal Fog" },
      { src: "/images/cozycompanion-cozy-adobe-lifestyle.webp", width: 2752, height: 1536, alt: "CozyCompanion in Cozy Adobe Home" },
      { src: "/images/cozycompanion-hotel-room-lifestyle.webp", width: 2752, height: 1536, alt: "CozyCompanion in Hotel Suite" }
    ]
  },
  {
    productHandle: "worknest",
    title: "WorkNest Recliner",
    subtitle: "Feel Better. Work Better.",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-worknest-oasis-green-hero.webp",
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
      src: "/images/dandle-comfortplus-tan-hero.webp",
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
      src: "/images/dandle-easyup-standard-grey-hero.webp",
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
      { src: "/images/easyup-lift-assist-lifestyle.webp", width: 2752, height: 1536, alt: "EasyUp - Lift Assist Lifestyle" },
      { src: "/images/easyup-reception-area-lifestyle.webp", width: 2752, height: 1536, alt: "EasyUp in Reception Area" }
    ]
  },
  {
    productHandle: "easyup-compact",
    title: "EasyUp Compact Lift Recliner",
    subtitle: "Gentle Lift, Compact Design",
    aspectRatio: 1,
    heroImage: {
      src: "/images/dandle-easyup-compact-charcoal-hero.webp",
      width: 1024,
      height: 1024,
      alt: "Dandle EasyUp Compact: Pregnant woman using the green lift recliner for gentle support."
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
      src: "/images/complete-set-nile-view-living-room-lifestyle.jpg",
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

// Helper: Get product by handle — direct catalog lookup, no overrides
export function getLovableProduct(handle: string): LovableProduct | null {
  return lovableCatalog.find((p) => p.productHandle === handle) || null;
}

// Helper: Get all product handles for routing
export function getAllProductHandles(): string[] {
  return lovableCatalog.map(p => p.productHandle);
}
