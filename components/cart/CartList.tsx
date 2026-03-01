"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Barcode, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import CartListItem from "./CartListItem";
import ClearCartButton from "./ClearCartButton";
import CartItemSkeleton from "./CartItemSkeleton";
import { useCartContext } from "@/context/CartContext";
function CartList() {
  const { items, isCartLoading } = useCartContext();
  if (isCartLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <CartItemSkeleton key={idx} />
        ))}
      </div>
    );
  }

  return (
    <>
      <ScrollArea className="max-h-[70vh]">
        {items.length === 0 ? (
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
            {items.map((item) => (
              <CartListItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="grid grid-cols-1 gap-2">
        {items.length > 0 && (
          <Button asChild variant={"outline"}>
            <Link href="/checkout">
              <Barcode className="mr-2 h-4 w-4" />
              إتمام الشراء
            </Link>
          </Button>
        )}
        {items.length > 0 && (
          <ClearCartButton>
            <Trash2 className="mr-2 h-4 w-4" />
            إفراغ السلة
          </ClearCartButton>
        )}
      </div>
    </>
  );
}
export default CartList;
