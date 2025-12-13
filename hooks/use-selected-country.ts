"use client";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useSelectedCountry() {
  const router = useRouter();
  const selectedCountry = getCookie("country") as string;
  const setSelectedCountry = useCallback(
    (code: string) => {
      setCookie("country", code);
      router.refresh();
    },
    [router],
  );
  return {
    selectedCountry,
    setSelectedCountry,
  };
}
