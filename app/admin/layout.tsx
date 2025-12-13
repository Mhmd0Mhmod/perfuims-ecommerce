import ASidebar from "@/components/admin/ASidebar";
import SelectCountry from "@/components/country/SelectCountry";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCountries } from "../(shop)/helper";
async function layout({ children }: { children: React.ReactNode }) {
  const countries = await getCountries();
  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
          <SelectCountry countries={countries || []} />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
