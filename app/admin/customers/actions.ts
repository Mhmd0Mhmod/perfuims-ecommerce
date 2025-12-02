"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";

export async function deleteCustomerAction(customerId: number | string) {
  try {
    await axiosInstance.delete(`admin/users/${customerId}`);
  } catch (error) {
    return ErrorResponse(error);
  }
}
