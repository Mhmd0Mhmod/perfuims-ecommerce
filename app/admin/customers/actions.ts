"use server";

import AxiosServerInstance from "@/lib/axios-server";
import { ErrorResponse } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteCustomerAction(customerId: number | string) {
  try {
    const axiosInstance = await AxiosServerInstance();
    await axiosInstance.delete(`admin/users/${customerId}`);
    revalidatePath("/admin/customers");
  } catch (error) {
    return ErrorResponse(error);
  }
}
