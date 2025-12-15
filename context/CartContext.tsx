"use client";
import { addToCart, clearCart, editCartItem, removeFromCart } from "@/app/(shop)/cart/actions";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/types/cart";
import { createContext, ReactNode, useContext, useTransition } from "react";
import { toast } from "sonner";

interface Cart {
  items: CartItem[];
  pending: boolean;
  totalPrice: number;
  add: (productVariantId: number, quantity: number) => void;
  remove: (itemId: number) => void;
  edit: (itemId: number, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<Cart | undefined>(undefined);
export function CartProvider({ children }: { children: ReactNode }) {
  const { data: cart = [], refetch } = useCart();
  const [pending, startTransition] = useTransition();
  const add = (productVariantId: number, quantity: number) => {
    startTransition(async () => {
      const id = toast.loading("جاري إضافة المنتج للسلة...");
      try {
        const reponse = await addToCart({
          productVariantId,
          quantity,
        });

        if (reponse.success) {
          refetch();
          toast.success("تمت إضافة المنتج للسلة بنجاح!", { id });
        } else {
          toast.error("حدث خطأ أثناء إضافة المنتج للسلة.", { id });
          console.dir(reponse);
        }
      } catch {
        toast.error("حدث خطأ أثناء إضافة المنتج للسلة.", { id });
      }
    });
  };

  const remove = (itemId: number) => {
    startTransition(() => {
      const id = toast.loading("جاري حذف المنتج من السلة...");
      removeFromCart(itemId)
        .then((response) => {
          if (response.success) {
            refetch();
            toast.success("تم حذف المنتج من السلة بنجاح!", { id });
          } else {
            toast.error("حدث خطأ أثناء حذف المنتج من السلة.", { id });
            console.dir(response);
          }
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء حذف المنتج من السلة.", { id });
        });
    });
  };

  const edit = (itemId: number, quantity: number) => {
    startTransition(() => {
      const id = toast.loading("جاري تعديل المنتج في السلة...");
      editCartItem(itemId, quantity)
        .then((response) => {
          if (response.success) {
            refetch();
            toast.success("تم تعديل المنتج في السلة بنجاح!", { id });
          } else {
            toast.error("حدث خطأ أثناء تعديل المنتج في السلة.", { id });
            console.dir(response);
          }
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء تعديل المنتج في السلة.", { id });
        });
    });
  };

  const clear = () => {
    startTransition(() => {
      const id = toast.loading("جاري تفريغ السلة...");
      clearCart()
        .then((response) => {
          if (response.success) {
            refetch();
            toast.success("تم تفريغ السلة بنجاح!", { id });
          } else {
            toast.error("حدث خطأ أثناء تفريغ السلة.", { id });
            console.dir(response);
          }
        })
        .catch(() => {
          toast.error("حدث خطأ أثناء تفريغ السلة.", { id });
        });
    });
  };
  const totalPrice = cart.reduce(
    (total, item) => total + item.variantDetails.newPrice * item.quantity,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        items: cart,
        totalPrice,
        pending,
        add,
        remove,
        edit,
        clear,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
