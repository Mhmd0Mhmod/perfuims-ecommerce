"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ProductOffer from "./ProductOffer";
import { ProductProvider } from "@/context/ProductContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const isAvailable = product.variants?.some((vari) => vari.isAvailable);

  return (
    <ProductProvider product={product}>
      {" "}
      <Card className="group relative flex h-full flex-col gap-0 overflow-hidden p-0 transition-all hover:shadow-lg">
        {/* Image Section */}
        <Link href={`/products/${product.id}`} className="relative block">
          <div className="bg-muted aspect-square overflow-hidden">
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
            {/* Top Overlay : Offer */}
            <div className="absolute top-0 left-0 flex items-start justify-between px-3">
              <ProductOffer />
            </div>

            {/* Bottom overlay: price + availability */}
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-3 pt-6 pb-3">
              {!isAvailable && <Badge variant="destructive">غير متوفر</Badge>}
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
    </ProductProvider>
  );
}

function ProductBadges({ product }: { product: Product }) {
  return (
    <>
      {product.categories.slice(0, 2).map((category) => (
        <Badge className="bg-primary/90 shadow-sm backdrop-blur-sm" key={category.id}>
          {category.name}
        </Badge>
      ))}
      {product.categories.length > 2 && (
        <Badge className="bg-black/50 shadow-sm backdrop-blur-sm" key="more">
          +{product.categories.length - 2}
        </Badge>
      )}
    </>
  );
}

export default ProductCard;
