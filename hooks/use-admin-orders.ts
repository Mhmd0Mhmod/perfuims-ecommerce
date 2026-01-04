import { getAdminOrders } from "@/app/admin/orders/helper";
import { Order } from "@/types/order";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAdminOrders(params: {
  page: number;
  status?: string;
  period?: string;
}): UseQueryResult<Pagination<Order>> {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: async () => {
      const response = await getAdminOrders(params);
      return response;
    },
  });
}
