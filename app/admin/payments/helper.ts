import { authFetcher } from "@/lib/authFetcher";
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
export async function getAdminPaymentsStatus() {
  try {
    const { data } = await authFetcher.get<{
      totalPayments: number;
      pendingPayments: number;
      completedPayments: number;
      failedPayments: number;
      refundedPayments: number;
      visaPayments: number;
      cashOnDeliveryPayments: number;
      visaAmount: number;
      cashOnDeliveryAmount: number;
    }>("admin/payments/statistics");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
