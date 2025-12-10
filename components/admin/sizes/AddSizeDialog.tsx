"use client";

import { addSize, updateSize } from "@/app/admin/sizes/actions";
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
import { AddSizeSchema, addSizeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UNITS = [
  { value: "ml", label: "مل (ml)" },
  { value: "l", label: "لتر (L)" },
  { value: "g", label: "جرام (g)" },
  { value: "kg", label: "كيلوجرام (kg)" },
];

export function AddSizeDialog({ size }: { size?: Size }) {
  const form = useForm<AddSizeSchema>({
    resolver: zodResolver(addSizeSchema),
    defaultValues: size
      ? {
          size: size.size,
          unit: size.unit,
        }
      : {
          size: 0,
          unit: "ml",
        },
  });

  const addNewSize = useCallback(
    async (data: AddSizeSchema) => {
      const id = toast.loading("جارى إضافة الحجم...");
      const result = await addSize(data);
      if (result.success) {
        toast.success(result.message || "تم إضافة الحجم بنجاح", { id });
        form.reset();
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الحجم", { id });
      }
    },
    [form],
  );

  const editSize = useCallback(
    async (data: AddSizeSchema) => {
      const id = toast.loading("جارى تعديل الحجم...");
      const result = await updateSize(size!.id, data);
      if (result.success) {
        toast.success(result.message || "تم تعديل الحجم بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل الحجم", { id });
      }
    },
    [size],
  );

  const onSubmit = useCallback(
    async (formData: AddSizeSchema) => {
      if (size) {
        await editSize(formData);
      } else {
        await addNewSize(formData);
      }
    },
    [size, addNewSize, editSize],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>حجم الزجاجة</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="أدخل حجم الزجاجة..."
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>أدخل حجم الزجاجة بالأرقام فقط</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="unit"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>الوحدة</FormLabel>
              <FormControl>
                <Select {...field} value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" dir="rtl">
                    <SelectValue placeholder="اختر الوحدة..." />
                  </SelectTrigger>
                  <SelectContent>
                    {UNITS.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>اختر وحدة قياس الحجم</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : size ? "تحديث" : "حفظ"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
