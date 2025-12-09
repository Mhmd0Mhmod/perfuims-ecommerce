"use client";

import { useProducts } from "@/hooks/use-products";
import ProductCard from "../products/ProductCard";
import CardSkeleton from "../shared/card-skeleton";

function ProductsGrid({ limit = 4 }: { limit?: number }) {
  const { data: products, isFetching } = useProducts();
  if (isFetching) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products?.content.slice(0, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default ProductsGrid;
