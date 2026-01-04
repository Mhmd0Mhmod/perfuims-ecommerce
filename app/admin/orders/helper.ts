import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Order } from "@/types/order";
import axios from "axios";

export async function getAdminOrderStatus() {
  try {
    const { data } = await authFetcher.get<{
      totalOrders: number;
      pendingOrders: number;
      confirmedOrders: number;
      shippedOrders: number;
      deliveredOrders: number;
      cancelledOrders: number;
    }>("admin/orders/statistics");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}

export async function getAdminOrders(params: {
  page: number;
  status?: string;
  period?: string;
}): Promise<Pagination<Order>> {
  try {
    const { data } = await axios.get<Pagination<Order>>("/api/admin/orders", {
      params,
    });
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
