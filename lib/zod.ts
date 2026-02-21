import { SIZES_UNITS } from "@/constants/sizes_units";
import { DiscountType } from "@/types/offer";
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
  address: z.string().optional(),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d{1,14}$/, { message: "رقم الهاتف غير صالح" })
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  role: z.literal("customer"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "البريد الإلكتروني غير صالح" }),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.email({ message: "البريد الإلكتروني غير صالح" }),
  otp: z.string().min(6, { message: "الرمز يجب أن يكون 6 أرقام" }),
  newPassword: z.string().min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
  confirmNewPassword: z.string().min(4, { message: "كلمة المرور يجب أن تكون 4 أحرف على الأقل" }),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const addCountrySchema = z.object({
  name: z.string(),
  code: z.string().length(2, { message: "رمز الدولة يجب أن يكون حرفين" }),
  contactNumber: z
    .string()
    .min(3, { message: "رقم الهاتف يجب أن يكون 3 أرقام على الأقل" })
    .max(14, { message: "رقم الهاتف يجب أن يكون 14 أرقام على الأقل" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  address: z.string().min(1, { message: "العنوان مطلوب" }),
  currency: z.string(),
  isActive: z.boolean(),
  flag: z.string(),
  isDefault: z.boolean(),
  paymentMethodIds: z.array(z.number()),
});
export type AddCountrySchema = z.infer<typeof addCountrySchema>;
const baseCategorySchema = {
  name: z.string({ message: "اسم التصنيف مطلوب" }).min(3, {
    message: "اسم التنصيف يجب ان يكون 3 احرف علي الاقل",
  }),
  description: z.string().nullable(),
  isActive: z.boolean(),
  isAtHomePage: z.boolean(),
};
export const addCategorySchema = z.object({
  ...baseCategorySchema,
  children: z.array(z.object(baseCategorySchema)).optional(),
});
export type AddCategorySchema = z.infer<typeof addCategorySchema>;

export const addSizeSchema = z.object({
  size: z.number({ message: "حجم الزجاجة مطلوب" }).min(1, {
    message: "حجم الزجاجة يجب أن يكون أكبر من صفر",
  }),
  unit: z.enum(SIZES_UNITS, { message: "وحدة الحجم مطلوبة" }),
});
export type AddSizeSchema = z.infer<typeof addSizeSchema>;

export const addProductVariantSchema = z
  .object({
    id: z.number().optional(),
    sizeId: z.string().optional().nullable(),
    size: z.number().optional().nullable(),
    unit: z.string().optional().nullable(),
    price: z.number().refine((val) => val >= 0, {
      message: "السعر يجب ان يكون رقم موجب",
    }),
    isAvailable: z.boolean(),
  })
  .refine(
    (data) => {
      // Either sizeId is provided OR both size and unit are provided
      return data.sizeId || (data.size && data.size > 0 && data.unit && data.unit.length > 0);
    },
    {
      message: "يجب اختيار حجم من القائمة أو إدخال حجم ووحدة مخصصة",
    },
  );
export type AddProductVariantSchema = z.infer<typeof addProductVariantSchema>;
export const addProductSchema = z.object({
  name: z.string({ message: "اسم المنتج مطلوب" }).min(3, {
    message: "اسم المنتج يجب ان يكون 3 احرف علي الاقل",
  }),
  description: z.string().optional(),
  variants: z.array(addProductVariantSchema).optional(),
  categoryIds: z.array(z.string()).optional(),
  image: z.instanceof(File).optional(),
});
export type AddProductSchema = z.infer<typeof addProductSchema>;

export const offerSchema = z.object({
  title: z.string().min(2, "العنوان يجب أن يكون حرفين على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  discountType: z.enum(DiscountType),
  discountValue: z.number().min(0, "قيمة الخصم يجب أن تكون أكبر من 0"),
  startDate: z.date(),
  endDate: z.date(),
  isActive: z.boolean(),
  productVariantIds: z.array(z.number()),
});

export type OfferFormValues = z.infer<typeof offerSchema>;

export const checkoutSchema = z.object({
  fullName: z.string({ message: "الاسم الكامل مطلوب" }).min(3, "يجب أن يكون 3 أحرف على الأقل"),
  email: z.string({ message: "البريد الإلكتروني مطلوب" }).email("بريد إلكتروني غير صالح"),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\+?\d{1,14}$/, "رقم الهاتف غير صالح")
    .min(10, "يجب أن يكون 10 أرقام على الأقل"),
  city: z.string({ message: "المدينة مطلوبة" }).min(2, "يجب أن تكون حرفين على الأقل"),
  address: z.string({ message: "العنوان التفصيلي مطلوب" }).min(5, "يجب أن يكون 5 أحرف على الأقل"),
  paymentMethodId: z.number(),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;

export const updateProfileSchema = z.object({
  fullName: z
    .string({ message: "الاسم الكامل مطلوب" })
    .min(3, { message: "الاسم الكامل يجب أن يكون 3 أحرف على الأقل" }),
  email: z
    .string({ message: "البريد الإلكتروني مطلوب" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "البريد الإلكتروني غير صالح" }),
  phoneNumber: z
    .string({ message: "رقم الهاتف مطلوب" })
    .regex(/^\d{1,14}$/, { message: "رقم الهاتف غير صالح" })
    .min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  address: z.string().optional(),
});
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;

export const storeSettingsSchema = z.object({
  facebookUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  whatsappNumber: z.string().optional(),
});

export type StoreSettingsSchema = z.infer<typeof storeSettingsSchema>;
