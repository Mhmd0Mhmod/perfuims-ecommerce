"use client";

import { createCoupon, updateCoupon } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { CouponFormValues, couponSchema } from "@/lib/zod";
import { DiscountType, OfferCoupon } from "@/types/offer";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface AddCouponFormProps {
  coupon?: OfferCoupon;
}

export default function AddCouponForm({ coupon }: AddCouponFormProps) {
  const isEditing = !!coupon;
  const router = useRouter();
  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: coupon?.code || "",
      discountType: coupon?.discountType || DiscountType.PERCENTAGE,
      discountValue: coupon?.discountValue || 0,
      minimumOrderAmount: coupon?.minimumOrderAmount || 0,
      maxUsages: coupon?.maxUsages || 0,
      expiresAt: coupon?.expiresAt ? new Date(coupon.expiresAt) : new Date(),
      isActive: coupon?.isActive ?? true,
    },
  });

  const watchedDiscountType = useWatch({
    control: form.control,
    name: "discountType",
  });

  async function onSubmit(data: CouponFormValues) {
    const loadingId = toast.loading(isEditing ? "جارى تحديث الكوبون..." : "جارى إنشاء الكوبون...");
    try {
      const formData = {
        ...data,
        expiresAt: data.expiresAt,
      };

      const result =
        isEditing && coupon
          ? await updateCoupon(coupon.id, formData)
          : await createCoupon(formData);

      if (result.success) {
        toast.success(result.message, { id: loadingId });
        if (!isEditing) {
          form.reset();
        } else {
          router.replace("/admin/coupons");
        }
      } else {
        toast.error(result.message || "حدث خطأ", { id: loadingId });
      }
    } catch {
      toast.error("حدث خطأ غير متوقع", { id: loadingId });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كود الكوبون</FormLabel>
              <FormControl>
                <Input placeholder="مثال: NEWYEAR2024" className="font-mono uppercase" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع الخصم</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر نوع الخصم" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={DiscountType.PERCENTAGE}>نسبة مئوية (%)</SelectItem>
                  <SelectItem value={DiscountType.FIXED_AMOUNT}>مبلغ ثابت</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {watchedDiscountType === DiscountType.PERCENTAGE ? "نسبة مئوية" : "مبلغ ثابت"}
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="minimumOrderAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحد الأدنى للطلب (اختياري)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="0 للمحاسبة على جميع الطلبات"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxUsages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الحد الأقصى للاستخدام (اختياري)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  placeholder="0 لاستخدام غير محدود"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiresAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>تاريخ الانتهاء</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: ar })
                      ) : (
                        <span>اختر التاريخ</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">تفعيل الكوبون</FormLabel>
                <FormDescription>الكوبون سيكون متاحاً للاستخدام فور التفعيل</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {isEditing ? "تحديث الكوبون" : "إنشاء الكوبون"}
        </Button>
      </form>
    </Form>
  );
}
