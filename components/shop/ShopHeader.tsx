import { getCountriesServer } from "@/app/(shop)/helper";
import SelectCountry from "../country/SelectCountry";
import SearchBar from "../shared/SearchBar";
import HeaderActions from "./HeaderActions";
import Logo from "./Logo";
import Menu from "./Menu";
import { getCookies } from "@/app/(auth)/helper";

async function ShopHeader() {
  const [countries, selectedCountryCode] = await Promise.all([
    getCountriesServer(),
    getCookies("country"),
  ]);
  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Mobile Menu Group */}
          <div className="flex items-center gap-2">
            <Menu countries={countries} />
            <Logo />
          </div>

          {/* Search Bar - Desktop */}
          <SearchBar className="hidden max-w-sm flex-1 lg:flex" />

          {/* Actions Group */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <SelectCountry countries={countries} selectedCountryCode={selectedCountryCode} />
            </div>
            <HeaderActions />
          </div>
        </div>

        {/* Search Bar - Mobile & Tablet */}
        <div className="pb-4 lg:hidden">
          <SearchBar className="w-full" />
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
