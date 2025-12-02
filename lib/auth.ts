import axiosInstance from "@/lib/axios";
import { AxiosError } from "axios";
import NextAuth, { CredentialsSignin, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "../lib/zod";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: number;
    fullName: string;
    username: string;
    email: string;
    phoneNumber: string;
    role: Roles;
    createdAt: string;
  }
  interface Session {
    user: User;
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    token: string;
    userDetails: User;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = "CustomError";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        try {
          const validatedCredentials = signInSchema.parse(credentials);
          const { data } = await axiosInstance.post<{ token: string; userDetails: User }>(
            "auth/login",
            validatedCredentials,
          );
          // Return user with token temporarily (will be separated in jwt callback)
          return {
            ...data.userDetails,
            token: data.token,
          } as User & { token: string };
        } catch (error) {
          if (error instanceof AxiosError) {
            if (
              error.response?.status === 400 &&
              error.response.data?.message === "Bad credentials"
            ) {
              throw new CustomError(
                "بيانات  غير صحيحة. يرجى التحقق من بريدك الإلكتروني/اسم المستخدم وكلمة المرور.",
              );
            }
            const message =
              error.response?.data?.message || "An error occurred during authentication";
            throw new CustomError(message);
          }
          const message = error instanceof Error ? error.message : "An unknown error occurred";
          throw new CustomError(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Store token separately from user details
        const { token: authToken, ...userDetails } = user as User & { token: string };
        token.token = authToken;
        token.userDetails = userDetails as User;
      }
      return token;
    },
    session({ session, token }) {
      return {
        ...session,
        user: token.userDetails,
        token: token.token,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});

export async function getUser() {
  const session = await auth();
  return session?.user as User;
}

export async function getToken() {
  const session = await auth();
  return session?.token as string;
}
