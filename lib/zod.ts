import { z } from "zod";

export const signInSchema = z.object({
  identifier: z
    .string({ message: "اسم المستخدم أو البريد الإلكتروني مطلوب" })
    .min(3, { message: "يجب أن يكون 3 أحرف على الأقل" }),
  password: z.string().min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
});
export type SignInSchema = z.infer<typeof signInSchema>;

export const registerSchema = z.object({
  username: z
    .string({ message: "اسم المستخدم مطلوب" })
    .min(3, { message: "اسم المستخدم يجب أن يكون 3 أحرف على الأقل" }),
  password: z
    .string({ message: "كلمة المرور مطلوبة" })
    .min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
  email: z
    .string({ message: "البريد الإلكتروني مطلوب" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "البريد الإلكتروني غير صالح" }),
  fullName: z
    .string({ message: "الاسم الكامل مطلوب" })
    .min(3, { message: "الاسم الكامل يجب أن يكون 3 أحرف على الأقل" }),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d{1,14}$/, { message: "رقم الهاتف غير صالح" })
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  role: z.literal("customer"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const addCountrySchema = z.object({
  name: z.string(),
  currency: z.string(),
  isActive: z.boolean(),
});
export type AddCountrySchema = z.infer<typeof addCountrySchema>;

export const addCategorySchema = z.object({
  name: z.string({ message: "اسم التصنيف مطلوب" }).min(3, {
    message: "اسم التنصيف يجب ان يكون 3 احرف علي الاقل",
  }),
  description: z.string().nullable(),
  countryId: z.number().or(z.string()),
  isActive: z.boolean(),
});
export type AddCategorySchema = z.infer<typeof addCategorySchema>;
