import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { products, Product } from "@/types/product";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { X, Plus, Check, Minus, ArrowLeft, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

const MAX_COMPARE = 3;

// Filter out coming soon products for comparison
const availableProducts = products.filter(p => !p.comingSoon);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-EG').format(price);
};

const Compare = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { compareIds, addToCompare, removeFromCompare, clearCompare } = useUIStore();
  const [showSelector, setShowSelector] = useState(false);

  // Sync from URL on mount
  useEffect(() => {
    const idsFromUrl = searchParams.get('ids')?.split(',').filter(Boolean) || [];
    if (idsFromUrl.length > 0 && compareIds.length === 0) {
      idsFromUrl.slice(0, MAX_COMPARE).forEach(id => {
        if (products.find(p => p.id === id)) {
          addToCompare(id);
        }
      });
    }
  }, []);

  // Sync to URL when compareIds change
  useEffect(() => {
    if (compareIds.length > 0) {
      setSearchParams({ ids: compareIds.join(',') }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  }, [compareIds, setSearchParams]);

  // Get selected products from IDs
  const selectedProducts = compareIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => !!p);

  const handleAddProduct = (product: Product) => {
    addToCompare(product.id);
    setShowSelector(false);
  };

  // Collect all unique features across selected products
  const allFeatures = [...new Set(selectedProducts.flatMap(p => p.features))];

  return (
    <>
      <Helmet>
        <title>Compare Recliners | Dandle</title>
        <meta name="description" content="Compare Dandle recliners side-by-side. View specs, prices, and features to find your perfect match." />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <Reveal>
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center gap-3 mb-2">
                <Scale className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline text-foreground">
                  Compare Recliners
                </h1>
              </div>
              <p className="text-muted-foreground">
                Select up to 3 recliners to compare side-by-side
              </p>
            </div>
          </Reveal>

          {/* Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {/* Selected Products */}
            <AnimatePresence mode="popLayout">
              {selectedProducts.map((product) => (
                <motion.div 
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="relative bg-card border border-border rounded-xl overflow-hidden shadow-subtle"
                >
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-background/80 backdrop-blur-sm rounded-full hover:bg-destructive hover:text-destructive-foreground transition-colors"
                    aria-label={`Remove ${product.name} from comparison`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  
                  <div className="aspect-square bg-muted">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-headline text-lg text-foreground mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.tagline}</p>
                    
                    {/* Price */}
                    <div className="space-y-1">
                      {product.priceManual && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Manual</span>
                          <span className="font-medium text-foreground">{formatPrice(product.priceManual)} EGP</span>
                        </div>
                      )}
                      {product.pricePower && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Power</span>
                          <span className="font-medium text-primary">{formatPrice(product.pricePower)} EGP</span>
                        </div>
                      )}
                      {product.price && !product.priceManual && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Price</span>
                          <span className="font-medium text-primary">{formatPrice(product.price)} EGP</span>
                        </div>
                      )}
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full mt-4"
                      onClick={() => window.location.href = `/products/${product.id}`}
                    >
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add Product Slots */}
            {Array.from({ length: MAX_COMPARE - selectedProducts.length }).map((_, index) => (
              <motion.button
                key={`empty-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowSelector(true)}
                className="aspect-[3/4] md:aspect-auto md:min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-primary hover:text-primary transition-all hover:bg-primary/5"
              >
                <Plus className="w-8 h-8" />
                <span>Add Recliner</span>
              </motion.button>
            ))}
          </div>

          {/* Feature Comparison Table */}
          {selectedProducts.length > 0 && (
            <Reveal delay={0.1}>
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-subtle">
                <div className="p-4 border-b border-border bg-muted/50 flex items-center justify-between">
                  <h2 className="font-headline text-xl text-foreground">
                    Feature Comparison
                  </h2>
                  {selectedProducts.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearCompare}>
                      Clear All
                    </Button>
                  )}
                </div>
                
                {/* Sticky header on scroll */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-background z-10">
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-muted-foreground font-medium min-w-[200px]">
                          Feature
                        </th>
                        {selectedProducts.map((product) => (
                          <th key={product.id} className="text-center p-4 font-headline text-foreground min-w-[150px]">
                            {product.name.replace('Dandle ', '')}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* 3-Word Truth Row */}
                      <tr className="border-b border-border bg-primary/5">
                        <td className="p-4 font-medium text-foreground">
                          Brand Truth
                        </td>
                        {selectedProducts.map((product) => (
                          <td key={product.id} className="p-4 text-center text-sm italic text-muted-foreground">
                            {product.truth}
                          </td>
                        ))}
                      </tr>

                      {/* Colors Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 text-muted-foreground">
                          Available Colors
                        </td>
                        {selectedProducts.map((product) => (
                          <td key={product.id} className="p-4 text-center text-sm text-foreground">
                            {product.colors.join(', ')}
                          </td>
                        ))}
                      </tr>
                      
                      {/* Target Audience Row */}
                      <tr className="border-b border-border">
                        <td className="p-4 text-muted-foreground">
                          Best For
                        </td>
                        {selectedProducts.map((product) => (
                          <td key={product.id} className="p-4 text-center text-sm text-foreground">
                            {product.targetAudience}
                          </td>
                        ))}
                      </tr>

                      {/* Features Rows */}
                      {allFeatures.map((feature, idx) => (
                        <tr key={feature} className={cn("border-b border-border", idx % 2 === 0 && "bg-muted/30")}>
                          <td className="p-4 text-muted-foreground text-sm">{feature}</td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="p-4 text-center">
                              {product.features.includes(feature) ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Reveal>
          )}

          {/* Empty State */}
          {selectedProducts.length === 0 && (
            <Reveal>
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Scale className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium text-foreground mb-2">
                  Start Comparing
                </p>
                <p className="text-muted-foreground mb-4">
                  Select recliners above to start comparing features
                </p>
                <Button onClick={() => setShowSelector(true)} variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Recliner
                </Button>
              </div>
            </Reveal>
          )}
        </div>

        {/* Product Selector Modal */}
        <AnimatePresence>
          {showSelector && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:items-center justify-center"
              onClick={() => setShowSelector(false)}
            >
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-background w-full md:max-w-2xl md:rounded-xl max-h-[80vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-headline text-lg text-foreground">
                    Select a Recliner
                  </h3>
                  <button 
                    onClick={() => setShowSelector(false)}
                    className="p-1.5 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close selector"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-4 overflow-y-auto max-h-[60vh] grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableProducts.map((product) => {
                    const isSelected = compareIds.includes(product.id);
                    return (
                      <motion.button
                        key={product.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !isSelected && handleAddProduct(product)}
                        disabled={isSelected}
                        className={cn(
                          "relative rounded-lg overflow-hidden border transition-all text-left",
                          isSelected 
                            ? "border-primary/50 opacity-50 cursor-not-allowed" 
                            : "border-border hover:border-primary hover:shadow-refined"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
                            <Check className="w-6 h-6 text-primary" />
                          </div>
                        )}
                        <div className="aspect-square bg-muted">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-2">
                          <p className="font-medium text-sm text-foreground truncate">
                            {product.name.replace('Dandle ', '')}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.priceManual ? `From ${formatPrice(product.priceManual)}` : formatPrice(product.price || 0)} EGP
                          </p>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <Footer />
    </>
  );
};

export default Compare;
