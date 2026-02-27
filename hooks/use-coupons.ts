import { validateCouponAction } from "@/app/(shop)/actions";
import { AppliedCouponResponse, DiscountType } from "@/types/offer";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function useCoupons() {
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCouponResponse | null>(null);
  const calculateDiscount = (subtotal: number) => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discountType === DiscountType.PERCENTAGE)
      return (subtotal * appliedCoupon.discountValue) / 100;
    return appliedCoupon.discountValue;
  };
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };
  const mutation = useMutation({
    mutationFn: () => validateCouponAction(couponCode),
    onSettled(data, error) {
      if (data?.success) {
        setAppliedCoupon(data.data ?? null);
        return;
      }
      toast.error(error?.message || "فشل تطبيق الكوبون");
    },
  });
  return {
    mutation,
    couponCode,
    setCouponCode,
    calculateDiscount,
    appliedCoupon,
    removeCoupon,
  };
}
