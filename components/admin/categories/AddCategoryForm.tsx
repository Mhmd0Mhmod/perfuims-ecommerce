"use client";

import { addCategory, updateCategory } from "@/app/admin/actions";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AddCategorySchema, addCategorySchema } from "@/lib/zod";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useCallback } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

export function AddCategoryForm({ category }: { category?: Category }) {
  const form = useForm<AddCategorySchema>({
    resolver: zodResolver(addCategorySchema),
    defaultValues: category || {
      name: "",
      description: "",
      isActive: true,
      isAtHomePage: false,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="max-h-[60vh] space-y-4 overflow-y-auto">
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

        <DialogFooter>
          <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
