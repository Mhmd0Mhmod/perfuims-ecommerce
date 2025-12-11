"use client";
import { getCountries } from "@/app/[locale]/(shop)/helper";
import { useQuery } from "@tanstack/react-query";

const useAdminCountries = () =>
  useQuery({
    queryKey: ["admin-countries"],
    queryFn: async () => {
      const response = await getCountries();
      return response;
    },
  });

export { useAdminCountries };
