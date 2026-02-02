import { useMemo } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  FilterState, 
  SortOption, 
  MechanismFilter 
} from '@/hooks/useProductDiscovery';

interface FilterBarProps {
  filters: FilterState;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
  onMechanismChange: (value: MechanismFilter) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onFeatureToggle: (feature: string) => void;
  onColorToggle: (color: string) => void;
  onClearFilters: () => void;
  availableFeatures: string[];
  availableColors: string[];
  priceRange: { min: number; max: number };
  resultCount: number;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A-Z' },
  { value: 'name-desc', label: 'Name: Z-A' },
];

const mechanismOptions: { value: MechanismFilter; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'manual', label: 'Manual Recline' },
  { value: 'power', label: 'Power Recline' },
  { value: 'single', label: 'Single Price' },
];

// Format price for display
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-EG', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(price);
};

export function FilterBar({
  filters,
  onSearchChange,
  onSortChange,
  onMechanismChange,
  onPriceChange,
  onFeatureToggle,
  onColorToggle,
  onClearFilters,
  availableFeatures,
  availableColors,
  priceRange,
  resultCount,
}: FilterBarProps) {
  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.mechanism !== 'all') count++;
    if (filters.minPrice !== null || filters.maxPrice !== null) count++;
    if (filters.features.length > 0) count += filters.features.length;
    if (filters.colors.length > 0) count += filters.colors.length;
    return count;
  }, [filters]);

  // Current price values for slider
  const currentPriceRange = [
    filters.minPrice ?? priceRange.min,
    filters.maxPrice ?? priceRange.max,
  ];

  return (
    <div className="space-y-4">
      {/* Search and Sort Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search recliners..."
            value={filters.search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-10 bg-background"
          />
          {filters.search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <Select value={filters.sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48 bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Sheet (Mobile + Desktop) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filters
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={onClearFilters}>
                    Clear all
                  </Button>
                )}
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Mechanism Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Mechanism Type</h4>
                <div className="flex flex-wrap gap-2">
                  {mechanismOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={filters.mechanism === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onMechanismChange(option.value)}
                    >
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Price Range</h4>
                <Slider
                  value={currentPriceRange}
                  min={priceRange.min}
                  max={priceRange.max}
                  step={1000}
                  onValueChange={([min, max]) => onPriceChange(min, max)}
                  className="py-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{formatPrice(currentPriceRange[0])} EGP</span>
                  <span>{formatPrice(currentPriceRange[1])} EGP</span>
                </div>
              </div>

              {/* Features Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Features</h4>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                  {availableFeatures.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={filters.features.includes(feature)}
                        onCheckedChange={() => onFeatureToggle(feature)}
                      />
                      <Label
                        htmlFor={`feature-${feature}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors Filter */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <Button
                      key={color}
                      variant={filters.colors.includes(color) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => onColorToggle(color)}
                      className="text-xs"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters.mechanism !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {mechanismOptions.find((o) => o.value === filters.mechanism)?.label}
              <button onClick={() => onMechanismChange('all')}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {(filters.minPrice !== null || filters.maxPrice !== null) && (
            <Badge variant="secondary" className="gap-1">
              {formatPrice(currentPriceRange[0])} - {formatPrice(currentPriceRange[1])} EGP
              <button onClick={() => onPriceChange(null, null)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {filters.features.map((feature) => (
            <Badge key={feature} variant="secondary" className="gap-1">
              {feature}
              <button onClick={() => onFeatureToggle(feature)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {filters.colors.map((color) => (
            <Badge key={color} variant="secondary" className="gap-1">
              {color}
              <button onClick={() => onColorToggle(color)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground">
        Showing {resultCount} {resultCount === 1 ? 'product' : 'products'}
      </p>
    </div>
  );
}

export default FilterBar;
