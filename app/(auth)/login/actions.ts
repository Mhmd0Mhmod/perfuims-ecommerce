"use server";

import { signIn } from "@/lib/auth";

export async function login(credentials: { identifier: string; password: string }) {
  try {
    await signIn("credentials", { ...credentials, redirect: false });
  } catch (error) {
    throw error;
  }
}
