"use client";
import { getCountries } from "@/app/admin/countries/actions";
import { useQuery } from "@tanstack/react-query";

const useAdminCountries = () =>
  useQuery({
    queryKey: ["admin-countries"],
    queryFn: async () => {
      const response = await getCountries();
      return response.data;
    },
  });

export { useAdminCountries };
