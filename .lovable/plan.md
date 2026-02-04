

# Shopify Native Credentials Update

## Current Issue
The code uses `import.meta.env.VITE_SHOPIFY_*` which aren't set as build-time environment variables. While the fallback values work, they create confusion and the pattern is incorrect for native integration.

## Solution
Update both Shopify integration files to use the native credentials directly (since these are public Storefront API tokens, not secrets):

### File 1: `src/stores/shopifyCartStore.ts`
**Lines 6-9** - Replace environment variable pattern with direct values:
```typescript
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'dandle-earned-luxury-qbrhm.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '40c01ef6931b927cffd64a795e61563b';
```

### File 2: `src/lib/shopifySafeMerge.ts`
**Lines 36-39** - Same update:
```typescript
const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'dandle-earned-luxury-qbrhm.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '40c01ef6931b927cffd64a795e61563b';
```

## Why This Is Safe
- Storefront Access Tokens are **public by design** (they're meant for client-side use)
- They only allow read access to published store data
- This is the standard pattern for headless Shopify storefronts

## Completed Fixes Summary

| Fix | Status |
|-----|--------|
| Homepage H1 (SEO) | ✅ Implemented |
| Shopify Credentials | 🔄 This plan |
| ValU Calculator | ✅ Created |
| Image srcset | ✅ Fixed |

