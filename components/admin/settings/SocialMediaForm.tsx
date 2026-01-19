"use client";

import { updateStoreSettingsAction } from "@/app/admin/actions";
import SubmitButton from "@/components/shared/submit-button";
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
import { storeSettingsSchema, StoreSettingsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SocialMediaFormProps {
  initialData: Partial<StoreSettingsSchema>;
}

export function SocialMediaForm({ initialData }: SocialMediaFormProps) {
  const form = useForm<StoreSettingsSchema>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      facebookUrl: initialData.facebookUrl || "",
      instagramUrl: initialData.instagramUrl || "",
      twitterUrl: initialData.twitterUrl || "",
      whatsappNumber: initialData.whatsappNumber || "",
    },
  });

  async function onSubmit(data: StoreSettingsSchema) {
    const id = toast.loading("جارٍ حفظ إعدادات التواصل الاجتماعي...");
    try {
      const result = await updateStoreSettingsAction(data);
      if (result.success) {
        toast.success(result.message || "تم حفظ إعدادات التواصل الاجتماعي بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حفظ إعدادات التواصل الاجتماعي", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع", { id, description: String(error) });
    }
  }

  return (
    <Card>
      <CardHeader className="text-right">
        <CardTitle>روابط التواصل الاجتماعي</CardTitle>
        <CardDescription>اربط متجرك بمنصات التواصل المختلفة</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Facebook className="h-4 w-4 text-blue-600" />
                    <span>رابط فيسبوك</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://facebook.com/your-store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instagramUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-600" />
                    <span>رابط إنستغرام</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://instagram.com/your-store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="twitterUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Twitter className="h-4 w-4" />
                    <span>رابط تويتر</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://twitter.com/your-store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whatsappNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-green-600" />
                    <span>رقم واتساب</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: 966123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <SubmitButton
                label="حفظ إعدادات التواصل الاجتماعي"
                className="w-fit"
                labelOnLoading="جاري الحفظ..."
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
