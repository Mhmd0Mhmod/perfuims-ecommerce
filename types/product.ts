import { Category } from "./category";
import { DiscountType } from "./offer";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: Pick<Category, "id" | "name">[];
  createdAt: string;
  updatedAt: string;
  variants: ProductVariant[];
}

interface ProductVariant {
  id: number;
  name: string;
  imageUrl: string;
  size: number;
  unit: string;
  oldPrice?: number;
  newPrice: number;
  isAvailable: boolean;
  offerId?: number;
  offerTitle?: string;
  offerDescription?: string;
  discountType?: DiscountType;
  discountValue?: number;
  createdAt: string;
  updatedAt: string;
}

export type { Product, ProductVariant };
