"use client";
import { useCartContext } from "@/context/CartContext";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";

function AddToCartButton({ product }: { product: Product }) {
  const { add, pending } = useCartContext();
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    product.variants.find((v) => v.isAvailable)?.id || null,
  );
  const [quantity, setQuantity] = useState(1);
  const { selectedCountry } = useSelectedCountry();

  const onAdd = useCallback(() => {
    if (selectedVariantId !== null) {
      add(selectedVariantId, quantity);
      setQuantity(1);
    }
  }, [add, selectedVariantId, quantity]);

  const isNotAvailable = !product.variants || product.variants.length === 0;

  return (
    <div className="flex w-full flex-col gap-2.5">
      {/* Variant Chips */}
      {!isNotAvailable && (
        <div className="flex w-full flex-wrap gap-1.5">
          {product.variants?.map((variant) => {
            const isSelected = selectedVariantId === variant.id;
            const isDisabled = !variant.isAvailable;
            return (
              <button
                key={variant.id}
                onClick={() => !isDisabled && setSelectedVariantId(variant.id)}
                disabled={isDisabled}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                  "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border hover:border-primary/50 hover:bg-muted text-foreground",
                  isDisabled &&
                    "border-muted! text-muted-foreground/40! cursor-not-allowed line-through opacity-40",
                )}
              >
                <span>
                  {variant.size} {variant.unit}
                </span>
                <span
                  className={cn(
                    "text-xs opacity-75",
                    isSelected ? "text-primary-foreground/80" : "text-muted-foreground",
                  )}
                >
                  {selectedCountry &&
                    formatCurrency({
                      amount: variant.newPrice,
                      code: selectedCountry,
                    })}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex w-full items-center gap-1.5">
        {/* Quantity Selector */}
        <div className="border-input flex items-center overflow-hidden rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || pending || isNotAvailable}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1) setQuantity(val);
              if (e.target.value === "") setQuantity(1);
            }}
            onBlur={() => setQuantity((q) => Math.max(1, q))}
            className="h-8 w-9 [appearance:textfield] border-none bg-transparent text-center text-sm font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            disabled={pending || isNotAvailable}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none"
            onClick={() => setQuantity((q) => q + 1)}
            disabled={pending || isNotAvailable}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="flex-1"
          onClick={onAdd}
          disabled={pending || isNotAvailable || !selectedVariantId}
        >
          <ShoppingCart className="ml-1.5 h-3.5 w-3.5" />
          {isNotAvailable ? "غير متوفر" : pending ? "جارٍ الإضافة..." : "أضف إلى السلة"}
        </Button>
      </div>
    </div>
  );
}
export default AddToCartButton;
