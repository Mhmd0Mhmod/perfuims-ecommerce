"use client";
import { Heart, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import UserMenu from "../auth/UserMenu";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

function HeaderActions() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }
  if (status !== "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="ghost" size="sm">
            تسجيل الدخول
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">إنشاء حساب</Button>
        </Link>
      </div>
    );
  }

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
      <UserMenu user={session.user} />
    </div>
  );
}

export default HeaderActions;
