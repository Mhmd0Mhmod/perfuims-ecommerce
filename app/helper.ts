import { authFetcher } from "@/lib/authFetcher";
import { fetcher } from "@/lib/fetcher";
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

export async function getSiteSocailMeida() {
  try {
    const { data } = await fetcher.get<{
      facebookUrl: string;
      instagramUrl: string;
      twitterUrl: string;
      whatsappNumber: string;
    }>("settings");
    return data;
  } catch (error) {
    throw throwingError(error);
  }
}
