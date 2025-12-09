interface Product {
  id: number;
  name: string;
  description: string;
  isPackage: boolean;
  variants?: ProductVariant[];
  price?: number;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
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
