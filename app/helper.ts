import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import axios from "axios";

export async function getCart(): Promise<CartItem[]> {
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
export async function getCartServer(): Promise<CartItem[]> {
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
