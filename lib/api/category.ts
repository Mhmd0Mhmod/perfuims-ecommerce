import { Category } from "@/types/category";
import axios from "axios";
import { throwingError } from "../utils";
import { authFetcher } from "../authFetcher";
import { fetcher } from "../fetcher";
import { getCookies } from "@/app/actions";

export class CategoryAPI {
  static async getAllCategories() {
    try {
      const response = await axios.get<Category[]>("/api/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAllSubCategoriesServer(): Promise<Category[]> {
    try {
      const country = await getCookies("country");
      const response = await authFetcher.get<Category[]>("/subcategories", {
        headers: {
          "X-Country-Code": country,
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getCategories(): Promise<Category[]> {
    try {
      const response = await authFetcher.get<Category[]>("/admin/categories");
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
  static async getAllCategoriesServer(countryCode?: string): Promise<Category[]> {
    try {
      const response = await fetcher.get<Category[]>("/categories", {
        headers: {
          "X-Country-Code": countryCode,
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
