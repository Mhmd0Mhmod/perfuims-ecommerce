import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import LogoutButton from "../auth/LogoutButton";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
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
            <Link href="/account" className="w-full text-right">
              الملف الشخصي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/account/orders" className="w-full text-right">
              طلباتي
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/account/wishlist" className="w-full text-right">
              المفضلة
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/account/settings" className="w-full text-right">
              الإعدادات
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive cursor-pointer">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default HeaderActions;
