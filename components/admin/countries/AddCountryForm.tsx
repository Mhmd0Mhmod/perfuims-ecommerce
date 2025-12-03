"use client";

import { addCountry, updateCountry } from "@/app/admin/countries/actions";
import SubmitButton from "@/components/shared/submit-button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { AddCountrySchema, addCountrySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CountriesCombox from "./CountriesCombox";
import CurrencyCombobox from "./CurrencyCombobox";

function AddCountryForm({ country }: { country?: Country }) {
  const form = useForm<AddCountrySchema>({
    resolver: zodResolver(addCountrySchema),
    defaultValues: country || {
      name: "",
      currency: "",
      isActive: true,
    },
  });
  const add = useCallback(async (data: AddCountrySchema) => {
    const id = toast.loading("جارى إضافة الدولة...");
    const result = await addCountry(data);
    if ("success" in result && result.success) {
      toast.success(result.message || "تمت إضافة الدولة بنجاح", { id });
    } else {
      toast.error(result.message || "حدث خطأ أثناء إضافة الدولة.", { id });
    }
  }, []);
  const edit = useCallback(
    async (data: AddCountrySchema) => {
      const id = toast.loading("جارى تعديل الدولة...");
      const result = await updateCountry(country!.id, data);
      if ("success" in result && result.success) {
        toast.success(result.message || "تمت إضافة الدولة بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء إضافة الدولة.", { id });
      }
    },
    [country],
  );

  const onSubmit = useCallback(
    async (formData: AddCountrySchema) => {
      if (country) {
        await edit(formData);
      } else {
        await add(formData);
      }
    },
    [add, edit, country],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Country Combobox */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>الدولة</FormLabel>
              <FormControl>
                <CountriesCombox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>اختر الدولة من القائمة</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Currency Field */}
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العملة</FormLabel>
              <FormControl>
                <CurrencyCombobox value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>أدخل رمز العملة</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Is Active Switch */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
              <div className="space-y-0.5">
                <FormLabel>نشط</FormLabel>
                <FormDescription>هل تريد تفعيل هذه الدولة؟</FormDescription>
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

        <SubmitButton label="إضافة دولة" labelOnLoading="جارى الاضافه..." />
      </form>
    </Form>
  );
}
export default AddCountryForm;
