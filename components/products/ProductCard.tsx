"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import { Country } from "@/types/country";
import { Product } from "@/types/product";
import { Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.variants?.some((vari) => vari.isAvailable);
  const { selectedCountryEntry: countryEntry } = useSelectedCountry();

  const minPrice = Math.min(...product.variants.map((v) => v.newPrice));
  const maxPrice = Math.max(...product.variants.map((v) => v.newPrice));

  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden p-0 transition-all hover:shadow-lg">
      {/* Image Section */}
      <Link href={`/products/${product.id}`} className="relative block">
        <div className="bg-muted relative aspect-square overflow-hidden">
          <Image
            src={product.imageUrl || "/assets/logo.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Top overlay: badges */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <div className="flex flex-wrap gap-1">
              <ProductBadges product={product} />
            </div>
          </div>

          {/* Bottom overlay: price + availability */}
          <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 pt-6 pb-3">
            <div className="flex items-end justify-between">
              {product.variants.length > 0 && countryEntry && (
                <ProductPriceDisplay
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  countryEntry={countryEntry}
                />
              )}
              {!isAvailable && <Badge variant="destructive">غير متوفر</Badge>}
            </div>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col gap-3 p-3">
        {/* Name + Description */}
        <Link href={`/products/${product.id}`} className="group/title">
          <CardTitle className="group-hover/title:text-primary">{product.name}</CardTitle>
          {product.description && (
            <CardDescription className="text-muted-foreground line-clamp-2">
              {product.description}
            </CardDescription>
          )}
        </Link>

        {/* Add to Cart Section */}
        <div className="mt-auto">
          {isAvailable ? (
            <AddToCartButton product={product} />
          ) : (
            <Link
              href={`/products/${product.id}`}
              className="border-primary text-primary hover:bg-primary/5 flex w-full items-center justify-center rounded-md border py-2 text-sm font-medium transition-colors"
            >
              عرض المنتج
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProductBadges({ product }: { product: Product }) {
  const badges = [
    ...(product.variants.some((v) => v.offerId)
      ? [
          <Badge variant="destructive" className="shadow-sm">
            {product.variants.find((v) => v.offerId)?.offerTitle || "عرض"}
          </Badge>,
        ]
      : []),
    ...product.categories.map((cat) => (
      <Badge className="bg-primary/90 shadow-sm backdrop-blur-sm" key={cat.id}>
        {cat.name}
      </Badge>
    )),
  ];

  const visibleBadges = badges.slice(0, 2);

  return (
    <>
      {visibleBadges}
      {badges.length > 2 && (
        <Badge className="bg-black/50 shadow-sm backdrop-blur-sm" key="more">
          +{badges.length - 2}
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
    <div className="flex items-center gap-1">
      <span className="text-base font-bold text-white drop-shadow-md">
        {formatCurrency({ amount: minPrice, code: countryEntry.code })}
      </span>
      {minPrice !== maxPrice && (
        <>
          <Minus className="h-3.5 w-3.5 text-white/70" />
          <span className="text-base font-bold text-white drop-shadow-md">
            {formatCurrency({ amount: maxPrice, code: countryEntry.code })}
          </span>
        </>
      )}
    </div>
  );
}

export default ProductCard;
