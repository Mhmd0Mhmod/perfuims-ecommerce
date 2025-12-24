"use server";

import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteCustomerAction(customerId: number | string) {
  try {
    await authFetcher.delete(`admin/users/${customerId}`);
    revalidatePath("/admin/customers");
  } catch (error) {
    return ErrorResponse(error);
  }
}
