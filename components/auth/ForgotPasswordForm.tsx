"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/zod";
import { useCallback } from "react";
import { forgotPassword } from "@/app/(auth)/actions";
import { useRouter } from "next/navigation";
function ForgotPasswordForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const handleSubmit = useCallback(
    async (data: ForgotPasswordSchema) => {
      const id = toast.loading("جارٍ إرسال رابط إعادة تعيين كلمة المرور...");
      const respone = await forgotPassword(data);
      if (!respone?.success) {
        form.setError("root", { type: "server", message: respone?.message });
        toast.error(respone?.message, { id });
        return;
      }
      toast.success(respone?.message, { id });
      const token = encodeURI(data.email);
      router.replace(`/reset-password?t=${token}`);
    },
    [router, form],
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>البريد الإلكتروني أو اسم المستخدم</FormLabel>
              <FormControl>
                <Input placeholder="أدخل بريدك الإلكتروني أو اسم المستخدم" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message && (
          <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
        )}
        <Button type="submit" className="w-full">
          إرسال رابط إعادة تعيين كلمة المرور
        </Button>
      </form>
    </Form>
  );
}
export default ForgotPasswordForm;
