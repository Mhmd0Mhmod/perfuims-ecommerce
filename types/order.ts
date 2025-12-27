interface Order {
  orderId: string;
  orderNumber: string;
  totalAmount: number;
  status: OrderStatus;
  countryCode: string;
  shippingAddress: null;
  phoneNumber: null;
  user: {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    shippingAddress: string;
  };
  payment: {
    paymentMethodId: number;
    paymentMethodName: string;
    paymentStatus: PaymentStatus;
    transactionId: string;
  };
  items: OrderItem[];
  createdAt: string | null;
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
const PAYMENT_STATUS = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
  REFUNDED: "REFUNDED",
} as const;
type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
export type { Order, OrderItem, OrderStatus, PaymentStatus };
export { ORDER_STATUS };
export { PAYMENT_STATUS };
