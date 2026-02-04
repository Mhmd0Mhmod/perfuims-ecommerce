import AddToCartButton from "@/components/products/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CountryAPI } from "@/lib/api/country";
import { ProductAPI } from "@/lib/api/product";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, Star, Truck } from "lucide-react";
import Image from "next/image";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [product, country] = await Promise.all([
    ProductAPI.getProductById(id),
    CountryAPI.getCurrentCountryServer(),
  ]);
  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));

  return (
    <div className="flex min-h-[90vh] flex-col items-center px-2 py-8">
      <div className="grid w-full max-w-5xl grid-cols-1 items-start gap-10 md:grid-cols-2">
        {/* Product Image + Gallery */}
        <div className="sticky top-8 flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl border shadow-2xl">
            <Image
              src={product.imageUrl || "/assets/logo.png"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Feature icons */}
          <div className="mt-2 flex justify-center gap-4">
            <div className="text-muted-foreground flex flex-col items-center text-xs">
              <Star className="mb-1 text-yellow-400" size={20} />
              <span>جودة عالية</span>
            </div>
            <div className="text-muted-foreground flex flex-col items-center text-xs">
              <ShieldCheck className="mb-1 text-green-500" size={20} />
              <span>ضمان أصلي</span>
            </div>
            <div className="text-muted-foreground flex flex-col items-center text-xs">
              <Truck className="mb-1 text-blue-400" size={20} />
              <span>توصيل سريع</span>
            </div>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <CardTitle className="font-extrabolddrop-shadow-sm mb-1 text-4xl leading-tight">
              {product.name}
            </CardTitle>
            <div className="mb-2 flex flex-wrap gap-2">
              {product.categories.map((cat) => (
                <Badge key={cat.id} variant="secondary">
                  {cat.name}
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-primary text-2xl font-bold">
                {country &&
                  formatCurrency({
                    amount: minPrice,

                    code: country.code,
                  })}
              </span>

              {country && minPrice !== maxPrice && (
                <>
                  <span className="text-muted-foreground mx-1">-</span>
                  <span className="text-primary text-2xl font-bold">
                    {formatCurrency({
                      amount: maxPrice,

                      code: country.code,
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
          <div>
            <Card className="border-none bg-transparent shadow-none">
              <CardContent className="flex flex-col gap-4 p-6">
                <AddToCartButton product={product} />
              </CardContent>
            </Card>
          </div>
          {/* Details/Description Tab */}
          <div className="mt-4">
            <Card className="border-0 bg-slate-50/80">
              <CardHeader>
                <CardTitle className="text-lg">تفاصيل المنتج</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-base whitespace-pre-line">
                  {product.description}
                </CardDescription>
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Badge
                      key={variant.id}
                      variant={variant.isAvailable ? "outline" : "destructive"}
                      className="px-2 py-1 text-xs"
                    >
                      {variant.size} {variant.unit} - {variant.newPrice} ر.س{" "}
                      {variant.isAvailable ? "متوفر" : "غير متوفر"}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Meta info */}
          <div className="text-muted-foreground mt-2 text-xs">
            <span>تمت الإضافة: {new Date(product.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">|</span>
            <span>آخر تحديث: {new Date(product.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Related products placeholder */}
      <div className="mt-16 w-full max-w-5xl">
        <Card className="border-0 bg-linear-to-br from-slate-100 to-white/80 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">منتجات مقترحة</CardTitle>
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
