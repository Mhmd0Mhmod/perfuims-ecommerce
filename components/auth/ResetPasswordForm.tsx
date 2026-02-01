"use client";
import { resetPassword } from "@/app/(auth)/actions";
import { resetPasswordSchema, ResetPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "../shared/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { PasswordInput } from "../ui/password-input";

function ResetPasswordForm({ email }: { email: string }) {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email,
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });
  const onSubmit = async (data: ResetPasswordSchema) => {
    const id = toast.loading("جاري إعادة تعيين كلمة المرور...");
    const respone = await resetPassword({
      ...data,
      email: email,
    });
    if (respone?.success) {
      toast.success(respone?.message, { id });
      form.reset();
    } else {
      toast.error(respone?.message, { id });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          control={form.control}
          disabled={true}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input
                  placeholder="أدخل بريدك الإلكتروني"
                  className="disabled:cursor-not-allowed disabled:border-gray-500 disabled:bg-gray-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="otp"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>رمز التحقق</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="m-auto">
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
          name="newPassword"
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
          name="confirmNewPassword"
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
