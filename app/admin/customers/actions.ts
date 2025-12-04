"use server";

import axiosInstance from "@/lib/axios";
import { ErrorResponse } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteCustomerAction(customerId: number | string) {
  try {
    await axiosInstance.delete(`admin/users/${customerId}`);
    revalidatePath("/admin/customers");
  } catch (error) {
    return ErrorResponse(error);
  }
}
