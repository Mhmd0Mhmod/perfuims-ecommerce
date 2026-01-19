"use server";
import { auth } from "@/lib/auth";
import { authFetcher } from "@/lib/authFetcher";
import { ErrorResponse } from "@/lib/utils";
import { RegisterSchema } from "@/lib/zod";
import { User } from "next-auth";

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}

import { signIn } from "@/lib/auth";
import { SignInSchema } from "@/lib/zod";

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
    const response = await authFetcher.post("auth/register", formData);
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
