import { ProductAPI } from "@/lib/api/product";
import { Category } from "@/types/category";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import ProductCard from "../products/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Suspense } from "react";
import CardSkeleton from "../shared/card-skeleton";

interface CategoryProductsCarouselProps {
  category: Category;
  countryCode?: string;
}

export default function CategoryProducts({ category, countryCode }: CategoryProductsCarouselProps) {
  const { id, name: categoryName, description: categoryDescription } = category;
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <Link href={`/products?category=${id}`} className="group flex items-center gap-3">
          <div className="bg-primary/10 group-hover:bg-primary/20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors">
            <Sparkles className="text-primary h-7 w-7" />
          </div>
          <div>
            <h2 className="group-hover:text-primary text-3xl font-bold transition-colors">
              {categoryName}
            </h2>
            {categoryDescription && (
              <p className="text-muted-foreground mt-1 text-sm">{categoryDescription}</p>
            )}
          </div>
        </Link>
        <Link
          href={`/products?category=${id}`}
          className="text-primary hover:text-primary/80 flex items-center gap-2 text-sm font-medium transition-colors hover:underline"
        >
          عرض الكل
          <ArrowLeft />
        </Link>
      </div>
      <Suspense
        fallback={
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        }
      >
        <CategoryProductsCarousel category={category} countryCode={countryCode} />
      </Suspense>
    </div>
  );
}

async function CategoryProductsCarousel({ category, countryCode }: CategoryProductsCarouselProps) {
  const products = await ProductAPI.getProductsServer(
    {
      categorieIds: [category.id.toString()],
    },
    countryCode,
  );
  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 1,
        direction: "rtl",
      }}
      className="container"

    >
      <CarouselContent >
        {products.content.map((product) => (
          <CarouselItem
            key={product.id}
            className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="relative mt-10 flex items-center justify-center gap-2">
        <CarouselNext className="static" />
        <CarouselPrevious className="static" />
      </div>
    </Carousel>
  );
}
