import { Product } from '@/types/product';

export const generateProductSchema = (product: Product) => ({
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": product.name,
  "image": product.imageUrl?.startsWith('http') 
    ? [product.imageUrl] 
    : [`https://dandle-earned-luxury.lovable.app${product.imageUrl}`],
  "description": product.tagline,
  "brand": {
    "@type": "Brand",
    "name": "Dandle"
  },
  "offers": {
    "@type": "Offer",
    "url": `https://dandle-earned-luxury.lovable.app/products/${product.id}`,
    "priceCurrency": "EGP",
    "price": product.priceManual || product.price || 0,
    "availability": product.comingSoon 
      ? "https://schema.org/PreOrder" 
      : "https://schema.org/InStock"
  }
});

export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Dandle Recliners",
  "url": "https://dandle-earned-luxury.lovable.app",
  "logo": "https://dandle-earned-luxury.lovable.app/favicon.ico",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+20-1222804255",
    "contactType": "customer service",
    "areaServed": "EG",
    "availableLanguage": ["Arabic", "English"]
  }
});

export const generateLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["FurnitureStore", "HomeGoodsStore"],
  "name": "Dandle Recliners",
  "url": "https://dandle-earned-luxury.lovable.app",
  "telephone": "+20-1222804255",
  "description": "Dandle creates precision-built recliners designed for real-life sitting—made to feel right in your home from day one. Choose from manual and power recliners, lift-assist models, and two-seater comfort—built with care and finished in fine-grade fabrics and leathers. We deliver nationwide across Egypt, with clear after-sales support and warranty service.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "EG"
  },
  "areaServed": [
    "Cairo", "Giza", "Alexandria", "New Cairo", "6th of October", "Sheikh Zayed",
    "Heliopolis", "Nasr City", "Maadi", "Obour", "Shorouk", "Mansoura", "Tanta",
    "Zagazig", "Ismailia", "Port Said", "Suez", "Ain Sokhna", "Hurghada",
    "Sharm El Sheikh", "Assiut", "Minya"
  ],
  "priceRange": "EGP 21,900 - EGP 90,900",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Dandle Recliners Collection",
    "itemListElement": [
      "RelaxMax Recliner", "SpaceSaver Recliner", "Diva Recliner",
      "WorkNest Recliner", "ComfortPlus Recliner", "CozyCompanion Recliner",
      "EasyUp Lift Recliner (Standard)", "EasyUp Compact Lift Recliner",
      "Dandle Complete Set"
    ]
  }
});
