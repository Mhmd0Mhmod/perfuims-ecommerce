import MobileMenu from "./MobileMenu";
import Logo from "./Logo";
import SearchBar from "../shared/SearchBar";
import HeaderActions from "./HeaderActions";
import CategoryBar from "../categories/CategoryBar";

function ShopHeader() {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <MobileMenu />
          <Logo />
          <SearchBar className="hidden max-w-md flex-1 lg:flex" />
          <HeaderActions />
        </div>
        <SearchBar className="pb-4 lg:hidden" />
      </div>
      <CategoryBar />
    </>
  );
}
export default ShopHeader;
