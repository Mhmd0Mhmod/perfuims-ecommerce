import { CartItem } from "@/types/cart";
import CartListItem from "./CartListItem";

function CartList({ cartItems }: { cartItems: CartItem[] }) {
  return (
    <>
      {cartItems.length === 0 ? (
        <div className="text-muted-foreground p-4 text-center text-sm">
          سلة التسوق الخاصة بك فارغة.
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
