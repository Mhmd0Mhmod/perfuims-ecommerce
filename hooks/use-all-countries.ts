"use client";
import { useQuery } from "@tanstack/react-query";
import { getCountries } from "@/app/(shop)/helper";

const useAllCountries = () =>
  useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
    staleTime: "static",
  });
export { useAllCountries };
