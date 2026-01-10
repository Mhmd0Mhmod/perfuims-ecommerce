"use client";

import { updateStoreSettingsAction } from "@/app/admin/settings/actions";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { storeSettingsSchema, StoreSettingsSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Settings2,
} from "lucide-react";

export function SettingsForm({ country }: { country: StoreSettingsSchema }) {
  const form = useForm<StoreSettingsSchema>({
    resolver: zodResolver(storeSettingsSchema),
    defaultValues: {
      contactEmail: country.contactEmail || "",
      contactPhone: country.contactPhone || "",
      address: country.address || "",
      facebookUrl: country.facebookUrl || "",
      instagramUrl: country.instagramUrl || "",
      whatsappNumber: country.whatsappNumber || "",
    },
  });

  async function onSubmit(data: StoreSettingsSchema) {
    const id = toast.loading("جارٍ حفظ الإعدادات...");
    try {
      const result = await updateStoreSettingsAction(data);
      if (result.success) {
        toast.success(result.message || "تم حفظ الإعدادات بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء حفظ الإعدادات", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="contact" className="w-full" dir="rtl">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>معلومات التواصل</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>التواصل الاجتماعي</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contact" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="text-right">
                <CardTitle>بيانات الاتصال</CardTitle>
                <CardDescription>كيف يمكن للعملاء الوصول إليك</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
                <FormField
                  control={form.control}
                  name="contactEmail"
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
                  name="contactPhone"
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="mt-4 space-y-4">
            <Card>
              <CardHeader className="text-right">
                <CardTitle>روابط التواصل الاجتماعي</CardTitle>
                <CardDescription>اربط متجرك بمنصات التواصل المختلفة</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-right">
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
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-start">
          <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ جميع الإعدادات"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
