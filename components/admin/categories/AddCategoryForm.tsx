"use client";

import { addCategory, updateCategory } from "@/app/admin/actions";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { AddCategorySchema, addCategorySchema } from "@/lib/zod";
import { Category } from "@/types/category";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function AddCategoryForm({
  category,
  products,
}: {
  category?: Category;
  products?: Product[];
}) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: category
      ? {
          name: category.name,
          description: category.description,
          isActive: category.isActive,
          isAtHomePage: category.isAtHomePage,
          productIds: category.productIds || [],
          children: category.children?.map((child) => ({
            name: child.name,
            description: child.description,
            isActive: child.isActive,
            isAtHomePage: child.isAtHomePage,
          })),
        }
      : {
          name: "",
          description: "",
          isActive: true,
          isAtHomePage: false,
          productIds: [],
          children: [],
        },
  });

  const addNewCategory = useCallback(
    async (data: AddCategorySchema) => {
      const id = toast.loading("جارى إضافة التصنيف...");
      const result = await addCategory(data);
      if (result.success) {
        toast.success(result.message || "تم إضافة التصنيف بنجاح", { id });
        form.reset();
        router.push("/admin/categories");
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة التصنيف", { id });
      }
    },
    [form, router],
  );

  const editCategory = useCallback(
    async (data: AddCategorySchema) => {
      const id = toast.loading("جارى تعديل التصنيف...");
      const result = await updateCategory(category!.id, data);
      if (result.success) {
        toast.success(result.message || "تم تعديل التصنيف بنجاح", { id });
        router.push("/admin/categories");
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل التصنيف", { id });
      }
    },
    [category, router],
  );

  const onSubmit = useCallback(
    async (formData: AddCategorySchema) => {
      if (category) {
        await editCategory(formData);
      } else {
        await addNewCategory(formData);
      }
    },
    [category, addNewCategory, editCategory],
  );

  const { append, fields, remove } = useFieldArray({
    control: form.control,
    name: "children",
  });

  const createNewChildCategory = () => ({
    name: "",
    description: "",
    isActive: true,
    isAtHomePage: false,
  });

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const selectedProductIds = form.watch("productIds") || [];

  const toggleProduct = (productId: number) => {
    const current = form.getValues("productIds") || [];
    if (current.includes(productId)) {
      form.setValue(
        "productIds",
        current.filter((id) => id !== productId),
        { shouldDirty: true },
      );
    } else {
      form.setValue("productIds", [...current, productId], {
        shouldDirty: true,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم التصنيف</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل اسم التصنيف..." {...field} />
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
                <FormLabel>الوصف</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أدخل وصف التصنيف..."
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                <div className="space-y-0.5 text-right">
                  <FormLabel>نشط</FormLabel>
                  <FormDescription>هل تريد تفعيل هذا التصنيف؟</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isAtHomePage"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                <div className="space-y-0.5 text-right">
                  <FormLabel>عرض في الصفحة الرئيسية</FormLabel>
                  <FormDescription>هل تريد عرض هذا التصنيف في الصفحة الرئيسية؟</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Product IDs Selector */}
          {products && products.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">المنتجات</h3>
                  {selectedProductIds.length > 0 && (
                    <Badge variant="secondary">
                      {selectedProductIds.length} منتج محدد
                    </Badge>
                  )}
                </div>

                <Input
                  placeholder="ابحث عن منتج..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="max-h-60 space-y-2 overflow-y-auto rounded-md border p-3">
                  {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center gap-3 rounded-md p-2 hover:bg-muted/50 transition-colors"
                      >
                        <Checkbox
                          id={`product-${product.id}`}
                          checked={selectedProductIds.includes(product.id)}
                          onCheckedChange={() => toggleProduct(product.id)}
                        />
                        <label
                          htmlFor={`product-${product.id}`}
                          className="flex-1 cursor-pointer text-sm"
                        >
                          {product.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center text-sm py-4">
                      لا توجد منتجات
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">التصنيفات الفرعية</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append(createNewChildCategory())}
              >
                <Plus className="ml-2 h-4 w-4" />
                إضافة تصنيف فرعي
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="relative space-y-4 rounded-lg border p-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-destructive mr-auto flex h-8 w-8 items-center justify-center"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>

                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name={`children.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم التصنيف الفرعي</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل الاسم..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`children.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الوصف</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="أدخل الوصف..."
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`children.${index}.isActive`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5 text-right">
                          <FormLabel className="text-sm">نشط</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            className="scale-75"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`children.${index}.isAtHomePage`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-md border p-3">
                        <div className="space-y-0.5 text-right">
                          <FormLabel className="text-sm">عرض في الصفحة الرئيسية</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            className="scale-75"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "جاري الحفظ..."
              : category
                ? "تحديث التصنيف"
                : "حفظ التصنيف"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
