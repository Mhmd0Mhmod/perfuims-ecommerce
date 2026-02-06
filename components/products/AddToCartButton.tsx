"use client";
import { useCartContext } from "@/context/CartContext";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import { useCallback, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function AddToCartButton({ product }: { product: Product }) {
  const { add, pending } = useCartContext();
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    product.variants.at(0)?.id || null,
  );
  const { selectedCountry } = useSelectedCountry();
  const onAdd = useCallback(() => {
    if (selectedVariantId !== null) {
      add(selectedVariantId, 1);
    }
  }, [add, selectedVariantId]);

  const isNotAvailable = !product.variants || product.variants.length === 0;

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {!isNotAvailable && (
        <Select
          defaultValue={product?.variants.at(0)?.id.toString()}
          onValueChange={(value) => setSelectedVariantId(Number(value))}
          value={selectedVariantId?.toString()}
        >
          <SelectTrigger className="w-full" disabled={isNotAvailable}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {product.variants?.map((variant) => (
              <SelectItem key={variant.id} value={variant.id.toString()}>
                <div className="flex w-full items-center justify-between gap-2">
                  <span>
                    {variant.size} {variant.unit}
                  </span>
                </div>
                <Badge variant="secondary">
                  {selectedCountry &&
                    formatCurrency({
                      amount: variant.newPrice,
                      code: selectedCountry,
                    })}
                  {variant.oldPrice && variant.oldPrice > variant.newPrice && (
                    <span className="text-muted-foreground mr-1 line-through opacity-70">
                      {selectedCountry &&
                        formatCurrency({
                          amount: variant.oldPrice,
                          code: selectedCountry,
                        })}
                    </span>
                  )}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
      <Button className="w-full" onClick={onAdd} disabled={pending || isNotAvailable}>
        <ShoppingCart className="ml-2 h-4 w-4" />
        {isNotAvailable ? "غير متوفر" : pending ? "جارٍ الإضافة..." : "أضف إلى السلة"}
      </Button>
    </div>
  );
}
export default AddToCartButton;
