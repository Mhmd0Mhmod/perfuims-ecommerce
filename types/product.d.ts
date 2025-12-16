interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categoryIds: number[];
  categoryNames: string[];
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

export { Product, ProductVariant };
