import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <nav className="mt-8 flex flex-col gap-4">
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
