import { Helmet } from 'react-helmet';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ProductCard from '@/components/ProductCard';
import { FilterBar } from '@/components/catalog/FilterBar';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { useProductDiscovery } from '@/hooks/useProductDiscovery';

const Collection = () => {
  const {
    filteredProducts,
    filters,
    setSearch,
    setSort,
    setMechanism,
    setPriceRange,
    toggleFeature,
    toggleColor,
    clearFilters,
    availableFeatures,
    availableColors,
    priceRange,
  } = useProductDiscovery();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Collection - Dandle Recliners</title>
        <meta
          name="description"
          content="Browse the complete Dandle collection. Filter by features, price, and mechanism type."
        />
      </Helmet>

      <Navigation />

      <main className="pt-20">
        <Section size="lg" background="cream">
          <Reveal>
            <SectionHeader
              title="The Collection"
              subtitle="Every Dandle recliner is built to feel right — day after day."
            />
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.1}>
            <FilterBar
              filters={filters}
              onSearchChange={setSearch}
              onSortChange={setSort}
              onMechanismChange={setMechanism}
              onPriceChange={setPriceRange}
              onFeatureToggle={toggleFeature}
              onColorToggle={toggleColor}
              onClearFilters={clearFilters}
              availableFeatures={availableFeatures}
              availableColors={availableColors}
              priceRange={priceRange}
              resultCount={filteredProducts.length}
            />
          </Reveal>

          {/* Product Grid */}
          <div className="mt-8">
            {filteredProducts.length === 0 ? (
              <Reveal>
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    No products match your filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              </Reveal>
            ) : (
              <RevealGroup staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <RevealItem key={product.id}>
                    <ProductCard
                      product={product}
                      onClick={() => {
                        // Navigate to product detail
                        window.location.href = `/products/${product.id}`;
                      }}
                    />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </Section>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Collection;
