import { getCountriesServer } from "@/app/(shop)/helper";
import ASidebar from "@/components/admin/ASidebar";
import SelectCountry from "@/components/country/SelectCountry";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

async function layout({ children }: { children: React.ReactNode }) {
  const countries = await getCountriesServer();

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
