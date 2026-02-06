import { ProductsState } from "@/context/ProductsContext";
import { ProductAPI } from "@/lib/api/product";
import { Product } from "@/types/product";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useProducts(params?: Partial<ProductsState>) {
  console.log(params);

  return useInfiniteQuery({
    queryKey: ["products", params],
    initialPageParam: 0,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      ProductAPI.getProducts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage: Pagination<Product>) => {
      if (!lastPage.last) {
        return lastPage.number + 1;
      }
    },
  });
}
