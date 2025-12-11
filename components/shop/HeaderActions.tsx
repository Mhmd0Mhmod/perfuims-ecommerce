"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserMenu from "../auth/UserMenu";
import CartButton from "../cart/CartButton";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import WishlistButton from "../wishlist/WishlistButton";
import SelectCountry from "../country/SelectCountry";

function HeaderActions() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }
  if (status !== "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <SelectCountry />
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
      <SelectCountry />
      {/* Wishlist */}
      <WishlistButton />
      {/* Cart */}
      <CartButton />
      {/* User Menu */}
      <UserMenu user={session.user} />
    </div>
  );
}

export default HeaderActions;
