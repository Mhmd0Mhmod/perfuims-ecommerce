import { getCountries } from "@/app/(shop)/helper";
import CategoryBar from "../categories/CategoryBar";
import SelectCountry from "../country/SelectCountry";
import SearchBar from "../shared/SearchBar";
import HeaderActions from "./HeaderActions";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { getCookies } from "@/app/(auth)/action";
import { NavLinks } from "./NavLinks";

async function ShopHeader() {
  const countries = await getCountries();
  const code = await getCookies("country");

  return (
    <header className="bg-background sticky top-0 z-50 w-full border-b shadow-sm">
      <div className="container mx-auto px-4">
        {/* Main Header Row */}
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Mobile Menu Group */}
          <div className="flex items-center gap-2">
            <MobileMenu countries={countries || []} defaultCountry={code} />
            <Logo />
          </div>

          {/* Desktop Navigation */}
          {/* <NavLinks className="hidden lg:flex lg:gap-8" /> */}

          {/* Search Bar - Desktop */}
          <SearchBar className="hidden max-w-sm flex-1 lg:flex" />

          {/* Actions Group */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:block">
              <SelectCountry countries={countries || []} defaultCountry={code} />
            </div>
            <HeaderActions />
          </div>
        </div>

        {/* Search Bar - Mobile & Tablet */}
        <div className="pb-4 lg:hidden">
          <SearchBar className="w-full" />
        </div>
      </div>

      {/* Secondary Desktop Navbar (Categories) */}
      <div className="border-muted/30 border-t">
        <div className="container mx-auto hidden overflow-x-auto px-4 md:block">
          <CategoryBar />
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
