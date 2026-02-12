

# Update MANUS_INTEGRATION_GUIDE.md with Complete Consolidated Instructions

The existing guide at `public/MANUS_INTEGRATION_GUIDE.md` needs to be rewritten to include the 8 new lifestyle gallery entries that were added to `siteImageManifest.ts`, and to add the published/preview URLs and testing workflow sections.

## What Changes

### File: `public/MANUS_INTEGRATION_GUIDE.md`

Rewrite the guide to consolidate all current data into one definitive document. The key additions vs the current version:

**Section 6 -- Lifestyle Gallery Slots**: Add the 8 new Egyptian luxury market entries that now exist in `siteImageManifest.ts`:

| ID | Filename | Setting | Product |
|---|---|---|---|
| lifestyle-home-newcairo-villa | comfortplus_lifestyle_newcairo-villa.webp | New Cairo compound villa | ComfortPlus |
| lifestyle-home-marassi | cozycompanion_lifestyle_marassi.webp | Marassi apartment | CozyCompanion |
| lifestyle-home-katameya | complete-set_lifestyle_katameya-villa.webp | Katameya Heights villa | Complete Set |
| lifestyle-home-zamalek-penthouse | worknest_lifestyle_zamalek-penthouse.webp | Zamalek Nile-view penthouse | WorkNest |
| lifestyle-hotel-northcoast | relaxmax_lifestyle_northcoast-hacienda.webp | North Coast Hacienda villa | RelaxMax |
| lifestyle-hotel-sokhna | diva_lifestyle_sokhna-terrace.webp | Ain Sokhna chalet terrace | Diva |
| lifestyle-hotel-gouna | spacesaver_lifestyle_gouna-hotel.webp | El Gouna boutique hotel | SpaceSaver |
| lifestyle-hotel-fourseasons | relaxmax-limited_lifestyle_fivestar-suite.webp | Four Seasons style suite | RelaxMax Limited |

**Section 7 -- Testing Capabilities**: Add concrete testing instructions with published/preview URLs.

**Section 8 -- Workflow**: Clarify what Manus handles vs what Lovable handles.

**Section 9 -- Important Notes**: Add cache-busting guidance (append `?t=timestamp`) and PWA considerations.

All other sections (API access, image specs, color palette, product-swatch mapping, replaceable filenames, homepage sections) remain the same but are verified against the current codebase.

### Technical Detail

No code files are modified -- this is a documentation-only update to `public/MANUS_INTEGRATION_GUIDE.md`. The guide will be a single self-contained reference that Manus.ai can consume to autonomously manage all site imagery.

