import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

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
      <Button variant="ghost" size="icon">
        <Link href="/account" passHref>
          <User className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}

export default HeaderActions;
