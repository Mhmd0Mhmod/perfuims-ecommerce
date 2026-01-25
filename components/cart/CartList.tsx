import { CartItem } from "@/types/cart";
import CartListItem from "./CartListItem";
import { ShoppingCart } from "lucide-react";

function CartList({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="bg-muted/10 flex h-full min-h-75 flex-col items-center justify-center gap-4 rounded-xl border border-dashed p-8 text-center">
          <div className="bg-muted rounded-full p-4">
            <ShoppingCart className="text-muted-foreground h-8 w-8" />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">سلة التسوق فارغة</h3>
            <p className="text-muted-foreground text-sm">
              سلة التسوق الخاصة بك فارغة حالياً. ابدأ بالتسوق لإضافة منتجات.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {cartItems.map((item) => (
            <CartListItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
export default CartList;
