"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import { Country } from "@/types/country";
import { Product } from "@/types/product";
import { Heart, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.variants?.some((vari) => vari.isAvailable);
  const { selectedCountryEntry: countryEntry } = useSelectedCountry();
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));

  return (
    <Card className="group gap-2 overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <CardHeader className="relative p-0">
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            onClick={handleCardClick}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 flex items-end gap-2">
            <ProductBadges product={product} />
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
      <CardContent className="text-right">
        <div className="flex items-center justify-between gap-2">
          <div>
            <CardTitle className="line-clamp-2 text-lg">{product.name}</CardTitle>
            {product.description && (
              <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
            )}
          </div>
          <Badge variant="outline" className="text-xs">
            {product.variants.length} أحجام
          </Badge>
        </div>
        <div className="flex items-center justify-between gap-2">
          {product.variants.length > 0 && (
            <ProductPriceDisplay
              minPrice={minPrice}
              maxPrice={maxPrice}
              countryEntry={countryEntry!}
            />
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

function ProductBadges({ product }: { product: Product }) {
  const badges = [
    ...(product.variants.some((v) => v.offerId)
      ? [
          <Badge variant="destructive" key="offer">
            {product.variants.find((v) => v.offerId)?.offerTitle || "عرض"}
          </Badge>,
        ]
      : []),
    ...product.categories.map((cat) => (
      <Badge className="bg-primary" key={cat.id}>
        {cat.name}
      </Badge>
    )),
  ];

  const visibleBadges = badges.slice(0, 2);

  return (
    <>
      {visibleBadges}
      {badges.length > 3 && (
        <Badge className="bg-primary/80" key="more">
          +{badges.length - 3}
        </Badge>
      )}
    </>
  );
}

function ProductPriceDisplay({
  minPrice,
  maxPrice,
  countryEntry,
}: {
  minPrice: number;
  maxPrice: number;
  countryEntry: Country;
}) {
  return (
    <div className="flex w-full items-center justify-end gap-1">
      <div className="flex items-center gap-2">
        <span className="text-primary text-lg font-bold">
          {countryEntry &&
            formatCurrency({
              amount: minPrice,
              code: countryEntry.code,
            })}
        </span>
      </div>
      {minPrice !== maxPrice && (
        <>
          <Minus className="text-muted-foreground h-4 w-4" />
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg font-bold">
              {countryEntry &&
                formatCurrency({
                  amount: maxPrice,
                  code: countryEntry.code,
                })}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductCard;
