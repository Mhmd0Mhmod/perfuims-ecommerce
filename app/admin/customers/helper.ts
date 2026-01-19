import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Customer } from "@/types/customer";

export async function getCustomers() {
  try {
    const { data } = await authFetcher.get<Pagination<Customer>>("/admin/users");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
