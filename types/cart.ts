import { ProductVariant } from "@/types/product";

interface CartItem {
  "id": number,
  "userId": number,
  "productId": number,
  "countryName": string,
  "countryCode": string,
  "variantDetails": ProductVariant,
  "quantity": number,
  "createdAt": string,
  "updatedAt": string
}
export type { CartItem };
