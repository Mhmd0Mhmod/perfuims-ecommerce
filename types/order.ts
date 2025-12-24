interface Order {
  orderId: never;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  countryCode: string;
  items: OrderItem[];
}
interface OrderItem {
  productVariantId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
}
const ORDER_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type { Order, OrderItem, OrderStatus };
export { ORDER_STATUS };

class OrderAPI {
  static async fetchAdminOrders(): Promise<Pagination<Order>> {
    const response = await fetch("/api/admin/orders", {
      method: "GET",
    });
    const data = await response.json();

    return data;
  }
}
export { OrderAPI };
