import { getCountriesServer } from "@/app/(shop)/helper";
import ASidebar from "@/components/admin/ASidebar";
import SelectCountry from "@/components/country/SelectCountry";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PublicCountry } from "@/types/country";

async function layout({ children }: { children: React.ReactNode }) {
  let countries: PublicCountry[] = [];

  try {
    countries = await getCountriesServer();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }

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
