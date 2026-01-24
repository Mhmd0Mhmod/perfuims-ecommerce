"use client";
import { login } from "@/app/(auth)/actions";
import { SignInSchema, signInSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SubmitButton from "../shared/submit-button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { update } = useSession();
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
        form.setError("root", { type: "server", message: respone?.message });
        toast.error(respone?.message, { id });
        return;
      }
      toast.success("تم تسجيل الدخول بنجاح!", { id });
      await update();
      router.replace("/");
    },
    [router, update, form],
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
                <div className="relative">
                  <Input
                    placeholder="أدخل كلمة المرور"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer p-0"
                  >
                    {showPassword ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root?.message && (
          <p className="text-sm text-red-600">{form.formState.errors.root.message}</p>
        )}
        <SubmitButton />
      </form>
    </Form>
  );
}
export default LoginForm;
