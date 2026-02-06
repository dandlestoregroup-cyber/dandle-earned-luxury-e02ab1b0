import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLovableProduct } from "@/catalog/lovableCatalog";
import {
  fetchShopifyCommerceData,
  mergeWithShopify,
  formatPrice,
  MergedProduct
} from "@/lib/shopifySafeMerge";
import { ProductImageGallery } from "@/components/product/ProductImageGallery";
import { ProductMetafields } from "@/components/product/ProductMetafields";
import { ARViewer } from "@/components/product/ARViewer";
import { RelaxMaxImageModule } from "@/components/product/RelaxMaxImageModule";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { useUIStore } from "@/stores/uiStore";
import { ArrowLeft, ShoppingCart, Loader2, Shield, Truck, Wrench, Star, Scale } from "lucide-react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { PaymentTrustBadges } from "@/components/commerce/PaymentTrustBadges";
import { ValuInstallmentCalculator } from "@/components/commerce/ValuInstallmentCalculator";
import { trackViewContent, trackAddToCart } from "@/hooks/useAnalytics";
import { useLang } from "@/hooks/useBilingualText";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { addItem } = useShopifyCartStore();
  const { openCart, addToCompare, isInCompare, removeFromCompare } = useUIStore();
  const { isArabic } = useLang();

  const [product, setProduct] = useState<MergedProduct | null>(null);
  const [isLoadingCommerce, setIsLoadingCommerce] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Show sticky bar after scrolling past add to cart button
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!handle) {
      navigate("/");
      return;
    }

    const lovableProduct = getLovableProduct(handle);
    if (!lovableProduct) {
      navigate("/");
      return;
    }

    setProduct(mergeWithShopify(lovableProduct, null));

    fetchShopifyCommerceData(handle)
      .then(shopifyData => {
        setProduct(mergeWithShopify(lovableProduct, shopifyData));
      })
      .catch(error => {
        console.error("Failed to load commerce data:", error);
      })
      .finally(() => {
        setIsLoadingCommerce(false);
      });
  }, [handle, navigate]);

  // Track view_item on mount
  useEffect(() => {
    if (product && product.commerce?.price) {
      trackViewContent(
        product.productHandle,
        product.title,
        parseFloat(product.commerce.price),
        "Recliners"
      );
    }
  }, [product?.productHandle, product?.commerce?.price]);

  const handleAddToCart = async () => {
    if (!product || !product.commerce?.variants?.[0]) return;

    setIsAddingToCart(true);
    const variant = product.commerce.variants[0];
    
    // Track add_to_cart event
    trackAddToCart(
      product.productHandle,
      product.title,
      parseFloat(variant.price),
      quantity,
      variant.optionValue
    );
    
    await addItem({
      product: {
        id: product.productHandle,
        title: product.title,
        handle: product.productHandle,
        images: [{ url: product.heroImage.src, altText: product.title }]
      },
      variantId: variant.id,
      variantTitle: variant.optionValue,
      price: {
        amount: variant.price,
        currencyCode: product.commerce.currencyCode
      },
      quantity,
      selectedOptions: []
    });
    
    setIsAddingToCart(false);
    openCart();
  };

  const handleCompareToggle = () => {
    if (!product) return;
    if (isInCompare(product.productHandle)) {
      removeFromCompare(product.productHandle);
    } else {
      addToCompare(product.productHandle);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const gallery = product.gallery.length > 0 ? product.gallery : [product.heroImage];
  const isAvailable = product.commerce?.availableForSale ?? true;
  const displayPrice = product.commerce
    ? formatPrice(product.commerce.price, product.commerce.currencyCode)
    : "Price on request";

  const heroImageSeoUrl = product.heroImage.src.startsWith("http")
    ? product.heroImage.src
    : `https://dandle-earned-luxury.lovable.app${product.heroImage.src}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.subtitle,
    "brand": { "@type": "Brand", "name": "DANDLE" },
    "image": heroImageSeoUrl,
    "url": `https://dandle-earned-luxury.lovable.app/products/${product.productHandle}`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": product.commerce?.currencyCode || "EGP",
      "price": product.commerce?.price || "0",
      "availability": isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://dandle-earned-luxury.lovable.app/products/${product.productHandle}`,
      "seller": { "@type": "Organization", "name": "DANDLE Egypt" }
    }
  };

  const inCompare = isInCompare(product.productHandle);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{product.title} | DANDLE Recliners - Earned Luxury</title>
        <meta name="description" content={`${product.title} - ${product.subtitle}. Premium Egyptian recliner with 2-year warranty. Free delivery & installation.`} />
        <link rel="canonical" href={`https://dandle-earned-luxury.lovable.app/products/${product.productHandle}`} />
        <meta property="og:title" content={`${product.title} | DANDLE`} />
        <meta property="og:description" content={product.subtitle} />
        <meta property="og:image" content={heroImageSeoUrl} />
        <meta property="og:url" content={`https://dandle-earned-luxury.lovable.app/products/${product.productHandle}`} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.title} | DANDLE`} />
        <meta name="twitter:description" content={product.subtitle} />
        <meta name="twitter:image" content={heroImageSeoUrl} />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      </Helmet>
      
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8 mt-20 pb-32 md:pb-8">
        {/* Back button */}
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Above-the-fold grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductImageGallery
              images={gallery}
              aspectRatio={product.aspectRatio}
              altPrefix={product.title}
            />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            {/* Title & Tagline */}
            <div>
              <h1 className="font-headline text-3xl md:text-4xl lg:text-5xl text-foreground mb-2">
                {product.title}
              </h1>
              <p className="font-body text-lg md:text-xl text-muted-foreground">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-border py-6">
              {isLoadingCommerce ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span className="text-muted-foreground">Loading price...</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-3xl font-headline text-primary">
                    {displayPrice}
                  </div>
                  {product.commerce?.compareAtPrice && (
                    <div className="text-lg text-muted-foreground line-through">
                      {formatPrice(product.commerce.compareAtPrice, product.commerce.currencyCode)}
                    </div>
                  )}
                 {/* ValU Installment Calculator */}
                 {product.commerce?.price && (
                   <ValuInstallmentCalculator 
                     price={parseFloat(product.commerce.price)} 
                     compact 
                     className="mt-2"
                   />
                 )}
                  {!isAvailable && (
                    <div className="text-sm text-destructive font-medium">Currently unavailable</div>
                  )}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <label className="font-body text-sm text-foreground">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} disabled={quantity <= 1}>-</Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(q => q + 1)} disabled={quantity >= 10}>+</Button>
              </div>
            </div>

            {/* Add to Cart & Compare */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={!isAvailable || isLoadingCommerce || !product.commerce || isAddingToCart}
              >
                {isAddingToCart ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <ShoppingCart className="w-5 h-5 mr-2" />
                )}
                {isAvailable ? "Add to Cart" : "Contact Us"}
              </Button>
              
              <Button
                variant="outline"
                className={cn("w-full", inCompare && "border-primary text-primary")}
                onClick={handleCompareToggle}
              >
                <Scale className="w-4 h-4 mr-2" />
                {inCompare ? "Remove from Compare" : "Add to Compare"}
              </Button>
            </div>

           {/* Payment Trust Badges */}
           <PaymentTrustBadges className="border-t border-border" />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
              <div className="flex flex-col items-center text-center">
                <Shield className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">2-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Wrench className="w-5 h-5 text-primary mb-1" />
                <span className="text-xs text-muted-foreground">Free Installation</span>
              </div>
            </div>

            <ARViewer productTitle={product.title} productHandle={product.productHandle} />
            
            {product.productHandle === "relaxmax" && (
              <RelaxMaxImageModule currentImageSrc={product.heroImage.src} />
            )}
          </motion.div>
        </div>

        {/* Tabbed Content */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8 overflow-x-auto">
              <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-headline">
                Details
              </TabsTrigger>
              <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-headline">
                Specs
              </TabsTrigger>
              <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-headline">
                Care
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="mt-0">
              <div className="prose prose-lg max-w-none">
                <h3 className="font-headline text-2xl text-foreground mb-4">About This Product</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Handcrafted in Cairo, Egypt with premium materials and meticulous attention to detail. 
                  The {product.title} represents the pinnacle of Egyptian furniture craftsmanship, 
                  combining traditional techniques with modern ergonomic design.
                </p>
                <p className="font-body text-muted-foreground leading-relaxed mt-4">
                  Every piece is assembled by master craftsmen with decades of experience, 
                  ensuring unparalleled quality and comfort that will last for generations.
                </p>
              </div>
              {product.commerce?.metafields && (
                <div className="mt-8">
                  <ProductMetafields metafields={product.commerce.metafields} />
                </div>
              )}
            </TabsContent>

            <TabsContent value="specs" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-headline text-2xl text-foreground mb-4">Dimensions</h3>
                  <ul className="space-y-3 font-body text-muted-foreground">
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Width</span><span className="text-foreground">85 cm</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Depth (Upright)</span><span className="text-foreground">90 cm</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Depth (Reclined)</span><span className="text-foreground">165 cm</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Height</span><span className="text-foreground">105 cm</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Weight Capacity</span><span className="text-foreground">150 kg</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-headline text-2xl text-foreground mb-4">Materials</h3>
                  <ul className="space-y-3 font-body text-muted-foreground">
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Frame</span><span className="text-foreground">Hardwood & Steel</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Upholstery</span><span className="text-foreground">Premium Leather</span>
                    </li>
                    <li className="flex justify-between border-b border-border pb-2">
                      <span>Filling</span><span className="text-foreground">High-Density Foam</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Mechanism</span><span className="text-foreground">German Engineering</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="care" className="mt-0">
              <div className="max-w-2xl">
                <h3 className="font-headline text-2xl text-foreground mb-4">Care Instructions</h3>
                <ul className="space-y-4 font-body text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold shrink-0">1</span>
                    <span>Wipe with a soft, dry cloth regularly to remove dust</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold shrink-0">2</span>
                    <span>For leather upholstery, use a leather conditioner every 6 months</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold shrink-0">3</span>
                    <span>Avoid direct sunlight to prevent fading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold shrink-0">4</span>
                    <span>Clean spills immediately with a damp cloth</span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Sticky Mobile CTA Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 md:hidden bg-background border-t border-border p-4 z-40 shadow-elegant"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-headline text-sm truncate">{product.title}</p>
                <p className="text-primary font-semibold">{displayPrice}</p>
              </div>
              <Button
                size="lg"
                onClick={handleAddToCart}
                disabled={!isAvailable || isLoadingCommerce || !product.commerce || isAddingToCart}
                className="shrink-0"
              >
                {isAddingToCart ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ProductDetail;
