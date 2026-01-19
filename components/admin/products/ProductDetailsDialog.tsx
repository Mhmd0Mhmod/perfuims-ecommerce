"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Product } from "@/types/product";
import { Calendar, DollarSign, Hash, Tag } from "lucide-react";
import Image from "next/image";

export function ProductDetailsDialog({ product }: { product: Product }) {
  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));
  const { selectedCountry } = useSelectedCountry();
  return (
    <ScrollArea className="max-h-[70vh] px-4">
      <div className="space-y-6 pb-6 sm:max-w-[600px]">
        {/* Product Image Card */}

        {/* Basic Info Card */}
        <Card>
          <CardHeader className="text-right">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <CardDescription className="text-base">{product.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {product.categoryNames && product.categoryNames.length > 0 ? (
                product.categoryNames.map((catName) => (
                  <Badge variant="outline" key={catName} className="text-sm">
                    <Tag className="ml-1 h-3 w-3" />
                    {catName}
                  </Badge>
                ))
              ) : (
                <Badge variant="secondary" className="text-sm">
                  <Tag className="ml-1 h-3 w-3" />
                  بدون تصنيف
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card dir="rtl">
          <CardHeader className="text-right">
            <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Hash className="h-4 w-4" />
                رقم المنتج
              </span>
              <span className="font-medium">#{product.id}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Tag className="h-4 w-4" />
                التصنيفات
              </span>
              <span className="font-medium">
                {product.categoryNames && product.categoryNames.length > 0
                  ? product.categoryNames.join(", ")
                  : "بدون تصنيف"}
              </span>
            </div>

            <div className="bg-primary/5 flex items-center justify-between rounded-lg border p-4">
              <span className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4" />
                نطاق الأسعار
              </span>
              {product.variants.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-primary text-xl font-bold">
                    {selectedCountry &&
                      formatCurrency({
                        amount: minPrice,
                        code: selectedCountry,
                      })}
                  </span>
                  {minPrice !== maxPrice && (
                    <>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-primary text-xl font-bold">
                        {selectedCountry &&
                          formatCurrency({
                            amount: maxPrice,
                            code: selectedCountry,
                          })}
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <Badge variant="secondary">غير محدد</Badge>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                تاريخ الإضافة
              </span>
              <span className="font-medium">{formatDate(product.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                آخر تحديث
              </span>
              <span className="font-medium">{formatDate(product.updatedAt)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Variants Card */}
        <Card>
          <CardHeader className="text-right">
            <CardTitle className="flex items-center justify-between text-lg">
              <span>الأحجام المتوفرة</span>
              <Badge variant="outline">{product.variants.length} حجم</Badge>
            </CardTitle>
            <CardDescription>جميع الأحجام المتاحة للمنتج مع الأسعار</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الحجم</TableHead>
                    <TableHead className="text-right">السعر</TableHead>
                    <TableHead className="text-center">الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {product.variants.map((variant) => (
                    <TableRow key={variant.id}>
                      <TableCell className="text-right font-medium">
                        {variant.size} {variant.unit}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {selectedCountry &&
                          formatCurrency({
                            amount: variant.newPrice,
                            code: selectedCountry,
                          })}
                      </TableCell>
                      <TableCell className="text-center">
                        {variant.isAvailable ? (
                          <Badge className="bg-green-500">متوفر</Badge>
                        ) : (
                          <Badge variant="destructive">غير متوفر</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}

export default ProductDetailsDialog;
