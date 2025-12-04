import { Roles } from "./roles";

interface Customer {
  id: number;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: Roles;
  deleted: boolean;
  createdAt: string;
}
