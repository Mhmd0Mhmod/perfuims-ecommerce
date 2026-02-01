import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { Customer } from "@/types/customer";
export class UserAPI {
  static async getUsers() {
    try {
      const { data } = await authFetcher.get<Pagination<Customer>>("/admin/users");
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getUser(id: string) {
    try {
      const { data } = await authFetcher.get<Customer>(`/admin/users/${id}`);
      return data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
