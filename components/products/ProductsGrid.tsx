"use client";

import { useProductsContext } from "@/context/ProductsContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import CardSkeleton from "../shared/card-skeleton";
import { useSelectedCountry } from "@/hooks/use-selected-country";

function ProductsGrid() {
  const { products, isFetching, filters, dispatch } = useProductsContext();
  const { selectedCountry } = useSelectedCountry();
  const hasMore = products ? !products.last : false;
  const items = products?.content ?? [];

  const fetchMoreData = () => {
    if (!isFetching && hasMore) {
      dispatch({ type: "SET_PAGE", payload: filters.page + 1 });
    }
  };

  if (isFetching && items.length === 0) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!isFetching && items.length === 0) {
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
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="col-span-full mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </InfiniteScroll>
  );
}

export default ProductsGrid;
