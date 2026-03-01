"use client";
import { ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
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
import CartList from "./CartList";

import { useCartContext } from "@/context/CartContext";
import { Skeleton } from "../ui/skeleton";

function CartButton() {
  const { items, isCartLoading } = useCartContext();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
            {isCartLoading ? <Skeleton className="h-4 w-4 rounded-full" /> : items.length}
          </Badge>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" dir="ltr">
        <SheetClose />
        <div className="flex h-full flex-col" dir="rtl">
          <SheetHeader>
            <SheetTitle className="mb-4 text-lg font-semibold">سلة التسوق</SheetTitle>
            <SheetDescription className="text-muted-foreground mb-6 text-sm">
              تحقق من العناصر في سلة التسوق الخاصة بك وقم بإجراء عملية الدفع عندما تكون جاهزًا.
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 px-4 py-2">
            <CartList />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default CartButton;
