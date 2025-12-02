import HeroShopPage from "@/components/shop/HeroShopPage";
import PromoBanner from "@/components/shop/PromoBanner";
import Features from "@/components/shop/Features";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import Categories from "@/components/shop/Categories";
import Newsletter from "@/components/shop/Newsletter";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <HeroShopPage />
      <Features />
      <FeaturedProducts />
      <Categories />
      <Newsletter />
    </>
  );
}
