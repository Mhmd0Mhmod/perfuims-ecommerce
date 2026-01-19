import { OfferAPI } from "@/lib/api/offer";
import { useQuery } from "@tanstack/react-query";

export function useOffers() {
  return useQuery({
    queryKey: ["offers"],
    queryFn: OfferAPI.getOffers,
  });
}
