"use server";
import { auth, signIn } from "@/lib/auth";
import { fetcher } from "@/lib/fetcher";
import { ErrorResponse } from "@/lib/utils";
import { ForgotPasswordSchema, RegisterSchema, ResetPasswordSchema, SignInSchema } from "@/lib/zod";
import { User } from "next-auth";

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}
export async function login(credentials: SignInSchema) {
  try {
    await signIn("credentials", { ...credentials, redirect: false });
    return {
      success: true,
      message: "تم تسجيل الدخول بنجاح",
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function registerAction(formData: RegisterSchema): Promise<ApiResponse<User>> {
  try {
    const response = await fetcher.post("auth/register", formData);
    return {
      data: response.data,
      status: response.status,
      message: "تم التسجيل بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
export async function forgotPassword(data: ForgotPasswordSchema) {
  try {
    const response = await fetcher.post("auth/forgot-password", data);
    return {
      data: response.data,
      status: response.status,
      message: "تم إرسال رابط إعادة تعيين كلمة المرور بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}

export async function resetPassword(data: ResetPasswordSchema) {
  try {
    console.log(data);

    const response = await fetcher.post("auth/reset-password", data);
    return {
      data: response.data,
      status: response.status,
      message: "تم إعادة تعيين كلمة المرور بنجاح",
      success: true,
    };
  } catch (error) {
    return ErrorResponse(error);
  }
}
