import { getOffers } from "@/app/(shop)/helper";
import { useQuery } from "@tanstack/react-query";

export function useOffers() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffers,
  });
}
