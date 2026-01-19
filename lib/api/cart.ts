import { CartItem } from "@/types/cart";
import axios from "axios";
import { throwingError } from "../utils";
import { authFetcher } from "../authFetcher";

export class CartAPI {
  static async getCart(): Promise<CartItem[]> {
    try {
      const response = await axios.get("/api/cart", {
        fetchOptions: {
          next: {
            tags: ["cart"],
          },
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }

  static async getCartServer(): Promise<CartItem[]> {
    try {
      const response = await authFetcher.get("/cart", {
        fetchOptions: {
          next: {
            tags: ["cart"],
          },
        },
      });
      return response.data;
    } catch (error) {
      throw throwingError(error);
    }
  }
}
