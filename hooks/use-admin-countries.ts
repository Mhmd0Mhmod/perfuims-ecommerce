"use client";
import { getAdminCountries } from "@/app/admin/countries/helpers";
import { useQuery } from "@tanstack/react-query";

const useAdminCountries = () =>
  useQuery({
    queryKey: ["admin-countries"],
    queryFn: async () => {
      const response = await getAdminCountries();
      return response;
    },
  });

export { useAdminCountries };
