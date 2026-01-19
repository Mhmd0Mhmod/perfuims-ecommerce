import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BadgePercent,
  FolderTree,
  Globe,
  LayoutDashboard,
  Package,
  Ruler,
  Settings,
  ShoppingCart,
  Users,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import ActiveLink from "../shared/active-link";
import UserMenu from "./UserMenu";
import { getUser } from "@/app/(auth)/actions";

const menuItems = [
  {
    title: "لوحة التحكم",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "المنتجات",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "التصنيفات",
    url: "/admin/categories",
    icon: FolderTree,
  },
  {
    title: "أحجام",
    url: "/admin/sizes",
    icon: Ruler,
  },
  {
    title: "العروض",
    url: "/admin/offers",
    icon: BadgePercent,
  },
  {
    title: "الطلبات",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "المدفوعات",
    url: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "العملاء",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "النطاقات",
    url: "/admin/countries",
    icon: Globe,
  },
  {
    title: "الإعدادات",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function ASidebar() {
  return (
    <Sidebar side={"right"} collapsible="icon" variant="inset">
      <SidebarHeader className="border-b p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                  <Package className="text-primary-foreground h-6 w-6" />
                </div>
                <div className="text-right">
                  <h2 className="text-lg font-bold">لوحة الإدارة</h2>
                  <p className="text-muted-foreground text-xs">متجر العطور</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-right">القائمة الرئيسية</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <ActiveLink
                    href={item.url}
                    className="flex cursor-pointer items-center gap-3 rounded-md"
                    activeClassName="bg-primary/10 text-primary"
                  >
                    <SidebarMenuButton tooltip={item.title} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </ActiveLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <UserMenuTrigger />
      </SidebarFooter>
    </Sidebar>
  );
}
async function UserMenuTrigger() {
  const user = await getUser();
  return <UserMenu user={user} />;
}
export default ASidebar;
