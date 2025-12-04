"use server";

import { signIn } from "@/lib/auth";
import { ErrorResponse } from "@/lib/utils";
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
