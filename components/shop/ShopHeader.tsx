import { getCookies } from "@/app/actions";
import { CountryAPI } from "@/lib/api/country";
import { PublicCountry } from "@/types/country";
import SelectCountry from "../country/SelectCountry";
import SearchBar from "../shared/SearchBar";
import HeaderActions from "./HeaderActions";
import Logo from "./Logo";
import Menu from "./Menu";

async function ShopHeader() {
  let countries: PublicCountry[] = [];
  let selectedCountryCode: string | undefined;

  try {
    [countries, selectedCountryCode] = await Promise.all([
      CountryAPI.getCountriesServer(),
      getCookies("country"),
    ]);
  } catch (error) {
    console.error("Error fetching countries:", error);
    // Continue with empty countries array - the UI will handle this gracefully
  }
  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/95 border-b-primary sticky top-0 z-50 w-full rounded border-b shadow-sm backdrop-blur">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Main Header Row */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Menu countries={countries} />
            <SearchBar className="hidden max-w-md flex-1 lg:flex" />
          </div>
          <div className="ml-auto md:ml-0">
            <Logo />
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:block">
              <SelectCountry countries={countries} selectedCountryCode={selectedCountryCode} />
            </div>
            <HeaderActions />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pt-2 pb-3 lg:hidden">
          <SearchBar className="w-full" />
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
