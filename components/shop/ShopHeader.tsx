import { getCountries } from "@/app/(shop)/helper";
import CategoryBar from "../categories/CategoryBar";
import SelectCountry from "../country/SelectCountry";
import SearchBar from "../shared/SearchBar";
import HeaderActions from "./HeaderActions";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

async function ShopHeader() {
  const countries = await getCountries();
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <MobileMenu />
          <Logo />
          <SearchBar className="hidden max-w-md flex-1 lg:flex" />
          <div className="flex items-center gap-4">
            <SelectCountry countries={countries || []} />
            <HeaderActions />
          </div>
        </div>
        <SearchBar className="pb-4 lg:hidden" />
      </div>
      <CategoryBar />
    </>
  );
}
export default ShopHeader;
