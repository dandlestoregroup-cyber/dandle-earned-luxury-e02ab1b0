import { create } from 'zustand';

interface UIState {
  // Cart drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Product modal
  isProductModalOpen: boolean;
  selectedProductId: string | null;
  openProductModal: (productId: string) => void;
  closeProductModal: () => void;

  // Compare
  compareIds: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Mobile menu
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;

  // Search
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const MAX_COMPARE_ITEMS = 3;

// Load compare IDs from localStorage
const loadCompareIds = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('dandle-compare');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Save compare IDs to localStorage
const saveCompareIds = (ids: string[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dandle-compare', JSON.stringify(ids));
  }
};

export const useUIStore = create<UIState>((set, get) => ({
  // Cart drawer
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  // Product modal
  isProductModalOpen: false,
  selectedProductId: null,
  openProductModal: (productId) => set({ isProductModalOpen: true, selectedProductId: productId }),
  closeProductModal: () => set({ isProductModalOpen: false, selectedProductId: null }),

  // Compare
  compareIds: loadCompareIds(),
  addToCompare: (productId) => {
    const { compareIds } = get();
    if (compareIds.length >= MAX_COMPARE_ITEMS || compareIds.includes(productId)) return;
    const newIds = [...compareIds, productId];
    saveCompareIds(newIds);
    set({ compareIds: newIds });
  },
  removeFromCompare: (productId) => {
    const { compareIds } = get();
    const newIds = compareIds.filter((id) => id !== productId);
    saveCompareIds(newIds);
    set({ compareIds: newIds });
  },
  clearCompare: () => {
    saveCompareIds([]);
    set({ compareIds: [] });
  },
  isInCompare: (productId) => get().compareIds.includes(productId),

  // Mobile menu
  isMobileMenuOpen: false,
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  // Search
  isSearchOpen: false,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
}));

export default useUIStore;
