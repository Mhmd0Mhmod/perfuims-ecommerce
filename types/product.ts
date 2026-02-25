import { Category } from "./category";
import { DiscountType, Offer } from "./offer";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: Pick<Category, "id" | "name">[];
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  unit: string;
  oldPrice: number;
  newPrice: number;
  isAvailable: true;
  offerResponseDTO: Pick<
    Offer,
    "id" | "title" | "description" | "discountType" | "discountValue"
  > | null;
  createdAt: "2026-02-06T21:47:07Z";
  updatedAt: "2026-02-06T21:47:07Z";
}

export type { Product, ProductVariant };
