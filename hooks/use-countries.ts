import { getCountries } from "@/app/[locale]/(shop)/helper";
import { useQuery } from "@tanstack/react-query";

export function useCountries(onSuccess?: (countries: Country[]) => void) {
  const query = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await getCountries();
      onSuccess?.(response);
      return response;
    },
    staleTime: "static",
  });
  return query;
}
