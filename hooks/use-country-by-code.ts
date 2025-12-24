import { getCountryByCode } from "@/app/(shop)/helper";
import { useQuery } from "@tanstack/react-query";

function useCountryByCode(code: string) {
  return useQuery({
    queryKey: ["country-by-code", code],
    queryFn: () => getCountryByCode(code),
  });
}
export default useCountryByCode;
