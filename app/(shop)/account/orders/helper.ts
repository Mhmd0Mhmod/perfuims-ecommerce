import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Order } from "@/types/order";

export async function getUserOrders() {
  try {
    const { data } = await authFetcher.get<Pagination<Order>>("/orders");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getUserOrderById(orderNumber: string) {
  try {
    const { data } = await authFetcher.get<Order>(`/orders/${orderNumber}`);
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
