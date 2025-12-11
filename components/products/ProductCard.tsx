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
  const isAvailable = product.variants?.some((vari) => vari.isAvailable);
  return (
    <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <CardHeader className="relative p-0">
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="flex items-center gap-2">
            {product.categoryNames.map((catName) => (
              <Badge className="bg-primary absolute top-4 right-4" key={catName}>
                {catName}
              </Badge>
            ))}
          </div>
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
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-xs">
            {product.variants.length} أحجام
          </Badge>
          {product.variants.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-primary text-lg font-bold">
                {Math.min(...product.variants.map(v => v.price))}
              </span>
              {Math.min(...product.variants.map(v => v.price)) !== Math.max(...product.variants.map(v => v.price)) && (
                <>
                  <span className="text-muted-foreground text-sm">-</span>
                  <span className="text-primary text-lg font-bold">
                    {Math.max(...product.variants.map(v => v.price))}
                  </span>
                </>
              )}
              <span className="text-muted-foreground text-sm">ر.س</span>
            </div>
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
