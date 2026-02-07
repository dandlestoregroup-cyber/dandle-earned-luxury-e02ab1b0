import { useState } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products, Product } from "@/types/product";
import { motion } from "framer-motion";

const ProductGallery = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const featuredOrder = [
    "relaxmax",
    "relaxmax-limited",
    "spacesaver",
    "easyup",
    "easyup-compact",
    "comfortplus",
    "diva",
    "worknest",
    "cozycompanion",
    "complete-set",
  ] as const;

  const featuredProducts = featuredOrder
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  return (
    <section id="products" className="bg-background py-12 md:py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product, index) => {
            // RelaxMax spans 2 cols on desktop
            const isRelaxMax = product.id === "relaxmax";
            // Complete Set is full-width landscape
            const isCompleteSet = product.id === "complete-set";
            
            return (
              <motion.div 
                key={product.id}
                className={
                  isRelaxMax ? "md:col-span-2" :
                  isCompleteSet ? "md:col-span-3" :
                  ""
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              >
                <ProductCard
                  product={product}
                  onClick={() => handleProductClick(product)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ProductGallery;
