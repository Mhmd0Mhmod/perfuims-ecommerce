"use server";

import { fetchGET } from "@/lib/fetch";
import { ErrorResponse } from "@/lib/utils";
export async function getCountryByCode(code: string): Promise<ApiResponse<Country>> {
  try {
    const response = await fetchGET<Country[]>(`/countries`, {
      cache: "force-cache",
    });

    const country = response.find((country) => country.code === code) || null;
    if (!country) {
      return {
        status: 404,
        success: false,
      };
    }
    return {
      data: country,
      status: 200,
      success: true,
    };
  } catch (error) {
    return ErrorResponse<Country>(error);
  }
}
