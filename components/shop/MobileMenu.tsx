import { Menu } from "lucide-react";
import Link from "next/link";
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

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetClose />
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">القائمة</SheetTitle>
          <SheetDescription className="text-muted-foreground text-sm">
            تصفح الأقسام المختلفة للموقع من هنا.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          <Link href="/" className="hover:text-primary text-lg font-semibold transition-colors">
            الرئيسية
          </Link>
          <Link href="/shop" className="hover:text-primary text-lg font-semibold transition-colors">
            المتجر
          </Link>
          <Link
            href="/about"
            className="hover:text-primary text-lg font-semibold transition-colors"
          >
            من نحن
          </Link>
          <Link
            href="/contact"
            className="hover:text-primary text-lg font-semibold transition-colors"
          >
            اتصل بنا
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default MobileMenu;
