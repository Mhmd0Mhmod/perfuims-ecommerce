"use client";
import { Barcode, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { useCartContext } from "@/context/CartContext";
import CartList from "./CartList";
import ClearCartButton from "./ClearCartButton";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";

function CartButton() {
  const { items } = useCartContext();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
            {items.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetClose />
        <SheetHeader>
          <SheetTitle className="mb-4 text-lg font-semibold">سلة التسوق</SheetTitle>
          <SheetDescription className="text-muted-foreground mb-6 text-sm">
            تحقق من العناصر في سلة التسوق الخاصة بك وقم بإجراء عملية الدفع عندما تكون جاهزًا.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 px-4 py-2">
          <ScrollArea className="max-h-[70vh]">
            <CartList cartItems={items} />
          </ScrollArea>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant={"outline"}>
              <Link href="/checkout">
                <Barcode className="mr-2 h-4 w-4" />
                إتمام الشراء
              </Link>
            </Button>
            <ClearCartButton>
              <Trash2 className="mr-2 h-4 w-4" />
              إفراغ السلة
            </ClearCartButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default CartButton;
