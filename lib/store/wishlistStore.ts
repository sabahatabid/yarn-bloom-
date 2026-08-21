'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggleItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  hasItem: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleItem: (product) => set((state) => ({
        items: state.items.some((item) => item.id === product.id)
          ? state.items.filter((item) => item.id !== product.id)
          : [...state.items, product],
      })),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((item) => item.id !== productId),
      })),
      hasItem: (productId) => get().items.some((item) => item.id === productId),
    }),
    {
      name: 'yarn-bloom-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
