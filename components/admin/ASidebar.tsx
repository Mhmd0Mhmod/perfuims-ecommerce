import { Button } from "@/components/ui/button";
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
  FolderTree,
  Globe,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import ActiveLink from "../shared/active-link";

const menuItems = [
  {
    title: "لوحة التحكم",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "النطاقات",
    url: "/admin/countries",
    icon: Globe,
  },
  {
    title: "المنتجات",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "الطلبات",
    url: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "العملاء",
    url: "/admin/customers",
    icon: Users,
  },
  {
    title: "التصنيفات",
    url: "/admin/categories",
    icon: FolderTree,
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
            <SidebarMenuButton className="flex items-center gap-2" size="lg">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg">
                <Package className="text-primary-foreground h-6 w-6" />
              </div>
              <div className="text-right">
                <h2 className="text-lg font-bold">لوحة الإدارة</h2>
                <p className="text-muted-foreground text-xs">متجر العطور</p>
              </div>
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
                  <SidebarMenuButton asChild>
                    <ActiveLink
                      href={item.url}
                      className="flex items-center gap-3"
                      activeClassName="bg-primary/10 text-primary"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </ActiveLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="outline" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                <span>تسجيل الخروج</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
export default ASidebar;
