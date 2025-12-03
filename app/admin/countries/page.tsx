import CountryCard from "@/components/admin/countries/CountryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Globe, Plus, Search, XCircle } from "lucide-react";
import { getAllCountries, getCountries, getCountryFlag } from "./helpers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCountryForm from "@/components/admin/countries/AddCountryForm";
async function page() {
  const countries = await getCountries();
  await getAllCountries();
  const countriesWithFlags = await Promise.all(
    countries.content.map(async (country: Country) => ({
      country,
      flagUrl: (await getCountryFlag(country.name)) || "/placeholder-flag.svg",
    })),
  );

  const totalCountries = countries.totalElements;
  const activeCountries = countries.content.filter((c: Country) => c.isActive).length;
  const inactiveCountries = countries.content.filter((c: Country) => !c.isActive).length;

  return (
    <div className="container mx-auto space-y-6 p-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الدول</CardTitle>
            <Globe className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCountries}</div>
            <p className="text-muted-foreground text-xs">جميع الدول المسجلة</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الدول النشطة</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCountries}</div>
            <p className="text-muted-foreground text-xs">متاحة للشحن</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الدول غير النشطة</CardTitle>
            <XCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveCountries}</div>
            <p className="text-muted-foreground text-xs">غير متاحة حالياً</p>
          </CardContent>
        </Card>
      </div>

      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="text-right">
          <h1 className="text-2xl font-bold">قائمة الدول</h1>
          <p className="text-muted-foreground text-sm">إدارة وعرض جميع الدول المتاحة للشحن</p>
        </div>
        <div className="flex w-full gap-2 md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input placeholder="ابحث عن دولة..." className="pr-10" />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة دولة
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle></DialogTitle>
              </DialogHeader>
              <AddCountryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Countries Grid */}
      {countries.content.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {countriesWithFlags.map(({ country, flagUrl }) => (
            <CountryCard key={country.id} country={country} flagUrl={flagUrl} />
          ))}
        </div>
      ) : (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center gap-4">
            <Globe className="text-muted-foreground h-16 w-16" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">لا توجد دول مسجلة</h3>
              <p className="text-muted-foreground mt-1 text-sm">ابدأ بإضافة دولة جديدة</p>
            </div>
            <Button className="mt-2 gap-2">
              <Plus className="h-4 w-4" />
              إضافة دولة
            </Button>
          </div>
        </Card>
      )}

      {/* Pagination Info */}
      {countries.content.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-muted-foreground text-sm">
            عرض {countries.content.length} من {totalCountries} دولة
          </div>
          <div className="text-muted-foreground text-sm">
            صفحة {countries.number + 1} من {countries.totalPages}
          </div>
        </div>
      )}
    </div>
  );
}
export default page;
