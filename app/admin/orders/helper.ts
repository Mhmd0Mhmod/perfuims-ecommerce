import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Order } from "@/types/order";
import axios from "axios";

export async function getAdminOrders(page: number) {
  try {
    const { data } = await axios.get<Pagination<Order>>("/api/admin/orders");
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
