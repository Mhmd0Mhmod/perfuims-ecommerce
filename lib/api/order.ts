import { Order } from "@/types/order";
import axios from "axios";
import { authFetcher } from "../authFetcher";
import { throwingError } from "../utils";
export class OrderAPI {
  static async getUserOrders() {
    try {
      const { data } = await authFetcher.get<Pagination<Order>>("/orders");
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

  static async getAdminOrders(params: {
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

  static async getOrderById(orderId: string) {
    try {
      const { data } = await authFetcher.get<Order>(`/admin/orders/${orderId}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
