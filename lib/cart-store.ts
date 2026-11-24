"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Money, ShopifyImage } from "./shopify/types";

/**
 * Linha de carrinho. A forma aproxima-se de `CartLine` da Storefront API
 * (merchandise.id = variantId). Ao ligar à Shopify: `add` → mutation cartLinesAdd,
 * `remove` → cartLinesRemove, e guardar o `cartId` em vez das linhas.
 * Como cada mesa é peça única, a quantidade é sempre 1.
 */
export interface CartLine {
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  subtitle: string;
  price: Money;
  image: ShopifyImage;
}

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (line: CartLine) => void;
  remove: (variantId: string) => void;
  open: () => void;
  close: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,
      add: (line) => {
        if (get().lines.some((l) => l.variantId === line.variantId)) return;
        set({ lines: [...get().lines, line] });
      },
      remove: (variantId) => set({ lines: get().lines.filter((l) => l.variantId !== variantId) }),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: "atelie-carrinho-v2",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }),
      skipHydration: true, // reidratado no cliente (CartDrawer) para evitar mismatch de SSR
    },
  ),
);

/** Devolve null se alguma linha ainda não tiver preço definido (placeholder). */
export function cartSubtotal(lines: CartLine[]): string | null {
  if (lines.some((l) => l.price.amount === null)) return null;
  return String(lines.reduce((sum, l) => sum + Number(l.price.amount), 0));
}
