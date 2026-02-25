import { PaymentAPI } from "@/lib/api/payment";
import { Pagination } from "@/types/pagination";
import { Payment } from "@/types/payment";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAdminPayments(params: {
  page: number;
  status?: string;
}): UseQueryResult<Pagination<Payment>> {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: async () => {
      const response = await PaymentAPI.getAdminPayments(params);
      return response;
    },
  });
}
