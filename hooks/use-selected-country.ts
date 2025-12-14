"use client";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useCountryByCode from "./use-country-by-code";

export function useSelectedCountry() {
  const queryClient = useQueryClient();
  const selectedCountry = getCookie("country");
  const { data: selectedCountryEntry } = useCountryByCode(selectedCountry as string);
  const router = useRouter();
  const setSelectedCountry = useCallback(
    (code: string) => {
      setCookie("country", code);
      router.refresh();
      queryClient.invalidateQueries();
    },
    [router, queryClient],
  );
  return {
    selectedCountry,
    selectedCountryEntry,
    setSelectedCountry,
  };
}
