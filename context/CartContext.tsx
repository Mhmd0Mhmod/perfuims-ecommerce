"use client";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types/cart";
import { createContext, ReactNode, useContext } from "react";

interface Cart {
  items: CartItem[];
  totalPrice: number;
  addMutation: ReturnType<typeof useCart>["addMutation"];
  removeMutation: ReturnType<typeof useCart>["removeMutation"];
  editMutation: ReturnType<typeof useCart>["editMutation"];
  clearMutation: ReturnType<typeof useCart>["clearMutation"];
  isCartLoading: boolean;
}

const CartContext = createContext<Cart | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCart();

  return (
    <CartContext
      value={{
        ...cart,
      }}
    >
      {children}
    </CartContext>
  );
}
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
