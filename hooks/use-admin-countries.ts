"use client";
import { CountryAPI } from "@/lib/api/country";
import { useQuery } from "@tanstack/react-query";

const useAdminCountries = () =>
  useQuery({
    queryKey: ["admin-countries"],
    queryFn: CountryAPI.getAdminCountries,
  });

export { useAdminCountries };
