import ASidebar from "@/components/admin/ASidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
