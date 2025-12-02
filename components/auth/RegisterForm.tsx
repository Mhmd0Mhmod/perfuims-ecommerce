"use client";
import { registerSchema, type RegisterSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import SubmitButton from "../shared/submit-button";
import { useCallback } from "react";
import { toast } from "sonner";
import { registerAction } from "@/app/(auth)/register/action";

function RegisterForm() {
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      phoneNumber: "",
      role: "customer",
    },
  });

  const onSubmit = useCallback(
    async function (data: RegisterSchema) {
      const id = toast.loading("جاري التسجيل...");
      try {
        await registerAction(data);
        toast.success("تم التسجيل بنجاح!", { id });
        form.reset();
      } catch {
        toast.error("حدث خطأ أثناء التسجيل. حاول مرة أخرى.", { id });
      }
    },
    [form],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم الكامل</FormLabel>
              <FormControl>
                <Input {...field} placeholder="أدخل اسمك الكامل" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>اسم المستخدم</FormLabel>
              <FormControl>
                <Input {...field} placeholder="أدخل اسم المستخدم" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="example@domain.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input {...field} type="tel" placeholder="+1234567890" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="أدخل كلمة المرور" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton label="تسجيل" labelOnLoading="جاري التسجيل..." />
      </form>
    </Form>
  );
}
export default RegisterForm;
