"use client";

import { updateProfileAction } from "@/app/(shop)/actions";
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
import { updateProfileSchema, UpdateProfileSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "next-auth";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SettingsForm({ user }: { user: User }) {
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
    },
  });

  const onSubmit = useCallback(async (data: UpdateProfileSchema) => {
    const id = toast.loading("جارٍ تحديث بياناتك...");
    try {
      const result = await updateProfileAction(data);
      if (result.success) {
        toast.success(result.message || "تم تحديث البيانات بنجاح", { id });
      } else {
        toast.error(result.message || "حدث خطأ أثناء تحديث البيانات", { id });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع", { id });
    }
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-right">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Username - Disabled */}
          <FormItem>
            <FormLabel>اسم المستخدم (لا يمكن تغييره)</FormLabel>
            <FormControl>
              <Input value={user?.username || ""} disabled className="bg-muted" />
            </FormControl>
          </FormItem>

          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الاسم الكامل</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل اسمك الكامل..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>البريد الإلكتروني</FormLabel>
                <FormControl>
                  <Input placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الهاتف</FormLabel>
                <FormControl>
                  <Input placeholder="0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>العنوان</FormLabel>
                <FormControl>
                  <Input placeholder="أدخل عنوانك..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
