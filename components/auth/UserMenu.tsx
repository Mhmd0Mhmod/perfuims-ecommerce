import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Roles } from "@/types/roles";
import type { LucideIcon } from "lucide-react";
import { Heart, LayoutDashboard, LogOut, Package, Settings, User as UserIcon } from "lucide-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { UserAvatar } from "./UserAvatar";

interface MenuItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const MENU_ITEMS: MenuItem[] = [
  { href: "/account", label: "الملف الشخصي", icon: UserIcon },
  { href: "/account/orders", label: "طلباتي", icon: Package },
  { href: "/account/wishlist", label: "المفضلة", icon: Heart },
  { href: "/account/settings", label: "الإعدادات", icon: Settings },
];
const ADMIN_MENU_ITEMS: MenuItem[] = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export function UserMenu({ user }: { user: User }) {
  const MENU = user.role === Roles.ADMIN ? ADMIN_MENU_ITEMS : MENU_ITEMS;
  const logout = async () => {
    const id = toast.loading("جارٍ تسجيل الخروج...");
    signOut({ redirect: false });

    toast.success("تم تسجيل الخروج بنجاح!", { id });
  };
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size="icon-lg">
          <UserAvatar user={user} size="sm" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" forceMount>
        <DropdownMenuLabel className="p-0">
          <div className="flex flex-row-reverse items-center gap-3 p-4">
            <div className="flex-1 text-right">
              <p className="text-sm leading-none font-semibold">{user.fullName || user.username}</p>
              <p className="text-muted-foreground mt-1 text-xs">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {MENU.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className="hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-2 text-right text-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-right text-sm"
        >
          <LogOut className="h-4 w-4" />
          تسجيل الخروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
