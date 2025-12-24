import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Order } from "@/types/order";

export async function getAdminOrders() {
  try {
    const { data } = await authFetcher.get<Pagination<Order>>("/admin/orders");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data } = await authFetcher.get<Order>(`/admin/orders/${orderId}`);
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
