import { CountryAPI } from "@/lib/api/country";
import { PublicCountry } from "@/types/country";
import { useQuery } from "@tanstack/react-query";

export function useCountries(onSuccess?: (countries: PublicCountry[]) => void) {
  const query = useQuery<PublicCountry[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await CountryAPI.getCountries();
      onSuccess?.(response);
      return response;
    },
    staleTime: "static",
  });
  return query;
}
