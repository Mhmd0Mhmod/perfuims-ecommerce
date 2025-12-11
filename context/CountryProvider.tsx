"use client";
import { useCountries } from "@/hooks/use-countries";
import { createContext, useContext, useState } from "react";

const CountryContext = createContext<{
  country: Country | undefined;
  setCountry: (country: Country | undefined) => void;
  isFetching: boolean;
  countries: Country[];
} | null>(null);

function CountryProvider({ children }: { children: React.ReactNode }) {
  const [selectCountry, setSelectedCountry] = useState<Country>();

  const { data: countries, isFetching } = useCountries((data) => {
    if (data && data.length > 0) {
      setSelectedCountry(data[0]);
    }
  });

  return (
    <CountryContext.Provider
      value={{
        country: selectCountry,
        setCountry: setSelectedCountry,
        isFetching,
        countries: countries || [],
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountryContext() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryProvider");
  }
  return context;
}
export default CountryProvider;
