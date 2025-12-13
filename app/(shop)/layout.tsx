import AnimatedCanvas from "@/components/design/AnimatedCanvas";
import ShopHeader from "@/components/shop/ShopHeader";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnimatedCanvas />
      <header className="bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur">
        <ShopHeader />
      </header>
      <main>{children}</main>
    </>
  );
}
export default layout;
