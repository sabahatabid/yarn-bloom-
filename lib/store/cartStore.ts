'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartLineItem {
  id: string; // cart-item id: `${productId}::${variant}`
  product_id: string;
  product: Product;
  quantity: number;
  unit_price: number;
  selected_variant?: string;
  customization_note?: string;
}

export interface CartState {
  items: CartLineItem[];
  // Derived helpers
  itemCount: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  total: () => number;
  // Actions
  addItem: (
    product: Product,
    quantity?: number,
    variant?: string,
    note?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItem: (productId: string, variant?: string) => CartLineItem | undefined;
}

const DELIVERY_FREE_THRESHOLD = 3000; // Rs. 3000 free delivery
const DELIVERY_FEE = 250; // Rs. 250 standard

function makeItemId(productId: string, variant?: string): string {
  return `${productId}::${variant ?? 'default'}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.unit_price * item.quantity,
          0
        ),

      deliveryFee: () =>
        get().subtotal() >= DELIVERY_FREE_THRESHOLD ? 0 : DELIVERY_FEE,

      total: () => get().subtotal() + get().deliveryFee(),

      addItem: (product, quantity = 1, variant, note) => {
        const itemId = makeItemId(product.id, variant);
        const price = product.sale_price ?? product.price;

        set((state) => {
          const existing = state.items.find((i) => i.id === itemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === itemId
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              {
                id: itemId,
                product_id: product.id,
                product,
                quantity,
                unit_price: price,
                selected_variant: variant,
                customization_note: note,
              },
            ],
          };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === itemId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getItem: (productId, variant) => {
        const itemId = makeItemId(productId, variant);
        return get().items.find((i) => i.id === itemId);
      },
    }),
    {
      name: 'yarn-bloom-cart',
      storage: createJSONStorage(() => localStorage),
      // Only persist items array — derive the rest on load
      partialize: (state) => ({ items: state.items }),
    }
  )
);
