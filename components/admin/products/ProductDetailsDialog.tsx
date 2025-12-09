"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { Product } from "@/types/product";
import { Eye, Package } from "lucide-react";
import Image from "next/image";

export function ProductDetailsDialog({ product }: { product: Product }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogClose />
        <DialogHeader>
          <DialogTitle className="text-right">تفاصيل المنتج</DialogTitle>
          <DialogDescription className="text-right">
            معلومات كاملة عن المنتج وأحجامه
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[70vh] space-y-6 overflow-y-auto px-4 sm:max-w-[600px]">
          {/* Product Image */}
          <div className="relative aspect-square max-h-32 w-full max-w-full overflow-hidden rounded-lg">
            <Image
              src={product.imageUrl || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Basic Info */}
          <div className="space-y-4 text-right">
            <div>
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{product.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{product.categoryName}</Badge>
              {product.isPackage ? (
                <Badge className="bg-blue-500">
                  <Package className="ml-1 h-3 w-3" />
                  باقة
                </Badge>
              ) : (
                <Badge variant="secondary">منتج فردي</Badge>
              )}
            </div>

            <Separator />

            {/* Details Grid */}
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">رقم المنتج:</span>
                <span className="font-medium">#{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">التصنيف:</span>
                <span className="font-medium">{product.categoryName}</span>
              </div>
              {!product.isPackage && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">السعر:</span>
                  <span className="text-lg font-bold">{product.price} </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">تاريخ الإضافة:</span>
                <span className="font-medium">{formatDate(product.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">آخر تحديث:</span>
                <span className="font-medium">{formatDate(product.updatedAt)}</span>
              </div>
            </div>

            {/* Variants Table */}
            {product.isPackage && product.variants && product.variants.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="mb-3 font-semibold">
                    الأحجام المتوفرة ({product.variants.length})
                  </h4>
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
                            <TableCell className="text-right">{variant.price} ريال</TableCell>
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
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
