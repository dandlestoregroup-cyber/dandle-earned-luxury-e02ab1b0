import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { products, Product } from '@/types/product';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
export type MechanismFilter = 'all' | 'manual' | 'power' | 'single';

export interface FilterState {
  search: string;
  sort: SortOption;
  mechanism: MechanismFilter;
  minPrice: number | null;
  maxPrice: number | null;
  features: string[];
  colors: string[];
}

interface UseProductDiscoveryReturn {
  filteredProducts: Product[];
  filters: FilterState;
  setSearch: (value: string) => void;
  setSort: (value: SortOption) => void;
  setMechanism: (value: MechanismFilter) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  toggleFeature: (feature: string) => void;
  toggleColor: (color: string) => void;
  clearFilters: () => void;
  totalCount: number;
  availableFeatures: string[];
  availableColors: string[];
  priceRange: { min: number; max: number };
}

// Extract unique features from all products
const getAllFeatures = (): string[] => {
  const features = new Set<string>();
  products.forEach((p) => p.features.forEach((f) => features.add(f)));
  return Array.from(features).sort();
};

// Extract unique colors from all products
const getAllColors = (): string[] => {
  const colors = new Set<string>();
  products.forEach((p) => p.colors.forEach((c) => colors.add(c)));
  return Array.from(colors).sort();
};

// Get min/max prices across all products
const getPriceRange = (): { min: number; max: number } => {
  let min = Infinity;
  let max = 0;
  products.forEach((p) => {
    const prices = [p.price, p.priceManual, p.pricePower].filter(Boolean) as number[];
    prices.forEach((price) => {
      min = Math.min(min, price);
      max = Math.max(max, price);
    });
  });
  return { min: min === Infinity ? 0 : min, max };
};

// Get the primary price for a product (for sorting/filtering)
const getProductPrice = (product: Product): number => {
  return product.price || product.priceManual || product.pricePower || 0;
};

// Fuse.js configuration for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'name', weight: 2 },
    { name: 'tagline', weight: 1.5 },
    { name: 'story', weight: 1 },
    { name: 'features', weight: 1 },
    { name: 'colors', weight: 0.8 },
    { name: 'targetAudience', weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
  ignoreLocation: true,
};

/**
 * useProductDiscovery - URL-synced product filtering and search
 * - Fuzzy search with Fuse.js
 * - URL-based state for shareable filtered views
 * - Multiple filter types (mechanism, price, features, colors)
 */
export function useProductDiscovery(): UseProductDiscoveryReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse filters from URL
  const filters: FilterState = useMemo(() => ({
    search: searchParams.get('q') || '',
    sort: (searchParams.get('sort') as SortOption) || 'featured',
    mechanism: (searchParams.get('mechanism') as MechanismFilter) || 'all',
    minPrice: searchParams.get('min') ? Number(searchParams.get('min')) : null,
    maxPrice: searchParams.get('max') ? Number(searchParams.get('max')) : null,
    features: searchParams.get('features')?.split(',').filter(Boolean) || [],
    colors: searchParams.get('colors')?.split(',').filter(Boolean) || [],
  }), [searchParams]);

  // Update URL params
  const updateParams = useCallback((updates: Partial<FilterState>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
          newParams.delete(key === 'search' ? 'q' : key);
        } else if (Array.isArray(value)) {
          newParams.set(key, value.join(','));
        } else if (key === 'search') {
          newParams.set('q', String(value));
        } else if (key === 'minPrice') {
          newParams.set('min', String(value));
        } else if (key === 'maxPrice') {
          newParams.set('max', String(value));
        } else {
          newParams.set(key, String(value));
        }
      });
      
      return newParams;
    }, { replace: true });
  }, [setSearchParams]);

  // Filter setters
  const setSearch = useCallback((value: string) => updateParams({ search: value }), [updateParams]);
  const setSort = useCallback((value: SortOption) => updateParams({ sort: value }), [updateParams]);
  const setMechanism = useCallback((value: MechanismFilter) => updateParams({ mechanism: value }), [updateParams]);
  const setPriceRange = useCallback((min: number | null, max: number | null) => {
    updateParams({ minPrice: min, maxPrice: max });
  }, [updateParams]);
  
  const toggleFeature = useCallback((feature: string) => {
    const current = filters.features;
    const updated = current.includes(feature)
      ? current.filter((f) => f !== feature)
      : [...current, feature];
    updateParams({ features: updated });
  }, [filters.features, updateParams]);

  const toggleColor = useCallback((color: string) => {
    const current = filters.colors;
    const updated = current.includes(color)
      ? current.filter((c) => c !== color)
      : [...current, color];
    updateParams({ colors: updated });
  }, [filters.colors, updateParams]);

  const clearFilters = useCallback(() => {
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  // Create Fuse instance
  const fuse = useMemo(() => new Fuse(products, fuseOptions), []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Apply search
    if (filters.search) {
      const searchResults = fuse.search(filters.search);
      result = searchResults.map((r) => r.item);
    }

    // Apply mechanism filter
    if (filters.mechanism !== 'all') {
      result = result.filter((p) => {
        if (filters.mechanism === 'manual') return p.priceManual !== undefined;
        if (filters.mechanism === 'power') return p.pricePower !== undefined;
        if (filters.mechanism === 'single') return p.price !== undefined && !p.priceManual && !p.pricePower;
        return true;
      });
    }

    // Apply price filter
    if (filters.minPrice !== null) {
      result = result.filter((p) => getProductPrice(p) >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter((p) => getProductPrice(p) <= filters.maxPrice!);
    }

    // Apply feature filter
    if (filters.features.length > 0) {
      result = result.filter((p) =>
        filters.features.every((feature) => p.features.includes(feature))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) =>
        filters.colors.some((color) => p.colors.includes(color))
      );
    }

    // Apply sorting (only if not searching, to preserve relevance order)
    if (!filters.search || filters.sort !== 'featured') {
      result.sort((a, b) => {
        switch (filters.sort) {
          case 'price-asc':
            return getProductPrice(a) - getProductPrice(b);
          case 'price-desc':
            return getProductPrice(b) - getProductPrice(a);
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0; // featured - keep original order
        }
      });
    }

    return result;
  }, [fuse, filters]);

  return {
    filteredProducts,
    filters,
    setSearch,
    setSort,
    setMechanism,
    setPriceRange,
    toggleFeature,
    toggleColor,
    clearFilters,
    totalCount: products.length,
    availableFeatures: getAllFeatures(),
    availableColors: getAllColors(),
    priceRange: getPriceRange(),
  };
}

export default useProductDiscovery;
