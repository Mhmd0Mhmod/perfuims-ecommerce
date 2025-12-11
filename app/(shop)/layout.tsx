import AnimatedCanvas from "@/components/design/AnimatedCanvas";
import ShopHeader from "@/components/shop/ShopHeader";
import CountryProvider from "@/context/CountryProvider";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <CountryProvider>
      <AnimatedCanvas />
      <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
        <ShopHeader />
      </header>
      <main>{children}</main>
    </CountryProvider>
  );
}
export default layout;
