"use server";
import { auth } from "@/lib/auth";
import { User } from "next-auth";

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}

export async function getToken() {
  const session = await auth();
  return session?.token as string;
}
