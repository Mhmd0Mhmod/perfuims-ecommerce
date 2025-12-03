import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

interface MenuItem {
  href: string;
  label: string;
}

const MENU_ITEMS: MenuItem[] = [
  { href: "/account", label: "الملف الشخصي" },
  { href: "/account/orders", label: "طلباتي" },
  { href: "/account/wishlist", label: "المفضلة" },
  { href: "/account/settings", label: "الإعدادات" },
];

export async function UserMenu() {
  const user = (await auth())?.user;
  if (!user) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-0"
          aria-label="قائمة المستخدم"
        >
          <UserAvatar user={user} size="sm" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-64 p-0">
        <div className="flex flex-row-reverse items-center gap-3 p-4">
          <div className="flex-1 text-right">
            <p className="text-sm leading-none font-semibold">{user.fullName || user.username}</p>
            <p className="text-muted-foreground mt-1 text-xs">{user.email}</p>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:bg-accent hover:text-accent-foreground flex w-full cursor-pointer items-center rounded-sm px-2 py-2 text-right text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default UserMenu;
