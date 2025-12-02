import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Search Icon - Mobile Only */}
      <Button variant="ghost" size="icon" className="lg:hidden">
        <Search className="h-5 w-5" />
      </Button>

      {/* Wishlist */}
      <Button variant="ghost" size="icon" className="relative">
        <Heart className="h-5 w-5" />
        <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
          3
        </Badge>
      </Button>

      {/* Cart */}
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        <Badge className="bg-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
          5
        </Badge>
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="text-right">حسابي</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="w-full text-right">
              الملف الشخصي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/orders" className="w-full text-right">
              طلباتي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/wishlist" className="w-full text-right">
              المفضلة
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/settings" className="w-full text-right">
              الإعدادات
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive cursor-pointer">
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderActions;
