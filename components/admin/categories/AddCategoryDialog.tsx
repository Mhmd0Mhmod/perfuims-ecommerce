"use client";

import { addCategory, updateCategory } from "@/app/admin/categories/actions";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AddCategorySchema, addCategorySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddCategoryDialog({
  category,
  countries,
}: {
  category?: Category;
  countries: Country[];
}) {
  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: category || {
      name: "",
      description: "",
      countryId: 0,
      isActive: true,
    },
  });

  const addNewCategory = useCallback(
    async (data: AddCategorySchema) => {
      const id = toast.loading("جارى إضافة التصنيف...");
      const result = await addCategory(data);
      if (result.success) {
        toast.success(result.message || "تم إضافة التصنيف بنجاح", { id });
        form.reset();
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة التصنيف", { id });
      }
    },
    [form],
  );
  const editCategory = useCallback(
    async (data: AddCategorySchema) => {
      const id = toast.loading("جارى تعديل التصنيف...");
      const result = await updateCategory(category!.id, data);
      if (result.success) {
        toast.success(result.message || "تم تعديل التصنيف بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل التصنيف", { id });
      }
    },
    [category],
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <Textarea placeholder="أدخل وصف التصنيف..." {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="countryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>الدولة</FormLabel>
              <FormControl>
                <Select {...field} value={String(field.value || "")} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" dir="rtl">
                    <SelectValue placeholder="اختر الدولة..." {...field} />
                  </SelectTrigger>
                  <SelectContent>
                    {countries?.map((country) => (
                      <SelectItem key={country.id} value={country.id.toString()}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>اختر الدولة التابع لها هذا التصنيف</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel>نشط</FormLabel>
                <FormDescription>هل تريد تفعيل هذا التصنيف؟</FormDescription>
              </div>
              <FormControl>
                <Switch
                  className="flex-row-reverse"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
