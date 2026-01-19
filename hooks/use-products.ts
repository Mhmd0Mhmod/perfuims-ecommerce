import { ProductsState } from "@/context/ProductsContext";
import { ProductAPI } from "@/lib/api/product";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params?: Partial<ProductsState>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductAPI.getProducts(params!),
    initialData: {} as Pagination<Product>,
  });
}
