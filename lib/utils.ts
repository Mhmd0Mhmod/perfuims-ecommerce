import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
export function formatDate(dateString: string, type: "short" | "long" = "long"): string {
  const date = new Date(dateString);
  if (type === "short") {
    return Intl.DateTimeFormat("ar-EG", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  }
  return Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}
export function throwingError(error: unknown) {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data.message || "An unexpected error occurred");
  }
  if (error instanceof Error) {
    throw new Error(error.message);
  }
  throw new Error("An unexpected error occurred");
}
export function ErrorResponse<T = void>(error: unknown): ApiResponse<T> {
  if (error instanceof AxiosError) {
    const axiosError = error as AxiosError<{ message: string }>;

    return {
      success: false,
      status: axiosError.response?.status || 500,
      error: axiosError.response?.statusText || "Internal Server Error",
      message: axiosError.response?.data.message || "An unexpected error occurred",
    };
  }
  if (error instanceof Error) {
    return {
      success: false,
      status: 500,
      error: "Internal Server Error",
      message: error.message,
    };
  }
  return {
    success: false,
    status: 500,
    error: "Internal Server Error",
    message: "An unexpected error occurred",
  };
}

// Country configuration mapping: code -> { locale, currency }
const COUNTRY_CONFIG: Record<string, { locale: string; currency: string }> = {
  // Middle East
  SA: { locale: "ar-SA", currency: "SAR" }, // Saudi Arabia
  AE: { locale: "ar-AE", currency: "AED" }, // UAE
  KW: { locale: "ar-KW", currency: "KWD" }, // Kuwait
  QA: { locale: "ar-QA", currency: "QAR" }, // Qatar
  BH: { locale: "ar-BH", currency: "BHD" }, // Bahrain
  OM: { locale: "ar-OM", currency: "OMR" }, // Oman
  JO: { locale: "ar-JO", currency: "JOD" }, // Jordan
  LB: { locale: "ar-LB", currency: "LBP" }, // Lebanon
  IQ: { locale: "ar-IQ", currency: "IQD" }, // Iraq
  SY: { locale: "ar-SY", currency: "SYP" }, // Syria
  YE: { locale: "ar-YE", currency: "YER" }, // Yemen
  PS: { locale: "ar-PS", currency: "ILS" }, // Palestine
  // North Africa
  EG: { locale: "ar-EG", currency: "EGP" }, // Egypt
  LY: { locale: "ar-LY", currency: "LYD" }, // Libya
  TN: { locale: "ar-TN", currency: "TND" }, // Tunisia
  DZ: { locale: "ar-DZ", currency: "DZD" }, // Algeria
  MA: { locale: "ar-MA", currency: "MAD" }, // Morocco
  SD: { locale: "ar-SD", currency: "SDG" }, // Sudan
  // Europe
  GB: { locale: "en-GB", currency: "GBP" }, // UK
  DE: { locale: "de-DE", currency: "EUR" }, // Germany
  FR: { locale: "fr-FR", currency: "EUR" }, // France
  IT: { locale: "it-IT", currency: "EUR" }, // Italy
  ES: { locale: "es-ES", currency: "EUR" }, // Spain
  NL: { locale: "nl-NL", currency: "EUR" }, // Netherlands
  // Americas
  US: { locale: "en-US", currency: "USD" }, // USA
  CA: { locale: "en-CA", currency: "CAD" }, // Canada
  // Asia
  TR: { locale: "tr-TR", currency: "TRY" }, // Turkey
  PK: { locale: "ur-PK", currency: "PKR" }, // Pakistan
  IN: { locale: "en-IN", currency: "INR" }, // India
};

export function getCountryConfig(countryCode: string): { locale: string; currency: string } {
  return COUNTRY_CONFIG[countryCode?.toUpperCase()] || { locale: "ar-EG", currency: "EGP" };
}

export function formatCurrency({ amount, code }: { amount: number; code: string }): string {
  const { locale, currency } = getCountryConfig(code);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
