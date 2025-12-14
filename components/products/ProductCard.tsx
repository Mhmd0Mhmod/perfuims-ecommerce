"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import { useSelectedCountry } from "@/hooks/use-selected-country";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.variants?.some((vari) => vari.isAvailable);
  const { selectedCountryEntry: countryEntry } = useSelectedCountry();

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
                {countryEntry &&
                  formatCurrency({
                    amount: Math.min(...product.variants.map((v) => v.price)),
                    currency: countryEntry.currency,
                    code: countryEntry.code,
                  })}
              </span>
              {Math.min(...product.variants.map((v) => v.price)) !==
                Math.max(...product.variants.map((v) => v.price)) && (
                <>
                  <span className="text-muted-foreground text-sm">-</span>
                  <span className="text-primary text-lg font-bold">
                    {countryEntry &&
                      formatCurrency({
                        amount: Math.max(...product.variants.map((v) => v.price)),
                        currency: countryEntry.currency,
                        code: countryEntry.code,
                      })}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {isAvailable && <AddToCartButton product={product} />}
        {!isAvailable && (
          <Link href={`/products/${product.id}`}>
            <Button variant="outline" className="w-full">
              عرض المنتج
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
