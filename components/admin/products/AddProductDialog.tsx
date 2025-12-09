"use client";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { addProductSchema, AddProductSchema } from "@/lib/zod";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import ProductVariants from "./ProductVariants";

interface AddProductDialogProps {
  product?: Product;
  categories: Category[];
  sizes: Size[];
}

function AddProductDialog({ product, categories, sizes }: AddProductDialogProps) {
  const isEditMode = Boolean(product);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: product || {
      name: "",
      isPackage: true,
    },
  });

  const isPackage = form.watch("isPackage");

  const onSubmit = useCallback(async (data: AddProductSchema) => {
    setIsSubmitting(true);
    try {
      console.log("Form data:", data);
      // Handle form submission here
      // await createProduct(data) or await updateProduct(data)
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, []);
  console.log("Form Errors:", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-right">
        {/* Basic Info */}
        <div className="-mx-3 max-h-[65vh] space-y-4 overflow-y-auto p-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المنتج</FormLabel>
                <FormControl>
                  <Input placeholder="اسم المنتج" {...field} />
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
                <FormLabel>وصف المنتج</FormLabel>
                <FormControl>
                  <Textarea placeholder="وصف المنتج" rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التصنيف</FormLabel>
                <FormControl>
                  <Select
                    value={field.value?.toString() || ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger dir="rtl" className="w-full">
                      <SelectValue placeholder="اختر تصنيف" />
                    </SelectTrigger>
                    <SelectContent dir="rtl">
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رابط الصورة</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Package Section */}
          <div className="space-y-4 border-t pt-4">
            <FormField
              control={form.control}
              name="isPackage"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">منتج {`(عبوه)`} </FormLabel>
                    <FormDescription>هل هذا المنتج عبارة عن باقة بسعر ثابت؟</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      className="flex-row-reverse"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value === true)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isPackage && (
              <FormField
                control={form.control}
                name="packagePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>سعر المنتج</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Variants Section */}
          {!isPackage && (
            <div className="border-t pt-4">
              <ProductVariants control={form.control} sizes={sizes} />
            </div>
          )}
        </div>
        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting
            ? isEditMode
              ? "جارٍ تحديث المنتج..."
              : "جارٍ إضافة المنتج..."
            : isEditMode
              ? "تحديث المنتج"
              : "إضافة المنتج"}
        </Button>
      </form>
    </Form>
  );
}

export default AddProductDialog;
