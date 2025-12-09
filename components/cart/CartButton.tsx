import { ShoppingCart } from "lucide-react";
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

function CartButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <Badge className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
            5
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
      </SheetContent>
    </Sheet>
  );
}
export default CartButton;
