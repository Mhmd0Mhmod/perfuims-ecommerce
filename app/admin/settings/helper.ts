import { authFetcher } from "@/lib/authFetcher";
import { throwingError } from "@/lib/utils";
import { StoreSettingsSchema } from "@/lib/zod";

export async function getStoreSettings() {
  try {
    const { data } = await authFetcher.get<StoreSettingsSchema>("admin/settings");
    return data;
  } catch (error) {
    // Return default values if settings don't exist yet
    return {
      storeName: "متجر العطور",
      storeDescription: "أفضل أنواع العطور الأصلية",
      contactEmail: "info@perfumes.com",
      contactPhone: "0123456789",
      address: "الرياض، المملكة العربية السعودية",
      facebookUrl: "",
      instagramUrl: "",
      whatsappNumber: "",
      isMaintenanceMode: false,
    } as StoreSettingsSchema;
  }
}
