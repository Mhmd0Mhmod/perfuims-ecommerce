interface Product {
  id: number;
  name: string;
  description: string;
  isPackage: boolean;
  variants?: ProductVariant[];
  packagePrice?: number;
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
