import { CartAPI } from "@/lib/api/cart";
import { useQuery } from "@tanstack/react-query";

export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: CartAPI.getCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
