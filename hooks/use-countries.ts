"use client";
import { getAllCountries } from "@/app/admin/countries/helpers";
import { useQuery } from "@tanstack/react-query";

const useCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    refetchOnWindowFocus: false,
    staleTime: "static",
  });
export { useCountries };
