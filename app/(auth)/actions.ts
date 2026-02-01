"use server";
import { auth, signIn } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { ForgotPasswordSchema, RegisterSchema, ResetPasswordSchema, SignInSchema } from "@/lib/zod";
import { APIResponse, IAPIResponse } from "@/types/api";
import { User } from "next-auth";

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}
export async function login(credentials: SignInSchema) {
  try {
    await signIn("credentials", { ...credentials, redirect: false });
    const session = await auth();
    return APIResponse.success<User>(session?.user as User, "تم تسجيل الدخول بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function registerAction(formData: RegisterSchema): Promise<IAPIResponse<User>> {
  try {
    const response = await fetcher.post("auth/register", formData);
    return APIResponse.success<User>(response.data.user, "تم إنشاء الحساب بنجاح");
  } catch (error) {
    return APIResponse.error(error);
  }
}
export async function forgotPassword(data: ForgotPasswordSchema) {
  try {
    await fetcher.post("auth/forgot-password", data);
    return APIResponse.success<void>(
      undefined,
      "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني",
    );
  } catch (error) {
    return APIResponse.error(error);
  }
}

export async function resetPassword(data: ResetPasswordSchema) {
  try {
    const response = await fetcher.post("auth/reset-password", data);
    return APIResponse.success<void>(undefined, response.data.message);
  } catch (error) {
    return APIResponse.error(error);
  }
}
