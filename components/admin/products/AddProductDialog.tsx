"use client";
import { addProduct, updateProduct } from "@/app/admin/products/actions";
import { MultiSelect } from "@/components/shared/multi-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addProductSchema, AddProductSchema } from "@/lib/zod";
import { Product } from "@/types/product";
import { Size } from "@/types/size";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ProductVariants from "./ProductVariants";

interface AddProductDialogProps {
  product?: Product;
  categories: Category[];
  sizes: Size[];
}

function AddProductDialog({ product, categories, sizes }: AddProductDialogProps) {
  const isEditMode = Boolean(product);

  const form = useForm<AddProductSchema>({
    resolver: zodResolver(addProductSchema),
    defaultValues: product
      ? {
          ...product,
          categoryIds: product.categoryIds?.map((id) => id.toString()),
        }
      : {
          name: "",
          imageUrl: "",
          description: "",
          categoryIds: [],
          variants: [],
        },
  });

  const onSubmit = useCallback(
    async (data: AddProductSchema) => {
      const id = toast.loading(isEditMode ? "جارى تحديث المنتج..." : "جارى إضافة المنتج...");
      try {
        if (isEditMode) {
          const response = await updateProduct(product!.id, data);
          if (response.success) {
            toast.success(response.message || "تم تحديث المنتج بنجاح", { id });
          } else {
            toast.error(response.message || "حدث خطأ أثناء تحديث المنتج", { id });
          }
          return;
        }
        const response = await addProduct(data);
        if (response.success) {
          toast.success(response.message || "تم إضافة المنتج بنجاح", { id });
          form.reset();
        } else {
          toast.error(response.message || "حدث خطأ أثناء إضافة المنتج", { id });
        }
      } catch {
        toast.error(isEditMode ? "حدث خطأ أثناء تحديث المنتج" : "حدث خطأ أثناء إضافة المنتج", {
          id,
        });
      }
    },
    [isEditMode, product, form],
  );
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
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>التصنيفات</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={
                      categories?.map((cat) => ({
                        label: cat.name,
                        value: cat.id.toString(),
                      })) || []
                    }
                    selected={field.value || []}
                    onChange={field.onChange}
                    placeholder="اختر التصنيفات"
                  />
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

          {/* Variants Section */}
          <div className="border-t pt-4">
            <ProductVariants control={form.control} sizes={sizes} />
          </div>
        </div>
        {/* Submit Button */}
        <SubmitingButton isEditMode={isEditMode} />
      </form>
    </Form>
  );
}
function SubmitingButton({ isEditMode }: { isEditMode: boolean }) {
  const {
    formState: { isSubmitting: pending },
  } = useForm();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending
        ? isEditMode
          ? "جارٍ تحديث المنتج..."
          : "جارٍ إضافة المنتج..."
        : isEditMode
          ? "تحديث المنتج"
          : "إضافة المنتج"}
    </Button>
  );
}
export default AddProductDialog;
