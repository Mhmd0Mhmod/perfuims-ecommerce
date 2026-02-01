"use client";

import { addCountry, updateCountry } from "@/app/admin/actions";
import SubmitButton from "@/components/shared/submit-button";
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
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { PAYMENT_METHODS } from "@/constants/payment_methods";
import { AddCountrySchema, addCountrySchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CountriesCombox from "./CountriesCombox";
import CurrencyCombobox from "./CurrencyCombobox";
import { Country, PublicCountry } from "@/types/country";
import { ScrollArea } from "@/components/ui/scroll-area";

function AddCountryForm({ country }: { country?: Country }) {
  const formatedCountry = useMemo(() => {
    return {
      ...country,
      paymentMethodIds: country?.paymentMethods?.map((paymentMethod) => paymentMethod.id) || [],
    };
  }, [country]);
  const form = useForm<AddCountrySchema>({
    resolver: zodResolver(addCountrySchema),
    defaultValues: formatedCountry || {
      name: "",
      code: "",
      currency: "",
      contactNumber: "",
      email: "",
      address: "",
      isActive: true,
      isDefault: false,
      flag: "",
      paymentMethodIds: [],
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
        toast.success(result.message || "تمت تعديل الدولة بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء تعديل الدولة.", { id });
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
  const onCountryChange = useCallback(
    (country: PublicCountry) => {
      form.setValue("name", country.name.common);
      form.setValue("code", country.cca2);
      form.setValue("currency", Object.keys(country.currencies)[0]);
      form.setValue("flag", country.flag);
    },
    [form],
  );
  const onPaymentMethodChange = useCallback(
    (value: number[], paymentMethodId: number, checked: boolean) => {
      const newValue = checked
        ? [...value, paymentMethodId]
        : value.filter((id) => id !== paymentMethodId);
      return newValue;
    },
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ScrollArea className="h-[calc(100vh-20rem)]">
          <div className="space-y-6">
            {/* Country Combobox */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>الدولة</FormLabel>
                  <FormControl>
                    <CountriesCombox value={field.value} onChange={onCountryChange} />
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

            {/* Contact Number Field */}
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم التواصل</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل رقم التواصل..." {...field} />
                  </FormControl>
                  <FormDescription>رقم التواصل الخاص بهذه الدولة</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل البريد الإلكتروني..." {...field} />
                  </FormControl>
                  <FormDescription>البريد الإلكتروني الخاص بهذه الدولة</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Field */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل العنوان..." {...field} />
                  </FormControl>
                  <FormDescription>العنوان الخاص بهذه الدولة</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Is Default Switch */}
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>الافتراضي</FormLabel>
                    <FormDescription>هل تريد تعيين هذه الدولة كافتراضية؟</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
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
                    <FormDescription>هل تريد تفعيل هذه الدولة؟</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mb-4">
              <h2 className="text-base">طرق الدفع</h2>
              <p className="text-muted-foreground text-sm">اختر طرق الدفع المتاحة لهذه الدولة</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PAYMENT_METHODS.map((paymentMethod) => (
                <FormField
                  key={paymentMethod.id}
                  control={form.control}
                  name="paymentMethodIds"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={paymentMethod.id}
                        className="flex items-start space-y-0 space-x-3 rounded-md border p-4 shadow-sm"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(paymentMethod.id)}
                            onCheckedChange={(checked: boolean) =>
                              field.onChange(
                                onPaymentMethodChange(field.value, paymentMethod.id, checked),
                              )
                            }
                          />
                        </FormControl>
                        <div className="mr-2 space-y-1 leading-none">
                          <FormLabel className="font-Cairo font-normal">
                            {paymentMethod.displayName}
                          </FormLabel>
                        </div>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
        <SubmitButton
          label={country ? "تعديل الدولة" : "إضافة دولة"}
          labelOnLoading={country ? "جارى التعديل..." : "جارى الإضافة..."}
        />
      </form>
    </Form>
  );
}
export default AddCountryForm;
