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
  const { selectedCountryEntry } = useSelectedCountry();
  const onAdd = useCallback(() => {
    add(selectedVariantId, 1);
  }, [add, selectedVariantId]);

  return (
    <div className="flex items-center gap-4">
      <Button className="flex-1" onClick={onAdd}>
        <ShoppingCart className="ml-2 h-4 w-4" />
        أضف للسلة
      </Button>
      <Select
        defaultValue={product.variants[0].id.toString()}
        onValueChange={(value) => setSelectedVariantId(Number(value))}
        value={selectedVariantId.toString()}
      >
        <SelectTrigger>
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
                {selectedCountryEntry &&
                  formatCurrency({
                    amount: variant.newPrice,
                    currency: selectedCountryEntry.currency,
                    code: selectedCountryEntry.code,
                  })}
              </Badge>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
export default AddToCartButton;
