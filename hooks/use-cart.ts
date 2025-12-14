import { getCart } from "@/app/helper";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
