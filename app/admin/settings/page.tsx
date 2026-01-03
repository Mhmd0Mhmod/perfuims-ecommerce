import { SettingsForm } from "@/components/admin/settings/SettingsForm";
import { getStoreSettings } from "./helper";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <div className="flex-1 space-y-4 p-8 pt-6" dir="rtl">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">إعدادات النظام</h2>
      </div>

      <div className="grid gap-4">
        <SettingsForm initialData={settings} />
      </div>
    </div>
  );
}
