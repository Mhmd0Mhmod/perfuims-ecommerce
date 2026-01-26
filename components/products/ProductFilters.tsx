"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { productsActions, useProductsContext } from "@/context/ProductsContext";
import { Category } from "@/types/category";
import { Offer } from "@/types/offer";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

function ProductFilters({
  subCategories,
  offers,
}: {
  subCategories?: Category[];
  offers?: Offer[];
}) {
  const { dispatch, filters } = useProductsContext();
  const [searchTerm, setSearchTerm] = useState(filters.searchTerm);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.fromPrice ?? 0,
    filters.toPrice ?? 2000,
  ]);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: productsActions.SET_SEARCH,
        payload: searchTerm,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, dispatch]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange([value[0], value[1]]);
  };

  const handlePriceCommit = () => {
    dispatch({
      type: productsActions.SET_PRICE_RANGE,
      payload: { fromPrice: priceRange[0], toPrice: priceRange[1] },
    });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = filters.categorieIds;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];

    dispatch({
      type: productsActions.SET_CATEGORIES,
      payload: newCategories,
    });
  };

  const handleOfferToggle = (offerId: string) => {
    const currentOffers = filters.dealIds;
    const newOffers = currentOffers.includes(offerId)
      ? currentOffers.filter((id) => id !== offerId)
      : [...currentOffers, offerId];

    dispatch({
      type: productsActions.SET_DEALS,
      payload: newOffers,
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setPriceRange([0, 2000]);
    dispatch({ type: productsActions.RESET_FILTERS });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold">التصفية</h3>
          <SlidersHorizontal className="text-muted-foreground h-5 w-5" />
        </div>

        <Separator className="mb-6" />

        {/* Search */}
        <div className="mb-6">
          <Label className="mb-2 block text-right">بحث</Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="ابحث عن منتج..."
              className="pr-10"
              dir="rtl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">نطاق السعر</Label>
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            max={2000}
            step={50}
            className="mb-4"
          />
          <div className="text-muted-foreground flex items-center justify-between text-sm">
            <span>{priceRange[1]} </span>
            <span>{priceRange[0]} </span>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Categories */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">التصنيف</Label>
          <div className="space-y-3">
            {subCategories?.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={category.id.toString()}
                  checked={filters.categorieIds.includes(category.id.toString())}
                  onCheckedChange={() => handleCategoryToggle(category.id.toString())}
                />
                <Label htmlFor={category.id.toString()} className="cursor-pointer">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator className="mb-6" />

        {/* Offers */}
        <div className="mb-6">
          <Label className="mb-4 block text-right">العروض</Label>
          <div className="space-y-3">
            {offers?.map((offer) => (
              <div key={offer.id} className="flex items-center gap-2">
                <Checkbox
                  id={offer.id.toString()}
                  checked={filters.dealIds.includes(offer.id.toString())}
                  onCheckedChange={() => handleOfferToggle(offer.id.toString())}
                />
                <Label htmlFor={offer.id.toString()} className="cursor-pointer">
                  {offer.title}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Reset Button */}
        <Button variant="outline" className="w-full" onClick={handleReset}>
          إعادة تعيين الفلاتر
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductFilters;
