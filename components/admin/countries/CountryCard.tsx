import ActiveBadge from "@/components/shared/active-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";
import Image from "next/image";
import DeleteCountryButton from "./DeleteCountryButton";
import EditCountryButton from "./EditCountryButton";
function CountryCard({ country }: { country: Country }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative rounded-sm border">
              <Image src={country.flagUrl} alt={`${country.name} Flag`} width={40} height={30} />
            </div>
            <div className="flex-1 text-right">
              <CardTitle className="text-xl">{country.name}</CardTitle>
              <CardDescription className="mt-1">#{country.id}</CardDescription>
            </div>
          </div>
          <div className="space-x-2">
            <EditCountryButton country={country} />
            <DeleteCountryButton countryId={country.id} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">الحالة</span>
          <ActiveBadge isActive={country.isActive} />
        </div>
        <Separator />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">العملة</span>
            <div className="flex items-center gap-2">
              <span className="font-medium">{country.currency}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">تاريخ الإضافة</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {new Date(country.createdAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">آخر تحديث</span>
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {new Date(country.updatedAt).toLocaleDateString("ar-EG", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <Calendar className="text-muted-foreground h-4 w-4" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CountryCard;
