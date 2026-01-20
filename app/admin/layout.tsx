import ASidebar from "@/components/admin/ASidebar";
import SelectCountry from "@/components/country/SelectCountry";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CountryAPI } from "@/lib/api/country";
export const dynamic = "force-dynamic";
async function layout({ children }: { children: React.ReactNode }) {
  const countries = await CountryAPI.getCountriesServer();

  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
          <SelectCountry countries={countries} />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
