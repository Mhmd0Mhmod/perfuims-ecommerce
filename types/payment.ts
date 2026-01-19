import { PaymentStatus } from "./order";

export interface Payment {
  paymentId: number;
  orderId: number;
  userId: number;
  username: string;
  paymentMethodType: string;
  paymentStatus: PaymentStatus;
  amount: number;
  transactionId: string;
  createdAt: string;
  paymentDate: string;
}
export interface PaymentMethod {
  id: number;
  name: string;
}
