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
  const { add } = useCartContext();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const { selectedCountry } = useSelectedCountry();
  const onAdd = useCallback(() => {
    add(selectedVariantId, 1);
  }, [add, selectedVariantId]);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <Select
        defaultValue={product.variants[0].id.toString()}
        onValueChange={(value) => setSelectedVariantId(Number(value))}
        value={selectedVariantId.toString()}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {product.variants.map((variant) => (
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
                  <span className="text-muted-foreground mr-1 text-[10px] line-through opacity-70">
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
      <Button className="w-full" onClick={onAdd}>
        <ShoppingCart className="ml-2 h-4 w-4" />
        أضف للسلة
      </Button>
    </div>
  );
}
export default AddToCartButton;
