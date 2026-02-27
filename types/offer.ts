export interface Offer {
  id: number;
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  countryCode: string;
  productVariantIds: number[];
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  FIXED_AMOUNT = "FIXED_AMOUNT",
}

export interface OfferCoupon {
  id: number;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  minimumOrderAmount: number;
  maxUsages: number;
  currentUsages: number;
  expiresAt: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
