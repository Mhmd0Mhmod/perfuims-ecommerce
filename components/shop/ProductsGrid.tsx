"use client";

import { useProducts } from "@/hooks/use-products";
import ProductCard from "../products/ProductCard";
import CardSkeleton from "../shared/card-skeleton";
import { useSelectedCountry } from "@/hooks/use-selected-country";

function ProductsGrid({ limit = 4 }: { limit?: number }) {
  const { selectedCountry: country } = useSelectedCountry();
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
  if (!country) {
    return <div>يرجى اختيار الدولة لعرض المنتجات</div>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products?.content?.slice(0, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default ProductsGrid;
