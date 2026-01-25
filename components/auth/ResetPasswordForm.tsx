"use client";
import { resetPassword } from "@/app/(auth)/actions";
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { PasswordInput } from "../ui/password-input";
import SubmitButton from "../shared/submit-button";

function ResetPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: ResetPasswordSchema) => {
    setIsSubmitting(true);
    const id = toast.loading("جاري إعادة تعيين كلمة المرور...");
    const respone = await resetPassword(data);
    if (respone?.success) {
      toast.success(respone?.message, { id });
      form.reset();
    } else {
      toast.error(respone?.message, { id });
    }
    setIsSubmitting(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="token"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>رمز التحقق</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="m-auto flex-row-reverse">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>كلمة المرور الجديدة</FormLabel>
              <FormControl>
                <PasswordInput placeholder="أدخل كلمة المرور الجديدة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>تأكيد كلمة المرور</FormLabel>
              <FormControl>
                <PasswordInput placeholder="أعد إدخال كلمة المرور الجديدة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton />
      </form>
    </Form>
  );
}
export default ResetPasswordForm;
