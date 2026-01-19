"use server";
import { auth } from "@/lib/auth";
import { User } from "next-auth";
import { cookies } from "next/headers";

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}
export async function getCookies(cookie: string) {
  const cookiesStore = await cookies();
  return cookiesStore.get(cookie)?.value;
}
