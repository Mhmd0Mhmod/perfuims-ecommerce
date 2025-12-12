import { getProducts } from "@/app/[locale]/(shop)/helper";
import { ProductsState } from "@/context/ProductsContext";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { useSelectedCountry } from "./use-selected-country";

export function useProducts(params?: Partial<ProductsState>) {
  const { selectedCountry } = useSelectedCountry();
  return useQuery({
    queryKey: ["products", selectedCountry?.id, ...Object.values(params || {})],
    queryFn: () => getProducts({ ...params, countryId: selectedCountry?.id }),
    initialData: {} as Pagination<Product>,
  });
}
