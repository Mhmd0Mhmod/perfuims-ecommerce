import { throwingError } from "@/lib/utils";
import { Payment } from "@/types/payment";
import axios from "axios";

export async function getAdminPayments(page: number) {
  try {
    const { data } = await axios.get<Pagination<Payment>>("/api/admin/payments", {
      params: { page },
    });
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
