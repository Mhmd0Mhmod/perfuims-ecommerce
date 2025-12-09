import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  // Determine if product is available
  const isAvailable = product.isPackage
    ? true
    : product.variants?.some((v) => v.isAvailable) || false;

  // Get price to display
  const displayPrice = product.isPackage
    ? product.price
    : product.variants?.find((v) => v.isAvailable)?.price || product.variants?.[0]?.price;

  return (
    <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <CardHeader className="relative p-0">
        <div className="bg-muted relative aspect-square overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="bg-primary/20 h-32 w-32 rounded-full" />
            </div>
          )}
          {product.categoryName && (
            <Badge className="bg-primary absolute top-4 right-4">{product.categoryName}</Badge>
          )}
          {!isAvailable && (
            <Badge variant="destructive" className="absolute bottom-4 left-4">
              غير متوفر
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-4 left-4 opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-right">
        <CardTitle className="mb-2 line-clamp-2 text-lg">{product.name}</CardTitle>
        {product.description && (
          <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">{product.description}</p>
        )}
        <div className="flex items-center justify-between">
          {displayPrice && (
            <span className="text-primary text-xl font-bold">{displayPrice.toFixed(2)}</span>
          )}
          {product.isPackage ? (
            <Badge variant="secondary">عبوة</Badge>
          ) : (
            product.variants &&
            product.variants.length > 0 && (
              <Badge variant="outline">{product.variants.length} أحجام</Badge>
            )
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" disabled={!isAvailable}>
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="ml-2 h-4 w-4" />
            {isAvailable ? "أضف للسلة" : "عرض المنتج"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
