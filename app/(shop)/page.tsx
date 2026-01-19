import HeroShopPage from "@/components/shop/HeroShopPage";
import PromoBanner from "@/components/shop/PromoBanner";
import Features from "@/components/shop/Features";
import FeaturedProducts from "@/components/shop/FeaturedProducts";
import Categories from "@/components/categories/Categories";
import Newsletter from "@/components/shop/Newsletter";
import Footer from "@/components/shop/Footer";

export default function Home() {
  return (
    <>
      <PromoBanner />
      <FeaturedProducts />
      <HeroShopPage />
      <Categories />
      <Features />
      <Newsletter />
      <Footer />
    </>
  );
}
