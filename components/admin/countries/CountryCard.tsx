import ActiveBadge from "@/components/shared/active-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Calendar, DollarSign, Edit, Eye, MoreHorizontal, Power, Trash2 } from "lucide-react";
import Image from "next/image";
function CountryCard({ country, flagUrl }: { country: Country; flagUrl: string }) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative rounded-sm border">
              <Image src={flagUrl} alt={`${country.name} Flag`} width={40} height={30} />
            </div>
            <div className="flex-1 text-right">
              <CardTitle className="text-xl">{country.name}</CardTitle>
              <CardDescription className="mt-1">#{country.id}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>الإجراءات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2">
                <Edit className="h-4 w-4" />
                تعديل البيانات
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Eye className="h-4 w-4" />
                عرض التفاصيل
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Power className="h-4 w-4" />
                {country.isActive ? "تعطيل" : "تفعيل"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive gap-2">
                <Trash2 className="h-4 w-4" />
                حذف الدولة
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
              <DollarSign className="text-muted-foreground h-4 w-4" />
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
