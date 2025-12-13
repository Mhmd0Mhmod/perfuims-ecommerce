import AxiosServerInstance from "@/lib/axios-server";
import { throwingError } from "@/lib/utils";
import { Customer } from "@/types/customer";

export async function getCustomers() {
  try {
    const axiosInstance = await AxiosServerInstance();
    const { data } = await axiosInstance.get<Pagination<Customer>>("/admin/users");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
