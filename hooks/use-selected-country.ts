import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { useCountries } from "./use-countries";

export function useSelectedCountry() {
  const pathName = usePathname();
  const urlCountry = pathName.split("/").at(1);
  const router = useRouter();
  const { data: countries } = useCountries();
  const selectedCountry = countries?.find((country) => country.code === urlCountry);
  const setSelectedCountry = useCallback(
    (country: Country) => {
      const newPath = pathName.replace(`/${urlCountry}`, `/${country.code.toLowerCase()}`);
      router.push(newPath);
    },
    [urlCountry, pathName, router],
  );
  const setSelectedCountryById = useCallback(
    (countryId: number) => {
      const country = countries?.find((c) => c.id === countryId);
      if (country) {
        const newPath = pathName.replace(`/${urlCountry}`, `/${country.code.toLowerCase()}`);
        router.push(newPath);
      }
    },
    [urlCountry, pathName, router, countries],
  );
  return {
    selectedCountry,
    setSelectedCountry,
    setSelectedCountryById,
  };
}
