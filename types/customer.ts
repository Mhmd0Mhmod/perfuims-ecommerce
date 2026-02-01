import { Order } from "./order";
import { Payment } from "./payment";
import { Roles } from "./roles";

interface Customer {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: Roles;
  createdAt: string;
  updatedAt: string;
  orders: Order[];
  payments: Payment[];
  deleted: false;
}
export type { Customer };
