"use client";

import { useProductsContext } from "@/context/ProductsContext";
import { useProducts } from "@/hooks/use-products";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import InfiniteScroll from "react-infinite-scroll-component";
import CardSkeleton from "../shared/card-skeleton";
import ProductCard from "./ProductCard";

function ProductsGrid() {
  const { filters } = useProductsContext();
  const { data, isLoading, fetchNextPage, hasNextPage } = useProducts({
    searchTerm: filters.searchTerm,
    categoryIds: filters.categoryIds,
    offerIds: filters.offerIds,
  });
  const { selectedCountry } = useSelectedCountry();
  const products = data?.pages.flatMap((page) => page.content);

  if (!isLoading && products?.length === 0) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">لا توجد منتجات متاحة</p>
        </div>
      </div>
    );
  }
  if (!selectedCountry) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">يرجى اختيار دولة للعرض</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={products?.length || 0}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="col-span-full mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          }
          next={fetchNextPage}
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}

export default ProductsGrid;
