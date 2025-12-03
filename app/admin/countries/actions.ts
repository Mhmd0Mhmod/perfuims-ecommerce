"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { AddCountrySchema } from "@/lib/zod";

export async function addCountry(data: AddCountrySchema) {
  try {
    const respone = await axiosInstance.post("admin/countries", data);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function updateCountry(countryId: number, data: Partial<AddCountrySchema>) {
  try {
    const respone = await axiosInstance.patch(`admin/countries/${countryId}`, data);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}
export async function deleteCountry(countryId: number) {
  try {
    const respone = await axiosInstance.delete(`admin/countries/${countryId}`);
    return respone;
  } catch (error) {
    return ErrorResponse(error);
  }
}
