"use client";

import { createOffer, updateOffer } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatCurrency } from "@/lib/utils";
import { OfferFormValues, offerSchema } from "@/lib/zod";
import { DiscountType, Offer } from "@/types/offer";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next/client";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon, Loader2, Package } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";

interface AddOfferFormProps {
  offer?: Offer;
  products: Product[];
}

export default function AddOfferForm({ offer, products }: AddOfferFormProps) {
  const isEditing = !!offer;
  const router = useRouter();
  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      title: offer?.title || "",
      description: offer?.description || "",
      discountType: offer?.discountType || DiscountType.PERCENTAGE,
      discountValue: offer?.discountValue || 0,
      startDate: offer?.startDate ? new Date(offer.startDate) : new Date(),
      endDate: offer?.endDate ? new Date(offer.endDate) : new Date(),
      isActive: offer?.isActive ?? true,
      productVariantIds: offer?.productVariantIds || [],
    },
  });

  const selectedVariantIds = useWatch({
    control: form.control,
    name: "productVariantIds",
  });

  const watchedDiscountType = useWatch({
    control: form.control,
    name: "discountType",
  });

  const toggleVariant = (variantId: number) => {
    const current = form.getValues("productVariantIds");
    if (current.includes(variantId)) {
      form.setValue(
        "productVariantIds",
        current.filter((id) => id !== variantId),
      );
    } else {
      form.setValue("productVariantIds", [...current, variantId]);
    }
  };

  const toggleAllProductVariants = (product: Product, checked: boolean) => {
    const current = form.getValues("productVariantIds");
    const productVariantIds = product.variants.map((v) => v.id);

    if (checked) {
      const newIds = productVariantIds.filter((id) => !current.includes(id));
      form.setValue("productVariantIds", [...current, ...newIds]);
    } else {
      form.setValue(
        "productVariantIds",
        current.filter((id) => !productVariantIds.includes(id)),
      );
    }
  };

  const isProductFullySelected = (product: Product) => {
    return (
      product.variants.every((v) => selectedVariantIds.includes(v.id)) &&
      product.variants.length > 0
    );
  };

  const isProductPartiallySelected = (product: Product) => {
    const selectedCount = product.variants.filter((v) => selectedVariantIds.includes(v.id)).length;
    return selectedCount > 0 && selectedCount < product.variants.length;
  };

  async function onSubmit(data: OfferFormValues) {
    const loadingId = toast.loading(isEditing ? "جارى تحديث العرض..." : "جارى إنشاء العرض...");
    try {
      const formData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      const result = isEditing
        ? await updateOffer(offer.id, formData)
        : await createOffer(formData);

      if (result.success) {
        toast.success(result.message, { id: loadingId });
        if (!isEditing) {
          form.reset();
        } else {
          router.replace("/admin/offers");
        }
      } else {
        toast.error(result.message || "حدث خطأ", { id: loadingId });
      }
    } catch {
      toast.error("حدث خطأ غير متوقع", { id: loadingId });
    }
  }
  const countryCode = getCookie("country_code");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان العرض</FormLabel>
              <FormControl>
                <Input placeholder="مثال: تخفيضات نهاية الموسم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف العرض</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="اكتب وصفاً تفصيلياً للعرض..."
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>تاريخ البداية</FormLabel>
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
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>تاريخ النهاية</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">تفعيل العرض</FormLabel>
                <FormDescription>العرض سيكون متاحاً للعملاء فور التفعيل</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Product Variants Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5" />
                  المنتجات المشمولة بالعرض
                </CardTitle>
                <CardDescription>اختر المنتجات والأحجام التي سيشملها هذا العرض</CardDescription>
              </div>
              {selectedVariantIds.length > 0 && (
                <Badge variant="secondary">{selectedVariantIds.length} محدد</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Package className="text-muted-foreground mb-2 h-10 w-10" />
                <p className="text-muted-foreground text-sm">لا توجد منتجات متاحة</p>
              </div>
            ) : (
              <div className="max-h-100 overflow-y-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">#</TableHead>
                      <TableHead className="text-right">المنتج</TableHead>
                      <TableHead className="text-right">الحجم</TableHead>
                      <TableHead className="text-right">السعر</TableHead>
                      <TableHead className="text-center">اختيار</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <React.Fragment key={`product-${product.id}`}>
                        {/* Product Header Row */}
                        <TableRow className="bg-muted/50 hover:bg-muted/50">
                          <TableCell className="text-center">
                            <Checkbox
                              checked={isProductFullySelected(product)}
                              ref={(ref) => {
                                if (ref) {
                                  (ref as HTMLButtonElement).dataset.state =
                                    isProductPartiallySelected(product)
                                      ? "indeterminate"
                                      : isProductFullySelected(product)
                                        ? "checked"
                                        : "unchecked";
                                }
                              }}
                              onCheckedChange={(checked) =>
                                toggleAllProductVariants(product, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell colSpan={4} className="font-medium">
                            {product.name}
                          </TableCell>
                        </TableRow>
                        {/* Variant Rows */}
                        {product.variants.map((variant) => (
                          <TableRow key={`variant-${variant.id}`}>
                            <TableCell />
                            <TableCell className="text-muted-foreground pr-8 text-sm">
                              └ {variant.name || product.name}
                            </TableCell>
                            <TableCell className="text-sm">
                              {variant.size} {variant.unit}
                            </TableCell>
                            <TableCell className="text-sm">
                              {countryCode &&
                                formatCurrency({
                                  amount: variant.newPrice,
                                  code: countryCode,
                                })}
                            </TableCell>
                            <TableCell className="text-center">
                              <Checkbox
                                checked={selectedVariantIds.includes(variant.id)}
                                onCheckedChange={() => toggleVariant(variant.id)}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
          {isEditing ? "تحديث العرض" : "إنشاء العرض"}
        </Button>
      </form>
    </Form>
  );
}
