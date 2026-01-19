import { Order } from "./order";
import { Payment } from "./payment";

export interface DashboardStats {
  year: number;
  totalUsers: number;
  totalOrders: number;
  totalPayments: number;
  totalRevenue: number;
  monthlyStats: MonthlyStat[];
  recentOrders: Order[];
  recentPayments: Payment[];
}
export interface MonthlyStat {
  month: string;
  monthNumber: number;
  totalOrders: number;
  totalPayments: number;
  totalRevenue: number;
}
