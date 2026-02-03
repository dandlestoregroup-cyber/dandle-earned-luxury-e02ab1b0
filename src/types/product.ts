export interface Product {
  id: string;
  name: string;
  tagline: string;
  truth: string; // 3-word truth
  story: string; // Emotional description
  priceManual?: number;
  pricePower?: number;
  price?: number;
  colors: string[];
  features: string[];
  targetAudience: string;
  imageUrl: string;
  comingSoon?: boolean;
  beFirstToKnow?: boolean; // For products coming soon but with "Be First to Know" CTA
}

export const products: Product[] = [
{
    id: "relaxmax",
    name: "Dandle RelaxMax",
    tagline: "The Default Seat",
    truth: "Familiar. Effortless. Right.",
    story: "RelaxMax is the chair you come back to, day after day. The default seat in the home—easy to live with, immediately right, and still right months later. No fuss. Just that 'this is mine' feeling.",
    priceManual: 21900,
    pricePower: 28900,
    colors: ["Urban Charcoal", "Off White", "Elephant Grey"],
    features: [
      "170° Zero-Gravity Recline",
      "Smart Storage Compartments",
      "Integrated USB Charging Port",
      "Premium Leather Upholstery",
    ],
    targetAudience: "High-performing professionals",
    imageUrl: "/images/dandle-relaxmax-hero.webp",
  },
  {
    id: "relaxmax-limited",
    name: "Dandle RelaxMax Limited Edition",
    tagline: "Premium Meets Performance",
    truth: "Swivel. Sip. Settle.",
    story: "RelaxMax Limited Edition is everything you love about the original, elevated. A 360° swivel base for effortless movement. Dual cup holders for your morning coffee or evening drink. Premium leather that ages beautifully. This is RelaxMax, perfected.",
    priceManual: 26900,
    pricePower: 34900,
    colors: ["Cognac Leather", "Espresso Brown", "Camel"],
    features: [
      "360° Swivel Base",
      "Dual Cup Holders",
      "170° Zero-Gravity Recline",
      "Premium Full-Grain Leather",
    ],
    targetAudience: "Discerning professionals who want the best",
    imageUrl: "/images/dandle-relaxmax-limited-hero.webp",
  },
  {
    id: "comfortplus",
    name: "Dandle ComfortPlus",
    tagline: "Settle Deep. Think Clear.",
    truth: "Release. Reset. Return.",
    story: "ComfortPlus is the built-in massage experience that resets the day. Your body settles into real comfort, and your mind follows—calm when you need calm, clear when you need focus.",
    priceManual: 29900,
    pricePower: 36900,
    colors: ["Chic Red", "Tan Beige"],
    features: [
      "8-Point Rolling Massage System",
      "Heating Elements (Back & Legs)",
      "Zero-Gravity Positioning",
      "Memory Foam Cushioning",
    ],
    targetAudience: "Wellness enthusiasts seeking therapy",
    imageUrl: "/images/dandle-comfortplus.jpg",
  },
  {
    id: "diva",
    name: "Dandle Diva",
    tagline: "Where Style Meets Comfort",
    truth: "Bold. Beautiful. Unmissable.",
    story: "Diva is personality made visible. A statement in vivid color and fine-grade fabrics, for the room that needs one confident piece to pull everything together. It doesn't just match your taste. It shows it.",
    priceManual: 23900,
    pricePower: 30900,
    colors: ["Chic Red", "Pink Rose", "Sunshine Yellow"],
    features: [
      "360° Swivel Base",
      "Zero-Gravity Recline",
      "Integrated Cupholder",
      "Bold Color Options",
    ],
    targetAudience: "Design-conscious taste makers",
    imageUrl: "/images/dandle-diva.jpg",
  },
  {
    id: "cozycompanion",
    name: "Dandle CozyCompanion",
    tagline: "Comfort for Two",
    truth: "Gather. Relax. Stay.",
    story: "CozyCompanion is where two people become one moment. Shared comfort that pulls closer. The gravitational anchor of the home.",
    priceManual: 42000,
    pricePower: 54000,
    colors: ["Ocean Blue", "Warm Grey"],
    features: [
      "Duo Seating Design",
      "Independent Reclining Controls",
      "Dual Storage Consoles",
      "Center Console with Storage",
    ],
    targetAudience: "Couples and families",
    imageUrl: "/images/dandle-cozycompanion-hero.webp",
  },
  {
    id: "easyup",
    name: "Dandle EasyUp Lift",
    tagline: "Sit Easy, Stand Easier",
    truth: "Ease. Support. Confidence.",
    story: "EasyUp Lift is everyday independence. Sit easy. Stand easier. The kind of difference you feel all day, not once. Thoughtful as a gift, powerful in daily life.",
    price: 32000,
    colors: ["Creamy Beige", "Urban Charcoal"],
    features: [
      "Power Lift Mechanism",
      "Zero-Gravity Positioning",
      "Enhanced Safety Features",
      "Easy-Clean Fabric",
    ],
    targetAudience: "Seniors and mobility assistance",
    imageUrl: "/images/dandle-easyup-standard.jpg",
  },
  {
    id: "easyup-compact",
    name: "Dandle EasyUp Compact",
    tagline: "Gentle Lift, Compact Design",
    truth: "Compact. Clean. Capable.",
    story: "EasyUp Compact is made for smart spaces—clean, practical, and designed for rooms where every corner matters. Crafted with OMASH Damsuk textured leather for refined durability.",
    price: 32000, // Corrected price per spec
    colors: ["Navy Blue", "Stone Grey", "Espresso Brown"], // Limited to 3 colors only (OMASH Damsuk)
    features: [
      "Power Lift Mechanism",
      "Compact Design for Small Spaces",
      "OMASH Damsuk Textured Leather",
      "Limited Colors Available",
    ],
    targetAudience: "Seniors and mobility assistance in smaller spaces",
    imageUrl: "/images/dandle-easyup-compact.jpg",
  },
  {
    id: "worknest",
    name: "Dandle WorkNest",
    tagline: "Feel Better. Work Better.",
    truth: "Comfort. Clarity. Output.",
    story: "WorkNest puts comfort first—then clarity and performance follow. You sit better, you breathe easier, and your brain stays steady. It's the work chair that makes hours feel lighter.",
    priceManual: 26900,
    pricePower: 33900,
    colors: ["Slate Grey", "Espresso Brown"],
    features: [
      "Integrated Work Table",
      "Wireless Charging Pad",
      "Zero-Gravity Recline",
      "Laptop Storage",
    ],
    targetAudience: "Remote workers and executives",
    imageUrl: "/images/dandle-worknest.jpg",
    beFirstToKnow: true,
  },
{
    id: "spacesaver",
    name: "Dandle SpaceSaver",
    tagline: "Same Comfort, Smaller Footprint",
    truth: "Compact. Cozy. Right.",
    story: "SpaceSaver is the RelaxMax you know and love, refined for smaller spaces. Every comfort feature, every premium finish—engineered to fit where you need it most.",
    priceManual: 19900,
    pricePower: 24900,
    colors: ["Mocha Taupe", "Coastal Fog", "Desert Grey"],
    features: [
      "Compact 75cm Width",
      "Wall-Hugger Technology",
      "Zero-Gravity Recline",
      "Full RelaxMax Features",
    ],
    targetAudience: "Urban dwellers with smaller spaces",
    imageUrl: "/images/dandle-spacesaver-hero.webp",
  },
  {
    id: "complete-set",
    name: "Dandle Complete Sets",
    tagline: "Comfort for the Whole Family",
    truth: "Gather. Relax. Stay.",
    story: "Complete Sets are where the room becomes a gathering. People come in, sit down, and stay—comfortably. The space feels complete because everyone has a seat.",
    priceManual: 62900,
    pricePower: 90900,
    colors: ["Coordinated Styles"],
    features: [
      "3-Piece Living Room Set",
      "Matching Design Language",
      "Premium Package Deal",
      "Full Home Comfort Solution",
    ],
    targetAudience: "Families seeking complete home solutions",
    imageUrl: "/images/dandle-heritage-set.jpg",
  },
];
