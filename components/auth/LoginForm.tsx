"use client";
import { login } from "@/app/(auth)/login/actions";
import { SignInSchema, signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "../shared/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
function LoginForm() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });
  const handleSubmit = useCallback(
    async (data: SignInSchema) => {
      const id = toast.loading("جارٍ تسجيل الدخول...");
      const respone = await login(data);
      if (!respone?.success) {
        toast.error(respone?.message, { id });
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح!", { id });
      router.push("/");
    },
    [router],
  );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          name="identifier"
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
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input placeholder="أدخل كلمة المرور" type="password" {...field} />
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
export default LoginForm;
