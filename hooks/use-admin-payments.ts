import { getAdminPayments } from "@/app/admin/payments/helper";
import { Payment } from "@/types/payment";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAdminPayments(params: {
  page: number;
  status?: string;
}): UseQueryResult<Pagination<Payment>> {
  return useQuery({
    queryKey: ["admin-payments", params],
    queryFn: async () => {
      const response = await getAdminPayments(params);
      return response;
    },
  });
}
