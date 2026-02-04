

# OMASH Hero Card Redesign

## Overview
Replace the current OMASH hero partner card with a stunning, modern design featuring:
- Rounded container with premium shadow
- Clean image section with floating "Partner" badge
- Refined typography hierarchy with sparkle accent
- Product highlight badge with animated pulse

## Design Specifications

### New Component Structure
```text
┌─────────────────────────────────────────┐
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │         OMASH IMAGE            │    │
│  │   /images/dandle-omash-        │    │
│  │     partnership.webp           │    │
│  │                    [Partner]   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  ✦ Premium Materials (tagline)          │
│                                         │
│  OMASH Damsuk                           │
│                                         │
│  Textured leather and fabric excellence │
│                                         │
│  Formerly known as Raytex...            │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ ● EasyUp Compact uses OMASH... │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Styling Adaptations

The user's design uses Tailwind classes that need to be adapted to Dandle's brand tokens:

| User Design | Dandle Adaptation |
|-------------|-------------------|
| `bg-slate-100` | `bg-cream` (section bg) |
| `bg-white` | `bg-off-white` |
| `text-slate-900` | `text-charcoal` |
| `text-slate-500` | `text-charcoal/60` |
| `text-amber-500` | `text-dandle-orange` |
| `text-teal-700` | `text-dandle-orange` |
| `bg-teal-500` | `bg-dandle-orange` |
| `rounded-[2.5rem]` | Keep (modern feel) |
| `shadow-2xl` | Keep (premium look) |

### Typography

- Brand name: "OMASH Damsuk" always in English (serif/headline font)
- Arabic mode: Show Arabic name with LTR-wrapped English
- Use `font-headline` for brand name, `font-body` for descriptions

---

## Implementation Details

### File: `src/components/Partners.tsx`

**Changes:**

1. **Add Sparkles import from lucide-react**

2. **Replace the OMASH Hero Partner Feature section** (lines 130-167)

The new structure:
```tsx
{/* OMASH Hero Partner Feature - Stunning Card */}
<div className="max-w-md mx-auto mb-16">
  <div 
    className="bg-off-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-champagne/20"
    dir={isArabic ? "rtl" : "ltr"}
  >
    {/* Image with Partner Badge */}
    <div className="relative h-64 md:h-80 w-full">
      <img 
        src={heroPartner.image}
        alt="OMASH Damsuk Partnership"
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute top-4 right-4 bg-off-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm">
        <span className="text-[10px] font-black uppercase tracking-widest text-charcoal">
          {isArabic ? "شريك" : "Partner"}
        </span>
      </div>
    </div>

    {/* Text Content */}
    <div className={`p-8 ${isArabic ? 'text-right' : 'text-left'}`}>
      {/* Tagline with Sparkle */}
      <div className={`flex items-center gap-2 mb-3 opacity-60 ${isArabic ? 'flex-row-reverse' : ''}`}>
        <Sparkles size={14} className="text-dandle-orange" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/50">
          {isArabic ? heroPartner.taglineAr : heroPartner.taglineEn}
        </span>
      </div>

      {/* Brand Name - Always prominent */}
      <h3 className={`text-3xl md:text-4xl text-charcoal mb-3 leading-tight ${isArabic ? 'font-body-ar' : 'font-headline'}`}>
        OMASH Damsuk
      </h3>

      {/* Value Statement */}
      <p className={`text-sm font-semibold text-dandle-orange mb-4 uppercase tracking-wide ${isArabic ? 'font-body-ar' : 'font-body'}`}>
        {isArabic ? "تراث مصري أصيل" : "Authentic Egyptian Heritage"}
      </p>

      {/* Description */}
      <p className={`text-charcoal/60 text-sm leading-relaxed mb-6 ${isArabic ? 'font-body-ar' : 'font-body'}`}>
        {isArabic ? heroPartner.meaningAr : heroPartner.meaningEn}
      </p>

      {/* Product Highlight Badge */}
      <div className="flex items-center gap-3 bg-cream/50 border border-champagne/20 px-4 py-3 rounded-xl">
        <div className="w-2 h-2 rounded-full bg-dandle-orange animate-pulse flex-shrink-0" />
        <span className={`text-xs font-semibold text-charcoal ${isArabic ? 'font-body-ar' : 'font-body'}`}>
          {isArabic ? heroPartner.highlightAr : heroPartner.highlight}
        </span>
      </div>
    </div>
  </div>
</div>
```

3. **Update heroPartner data** to include the new value subtitle:
```tsx
const heroPartner = {
  // ... existing fields
  subtitleEn: "Authentic Egyptian Heritage",
  subtitleAr: "تراث مصري أصيل",
};
```

---

## Visual Enhancements

### Key Differences from Current Design

| Current | New |
|---------|-----|
| Full-width container with LCornerFrame | Centered card (max-w-md) with rounded corners |
| L-corner brackets | Premium shadow + border |
| Flat styling | 3D depth with shadows |
| Orange text accents | Sparkle icon + uppercase tracking |
| Simple highlight | Animated pulse badge |

### Mobile Considerations

- Card width: `max-w-md` (448px) centers beautifully
- Image height: `h-64` mobile, `h-80` desktop
- Padding: `p-8` for comfortable reading
- RTL support: `flex-row-reverse` for sparkle alignment

---

## Technical Notes

### Dependencies
- `Sparkles` icon from `lucide-react` (already installed)

### Files Modified
- `src/components/Partners.tsx` - Replace OMASH hero card section

### No CSS Changes Required
- All styling uses existing Tailwind utilities
- Brand tokens (`text-charcoal`, `bg-off-white`, `text-dandle-orange`) already defined

---

## Success Criteria

1. OMASH card displays with stunning rounded container design
2. Partner badge floats over image with glass effect
3. Sparkle accent appears next to tagline
4. Brand name "OMASH Damsuk" displays correctly (always English)
5. Animated pulse indicator on product highlight
6. Full RTL support for Arabic mode
7. Uses existing `/images/dandle-omash-partnership.webp` image

