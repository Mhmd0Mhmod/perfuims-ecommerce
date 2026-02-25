import { Order, OrderSearchParams } from "@/types/order";
import axios from "@/lib/axios";
import { authFetcher } from "../authFetcher";
import { throwingError } from "../utils";
import { Pageable } from "@/types/pageable";
export class OrderAPI {
  static async getUserOrders(params?: OrderSearchParams) {
    try {
      const { data } = await authFetcher.get<Pageable<Order>>("/orders", {
        params,
      });
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getUserOrderById(orderNumber: string) {
    try {
      const { data } = await authFetcher.get<Order>(`/orders/${orderNumber}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getAdminOrderStatus() {
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

  static async getAdminOrdersServer(params: {
    page: number;
    status?: string;
    period?: string;
  }): Promise<Pageable<Order>> {
    try {
      const { data } = await authFetcher.get<Pageable<Order>>("/admin/orders", {
        params,
      });
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getOrderById(orderId: string) {
    try {
      const { data } = await authFetcher.get<Order>(`/admin/orders/${orderId}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
