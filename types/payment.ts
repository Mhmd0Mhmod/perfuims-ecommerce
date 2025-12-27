export interface Payment {
  paymentId: number;
  orderId: number;
  userId: number;
  paymentMethodType: string;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  amount: number;
  transactionId: string;
  createdAt: string;
  paymentDate: string;
}
