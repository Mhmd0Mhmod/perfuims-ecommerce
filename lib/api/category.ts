import { Category } from "@/types/category";
import axios from "axios";
import { throwingError } from "../utils";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";
import { getCookies } from "@/app/actions";

export class CategoryAPI {
  static async getAllCategoriesRoots() {
    try {
      const response = await axios.get<Category[]>("/api/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getAdminCategoriesRoots(): Promise<Category[]> {
    try {
      const response = await authFetcher.get<Category[]>("/admin/categories/roots");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAllCategoriesRootsServer(countryCode?: string): Promise<Category[]> {
    try {
      const country = await getCookies("country");
      const response = await fetcher.get<Category[]>("/categories", {
        headers: {
          "X-Country-Code": countryCode || country,
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAllCategoriesServer(countryCode?: string): Promise<Category[]> {
    try {
      const country = await getCookies("country");
      const response = await fetcher.get<Category[]>("/categories", {
        headers: {
          "X-Country-Code": countryCode || country,
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
