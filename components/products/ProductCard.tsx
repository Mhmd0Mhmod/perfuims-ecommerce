import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviews: number;
    badge?: string;
    inStock: boolean;
  };
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden p-0 transition-shadow hover:shadow-lg">
      <CardHeader className="relative p-0">
        <div className="bg-muted relative flex aspect-square items-center justify-center overflow-hidden">
          <div className="bg-primary/20 h-32 w-32 rounded-full" />
          {product.badge && (
            <Badge className="bg-primary absolute top-4 right-4">{product.badge}</Badge>
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
        <div className="mb-2 flex items-center justify-end gap-2">
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <span>({product.reviews})</span>
            <span>{product.rating}</span>
          </div>
          <Star className="fill-primary text-primary h-4 w-4" />
        </div>
        <div className="mb-2 flex items-center justify-end gap-2">
          {product.originalPrice && (
            <span className="text-muted-foreground text-sm line-through">
              {product.originalPrice}
            </span>
          )}
          <span className="text-primary text-xl font-bold">{product.price}</span>
        </div>
        {!product.inStock && (
          <Badge variant="secondary" className="mt-2">
            غير متوفر حالياً
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" disabled={!product.inStock}>
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="ml-2 h-4 w-4" />
            {product.inStock ? "أضف للسلة" : "عرض المنتج"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
