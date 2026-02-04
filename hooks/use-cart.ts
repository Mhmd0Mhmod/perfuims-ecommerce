import { CartAPI } from "@/lib/api/cart";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useCart() {
  const { status } = useSession();
  return useQuery({
    queryKey: ["cart"],
    queryFn: CartAPI.getCart,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: status === "authenticated",
  });
}
