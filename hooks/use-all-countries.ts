"use client";
import { CountryAPI } from "@/lib/api/country";
import { useQuery } from "@tanstack/react-query";

const useAllCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: CountryAPI.getCountries,
    staleTime: "static",
  });
export { useAllCountries };
