import axiosInstance from "@/lib/axios";
import { Customer } from "@/types/customer";

export async function getCustomers() {
  try {
    const { data } = await axiosInstance.get<Pagination<Customer>>("/admin/users");
    return data;
  } catch (error) {
    throw error;
  }
}
