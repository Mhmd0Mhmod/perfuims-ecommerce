interface Product {
  id: number;
  name: string;
  description: string;
  variants: ProductVariant[];
  imageUrl: string;
  categoryIds: number[];
  categoryNames: string[];
  createdAt: string;
  updatedAt: string;
}
interface ProductVariant {
  id: number;
  sizeId?: string;
  size?: number;
  unit?: string;
  price: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export { Product, ProductVariant };
