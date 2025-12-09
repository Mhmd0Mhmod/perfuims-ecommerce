import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function WishlistButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center p-0 text-xs">
            3
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-64">
        {/* Wishlist content goes here */}
        <div className="p-4">
          <h2 className="mb-4 text-lg font-semibold">قائمة الرغبات</h2>
          <p>محتوى قائمة الرغبات سيظهر هنا.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default WishlistButton;
