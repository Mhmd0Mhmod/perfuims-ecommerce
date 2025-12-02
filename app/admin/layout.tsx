import ASidebar from "@/components/admin/ASidebar";
import UserMenu from "@/components/auth/UserMenu";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/auth";

async function layout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
          <UserMenu user={user} />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
