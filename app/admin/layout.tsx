import ASidebar from "@/components/admin/ASidebar";
import SelectCountry from "@/components/country/SelectCountry";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCountries } from "../(shop)/helper";
import { getCookies } from "../(auth)/action";
import { cookies } from "next/headers";
async function layout({ children }: { children: React.ReactNode }) {
  const countries = await getCountries();
  const cookiesStore = await cookies();
  const countryCookie = cookiesStore.get("country")?.value;
  return (
    <SidebarProvider>
      <ASidebar />
      <SidebarInset>
        <header className="flex items-center justify-between p-5">
          <SidebarTrigger />
          <SelectCountry countries={countries || []} defaultCountry={countryCookie} />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default layout;
