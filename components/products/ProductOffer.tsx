"use client";

import { useProductContext } from "@/context/ProductContext";
import { formatCurrency } from "@/lib/utils";
import { DiscountType } from "@/types/offer";

function ProductOffer() {
  const { offer, countryCode } = useProductContext();
  if (!offer) return null;
  const { discountType, discountValue } = offer;
  let offerText = "";
  if (discountType === DiscountType.PERCENTAGE) offerText = `${discountValue}%`;
  else if (discountType === DiscountType.FIXED_AMOUNT)
    offerText = formatCurrency({
      amount: discountValue,
      code: countryCode,
    });
  return (
    <div className="flex h-10 items-center rounded-xs bg-red-500 px-2 py-1 text-sm font-semibold text-white">
      {offerText}
    </div>
  );
}
export default ProductOffer;
