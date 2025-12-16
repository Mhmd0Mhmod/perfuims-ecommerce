import { useSelectedCountry } from "@/hooks/use-selected-country";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { useCartContext } from "@/context/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { CartItem } from "@/types/cart";

function CartListItem({ item }: { item: CartItem }) {
  const { selectedCountryEntry } = useSelectedCountry();
  const { edit, remove } = useCartContext();

  const updateQuantity = async (newQty: number) => {
    edit(item.id, newQty);
  };

  const handleIncrement = () => {
    updateQuantity(item.quantity + 1);
  };
  const handleDecrement = () => {
    if (item.quantity > 1) updateQuantity(item.quantity - 1);
  };
  const handleRemove = () => {
    remove(item.id);
  };
  return (
    <Card className="p-0" dir="rtl">
      <div className="flex items-center gap-4">
        <CardHeader className="flex w-24 min-w-20 flex-col items-center justify-center p-4">
          <div className="relative h-20 w-20">
            <Image
              src={item.variantDetails.imageUrl}
              alt={item.variantDetails.name}
              fill
              className="rounded object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col justify-between p-2">
          <CardTitle className="mb-1 text-base font-semibold">{item.variantDetails.name}</CardTitle>
          <div className="mb-2 flex items-center justify-between gap-2">
            {selectedCountryEntry && (
              <>
                <span className="text-primary text-lg font-bold">
                  {formatCurrency({
                    amount: item.variantDetails.newPrice,
                    currency: selectedCountryEntry?.currency,
                    code: selectedCountryEntry?.code,
                  })}
                </span>
                <del className="text-muted-foreground">
                  {item.variantDetails.oldPrice &&
                    formatCurrency({
                      amount: item.variantDetails.oldPrice,
                      currency: selectedCountryEntry?.currency,
                      code: selectedCountryEntry?.code,
                    })}
                </del>
              </>
            )}
            <Badge variant="outline">
              {item.variantDetails.size} {item.variantDetails.unit}
            </Badge>
          </div>
          <div className="mb-1 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <ShoppingCart className="text-muted-foreground" size={14} />
              <span className="text-muted-foreground text-sm">الكمية:</span>
            </div>
            <div className="flex items-center gap-0.5 text-sm">
              <Button
                variant="outline"
                size={"icon-sm"}
                onClick={handleDecrement}
                aria-label="decrement quantity"
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <span className="px-1 font-bold">{item.quantity}</span>
              <Button
                size={"icon-sm"}
                variant="outline"
                onClick={handleIncrement}
                aria-label="increment quantity"
              >
                +
              </Button>
              <Button
                size={"icon-sm"}
                variant="destructive"
                onClick={handleRemove}
                aria-label="remove item"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

export default CartListItem;
