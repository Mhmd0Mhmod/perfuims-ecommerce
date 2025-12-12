import { getAllCategories } from "@/app/[locale]/(shop)/helper";
import { useQuery } from "@tanstack/react-query";
import { useSelectedCountry } from "./use-selected-country";
export function useCategories() {
  const { selectedCountry } = useSelectedCountry();
  const query = useQuery({
    queryKey: ["categories-home", selectedCountry?.id],
    queryFn: () => getAllCategories(selectedCountry?.id),
    staleTime: "static",
  });
  return query;
}
