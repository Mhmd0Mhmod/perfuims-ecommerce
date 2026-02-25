import { PaymentAPI } from "@/lib/api/payment";
import { Pageable } from "@/types/pageable";
import { Payment } from "@/types/payment";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAdminPayments(params: {
  page: number;
  status?: string;
}): UseQueryResult<Pageable<Payment>> {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: async () => {
      const response = await PaymentAPI.getAdminPayments(params);
      return response;
    },
  });
}
