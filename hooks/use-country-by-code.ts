import { CountryAPI } from "@/lib/api/country";
import { useQuery } from "@tanstack/react-query";

function useCountryByCode(code: string) {
  return useQuery({
    queryKey: ["country-by-code", code],
    queryFn: () => CountryAPI.getCountryByCode(code),
  });
}
export default useCountryByCode;
