import { axiosInstance } from "@/lib/axios-client";
import { throwingError } from "@/lib/utils";

export async function getCart(): Promise<CartItem[]> {
  try {
    const response = await axiosInstance.get("/cart", {
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
