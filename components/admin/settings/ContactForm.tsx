"use client";

import { updateCountry } from "@/app/admin/countries/actions";
import SubmitButton from "@/components/shared/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { AddCountrySchema } from "@/lib/zod";
import { Country } from "@/types/country";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ContactFormProps {
  country: Partial<Country>;
}

export function ContactForm({ country }: ContactFormProps) {
  const form = useForm<AddCountrySchema>({
    defaultValues: {
      email: country.email || "",
      contactNumber: country.contactNumber || "",
      address: country.address || "",
    },
  });

  async function onSubmit(data: AddCountrySchema) {
    const id = toast.loading("جارٍ حفظ إعدادات الاتصال...");
    try {
      if (!country.id) {
        toast.error("معرف البلد غير موجود", { id });
        return;
      }
      const result = await updateCountry(country.id, data);
      if (result.success) {
        toast.success(result.message || "تم حفظ إعدادات الاتصال بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حفظ إعدادات الاتصال", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  }
  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle>بيانات الاتصال</CardTitle>
        <CardDescription>كيف يمكن للعملاء الوصول إليك</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>البريد الإلكتروني للارتباط</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="info@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>رقم الهاتف</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>العنوان الرئيسي</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="أدخل عنوان المقر الرئيسي..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <SubmitButton
                className="w-fit"
                label="حفظ إعدادات الاتصال"
                labelOnLoading="جاري الحفظ..."
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
