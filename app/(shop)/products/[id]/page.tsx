import AddToCartButton from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CountryAPI } from "@/lib/api/country";
import { ProductAPI } from "@/lib/api/product";
import { formatCurrency } from "@/lib/utils";
import {
  CheckCircle2,
  Clock,
  Info,
  Package,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  XCircle,
} from "lucide-react";
import Image from "next/image";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, country] = await Promise.all([
    ProductAPI.getProductById(id),
    CountryAPI.getCurrentCountryServer(),
  ]);
  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));
  const hasDiscount = product.variants.some((v) => v.oldPrice && v.oldPrice > v.newPrice);

  return (
    <div className="flex min-h-[90vh] flex-col items-center px-4 py-8 md:px-6 lg:px-8">
      <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
        {/* ========== Left Column: Image ========== */}
        <div className="sticky top-8 flex flex-col gap-5">
          {/* Main Image */}
          <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-2xl border shadow-lg">
            <Image
              src={product.imageUrl || "/assets/logo.png"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {/* Offer badge on image */}
            {hasDiscount && (
              <div className="absolute top-4 right-4">
                <Badge variant="destructive" className="px-3 py-1 text-sm shadow-md">
                  {product.variants.find((v) => v.offerResponseDTO)?.offerResponseDTO?.title ||
                    "عرض خاص"}
                </Badge>
              </div>
            )}
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 flex flex-col items-center gap-1.5 rounded-xl p-3">
              <Star className="text-yellow-500" size={22} />
              <span className="text-muted-foreground text-xs font-medium">جودة عالية</span>
            </div>
            <div className="bg-muted/50 flex flex-col items-center gap-1.5 rounded-xl p-3">
              <ShieldCheck className="text-green-500" size={22} />
              <span className="text-muted-foreground text-xs font-medium">ضمان أصلي</span>
            </div>
            <div className="bg-muted/50 flex flex-col items-center gap-1.5 rounded-xl p-3">
              <Truck className="text-blue-500" size={22} />
              <span className="text-muted-foreground text-xs font-medium">توصيل سريع</span>
            </div>
          </div>
        </div>

        {/* ========== Right Column: Product Info ========== */}
        <div className="flex flex-col gap-6">
          {/* Header: Name + Categories */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              {product.categories.map((cat) => (
                <Badge key={cat.id} variant="secondary" className="text-xs">
                  {cat.name}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl leading-tight font-bold md:text-4xl">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground text-base leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <Separator />

          {/* Price Section */}
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm font-medium">السعر</span>
            <div className="flex items-baseline gap-3">
              {minPrice !== Number.POSITIVE_INFINITY && country && (
                <span className="text-primary text-3xl font-bold">
                  {formatCurrency({ amount: minPrice, code: country.code })}
                </span>
              )}
              {country && minPrice !== maxPrice && maxPrice !== Number.NEGATIVE_INFINITY && (
                <>
                  <span className="text-muted-foreground text-xl">—</span>
                  <span className="text-primary text-3xl font-bold">
                    {formatCurrency({
                      amount: maxPrice,
                      code: country.code,
                    })}
                  </span>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Add to Cart */}
          <div className="flex flex-col gap-3">
            <span className="text-muted-foreground text-sm font-medium">اختر الحجم والكمية</span>
            <AddToCartButton product={product} />
          </div>

          <Separator />

          {/* Variants Table */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Package className="text-muted-foreground" size={18} />
              <span className="text-sm font-semibold">الأحجام المتوفرة</span>
            </div>
            <div className="grid gap-2">
              {product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className={`flex items-center justify-between rounded-lg border p-3 transition-colors ${
                    variant.isAvailable
                      ? "bg-background hover:bg-muted/50"
                      : "bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {variant.isAvailable ? (
                      <CheckCircle2 className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-destructive" size={16} />
                    )}
                    <span className="text-sm font-medium">
                      {variant.size} {variant.unit}
                    </span>
                    {!variant.isAvailable && (
                      <Badge variant="destructive" className="text-[10px]">
                        غير متوفر
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {variant.oldPrice && variant.oldPrice > variant.newPrice && (
                      <span className="text-muted-foreground text-sm line-through">
                        {country &&
                          formatCurrency({
                            amount: variant.oldPrice,
                            code: country.code,
                          })}
                      </span>
                    )}
                    <span className="text-primary text-sm font-bold">
                      {country &&
                        formatCurrency({
                          amount: variant.newPrice,
                          code: country.code,
                        })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offer Details (if any) */}
          {product.variants.some((v) => v.offerResponseDTO) && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-yellow-500" size={18} />
                  <span className="text-sm font-semibold">تفاصيل العرض</span>
                </div>
                <Card className="border-yellow-200 bg-yellow-50/50">
                  <CardContent className="p-4">
                    {product.variants
                      .filter((v) => v.offerResponseDTO)
                      .map((v) => (
                        <p key={v.id} className="text-sm leading-relaxed text-yellow-900">
                          <span className="font-semibold">{v.offerResponseDTO?.title}:</span>{" "}
                          {v.offerResponseDTO?.description}
                        </p>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          <Separator />

          {/* Meta info */}
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Clock size={14} />
              <span>تمت الإضافة: {new Date(product.createdAt).toLocaleDateString("ar")}</span>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Info size={14} />
              <span>آخر تحديث: {new Date(product.updatedAt).toLocaleDateString("ar")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========== Related Products ========== */}
      <div className="mt-16 w-full max-w-6xl">
        <Card className="border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">منتجات مقترحة</CardTitle>
            <CardDescription>منتجات قد تعجبك أيضًا</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground py-8 text-center">
              سيتم عرض منتجات مشابهة هنا قريبًا.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
