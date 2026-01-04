import { getAdminOrders } from "@/app/admin/orders/helper";
import { Order } from "@/types/order";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

export function useAdminOrders(page: number): UseQueryResult<Pagination<Order>> {
  return useQuery({
    queryKey: ["admin-orders", page],
    queryFn: async () => {
      const response = await getAdminOrders(page);
      return response;
    },
  });
}
