import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import { CartItem } from "@/types/cart";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useCartContext } from "@/context/CartContext";

function CartListItem({ item }: { item: CartItem }) {
  const { selectedCountry } = useSelectedCountry();
  const { editMutation, removeMutation } = useCartContext();
  const [localQty, setLocalQty] = useState(item.quantity);

  const updateQuantity = async (newQty: number) => {
    editMutation.mutate({ productVariantId: item.id, quantity: newQty });
  };

  const handleIncrement = () => {
    const newQty = localQty + 1;
    setLocalQty(newQty);
    updateQuantity(newQty);
  };
  const handleDecrement = () => {
    if (localQty > 1) {
      const newQty = localQty - 1;
      setLocalQty(newQty);
      updateQuantity(newQty);
    }
  };
  const handleRemove = () => {
    removeMutation.mutate(item.id);
  };
  return (
    <Card className="border-border/50 p-0 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start gap-3 p-3">
        <div className="border-border/50 bg-muted/30 relative aspect-square h-16 w-16 min-w-16 overflow-hidden rounded-md border">
          <Image
            src={item.variantDetails.imageUrl || "/assets/logo.png"}
            alt={item.variantDetails.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 text-sm leading-tight font-semibold">
              {item.variantDetails.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 py-0 text-xs font-medium">
              {item.variantDetails.size} {item.variantDetails.unit}
            </Badge>
          </div>

          {/* Price Info */}
          <div className="flex flex-col gap-1">
            {/* Unit Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">سعر الوحدة:</span>
              {selectedCountry && (
                <span className="text-sm font-semibold">
                  {formatCurrency({
                    amount: item.variantDetails.newPrice,
                    code: selectedCountry,
                  })}
                </span>
              )}
              {item.variantDetails.oldPrice &&
                item.variantDetails.oldPrice > item.variantDetails.newPrice &&
                selectedCountry && (
                  <span className="text-muted-foreground text-xs line-through">
                    {formatCurrency({
                      amount: item.variantDetails.oldPrice,
                      code: selectedCountry,
                    })}
                  </span>
                )}
            </div>

            {/* Total Price */}
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-xs">الإجمالي:</span>
              {selectedCountry && (
                <span className="text-primary text-base font-bold">
                  {formatCurrency({
                    amount: item.variantDetails.newPrice * item.quantity,
                    code: selectedCountry,
                  })}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <ShoppingCart className="text-muted-foreground" size={14} />
              <span className="text-muted-foreground text-xs font-medium">الكمية:</span>
            </div>

            <div className="flex items-center gap-1">
              <div className="border-border bg-background flex items-center gap-0.5 rounded-md border">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleDecrement}
                  aria-label="decrement quantity"
                  disabled={localQty <= 1}
                  className="hover:bg-muted h-6 w-6 text-xs"
                >
                  -
                </Button>
                <input
                  type="number"
                  min={1}
                  value={localQty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    if (!isNaN(val) && val >= 1) {
                      setLocalQty(val);
                    } else if (e.target.value === "") {
                      setLocalQty(1);
                    }
                  }}
                  onBlur={() => {
                    const qty = Math.max(1, localQty);
                    setLocalQty(qty);
                    updateQuantity(qty);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                  className="w-8 min-w-[2ch] [appearance:textfield] border-none bg-transparent px-1.5 text-center text-xs font-semibold outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleIncrement}
                  aria-label="increment quantity"
                  className="hover:bg-muted h-6 w-6 text-xs"
                >
                  +
                </Button>
              </div>

              <Button
                size="icon-sm"
                variant="ghost"
                onClick={handleRemove}
                aria-label="remove item"
                className="text-destructive hover:text-destructive hover:bg-destructive/10 h-6 w-6"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartListItem;
