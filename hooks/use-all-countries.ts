"use client";
import { getAllCountries } from "@/app/admin/countries/helpers";
import { useQuery } from "@tanstack/react-query";

const useAllCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getAllCountries,
    staleTime: "static",
    initialData: [],
  });
export { useAllCountries };
