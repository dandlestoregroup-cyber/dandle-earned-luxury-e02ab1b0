import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useShopifyCartStore } from "@/stores/shopifyCartStore";
import { useUIStore } from "@/stores/uiStore";

/**
 * CartButton - Opens the cart drawer
 * Shows badge with item count
 */
export const CartButton = () => {
  const { openCart } = useUIStore();
  const totalItems = useShopifyCartStore((state) => state.getTotalItems());

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={openCart}
      aria-label={`Shopping cart with ${totalItems} items`}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge 
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
        >
          {totalItems > 9 ? '9+' : totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;
