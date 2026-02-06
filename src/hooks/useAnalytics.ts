/**
 * E-commerce analytics hook for tracking user interactions
 * Pushes events to window.dataLayer for GTM/GA4/Meta Pixel
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

interface ProductItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_category?: string;
  item_variant?: string;
}

/**
 * Track when a user views a product detail page
 */
export const trackViewContent = (
  productId: string,
  productName: string,
  price: number,
  category?: string
) => {
  window.dataLayer?.push({
    event: "view_item",
    ecommerce: {
      currency: "EGP",
      value: price,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          item_category: category || "Recliners",
          quantity: 1,
        },
      ],
    },
  });
};

/**
 * Track when a user adds an item to cart
 */
export const trackAddToCart = (
  productId: string,
  productName: string,
  price: number,
  quantity: number = 1,
  variant?: string
) => {
  window.dataLayer?.push({
    event: "add_to_cart",
    ecommerce: {
      currency: "EGP",
      value: price * quantity,
      items: [
        {
          item_id: productId,
          item_name: productName,
          price,
          quantity,
          item_variant: variant,
          item_category: "Recliners",
        },
      ],
    },
  });
};

/**
 * Track when a user initiates checkout
 */
export const trackInitiateCheckout = (
  items: ProductItem[],
  total: number
) => {
  window.dataLayer?.push({
    event: "begin_checkout",
    ecommerce: {
      currency: "EGP",
      value: total,
      items: items.map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity || 1,
        item_category: item.item_category || "Recliners",
        item_variant: item.item_variant,
      })),
    },
  });
};

/**
 * Track completed purchase
 */
export const trackPurchase = (
  orderId: string,
  items: ProductItem[],
  total: number,
  shipping?: number,
  tax?: number
) => {
  window.dataLayer?.push({
    event: "purchase",
    ecommerce: {
      transaction_id: orderId,
      currency: "EGP",
      value: total,
      shipping: shipping || 0,
      tax: tax || 0,
      items: items.map((item) => ({
        item_id: item.item_id,
        item_name: item.item_name,
        price: item.price,
        quantity: item.quantity || 1,
        item_category: item.item_category || "Recliners",
        item_variant: item.item_variant,
      })),
    },
  });
};

/**
 * Track search queries
 */
export const trackSearch = (searchTerm: string) => {
  window.dataLayer?.push({
    event: "search",
    search_term: searchTerm,
  });
};

/**
 * Track when user views a collection/category
 */
export const trackViewCollection = (
  collectionName: string,
  items: ProductItem[]
) => {
  window.dataLayer?.push({
    event: "view_item_list",
    ecommerce: {
      item_list_id: collectionName.toLowerCase().replace(/\s+/g, "_"),
      item_list_name: collectionName,
      items: items.map((item, index) => ({
        ...item,
        index,
        item_category: item.item_category || "Recliners",
      })),
    },
  });
};

/**
 * Custom hook for analytics (can be extended with additional state)
 */
export const useAnalytics = () => {
  return {
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackSearch,
    trackViewCollection,
  };
};

export default useAnalytics;
