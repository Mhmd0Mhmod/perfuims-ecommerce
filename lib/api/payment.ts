import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Payment } from "@/types/payment";
import axios from "@/lib/axios";
import { Pagination } from "@/types/pagination";

export class PaymentAPI {
  static async getAdminPayments(params: {
    page: number;
    status?: string;
  }): Promise<Pagination<Payment>> {
    try {
      const { data } = await axios.get<Pagination<Payment>>("/api/admin/payments", {
        params,
      });
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAdminPaymentsStatus() {
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
}
