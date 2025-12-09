import { getProducts } from "@/app/(shop)/helper";
import { ProductsState } from "@/context/ProductsContext";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params: Partial<ProductsState>) {
  return useQuery({
    queryKey: ["products", ...Object.values(params)],
    queryFn: () => getProducts(params),
    initialData: {} as Pagination<Product>,
  });
}
