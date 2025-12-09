"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductsContext } from "@/context/ProductsContext";
import Image from "next/image";

function SelectCountry({ countries = [] }: { countries: { country: Country; flagUrl: string }[] }) {
  const { filters, dispatch } = useProductsContext();

  const handleCountryChange = (countryId: string) => {
    dispatch({ type: "SET_COUNTRY", payload: countryId });
  };

  const activeCountries = countries.filter((country) => country.country.isActive);

  if (activeCountries.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Label htmlFor="country-select" className="block text-right">
        اختر الدولة
      </Label>
      <Select value={filters.countryId} onValueChange={handleCountryChange}>
        <SelectTrigger id="country-select">
          <SelectValue placeholder="اختر الدولة للعرض" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.country.id} value={country.country.id.toString()}>
              <div className="flex items-center gap-2">
                <Image
                  src={country.flagUrl}
                  alt={`${country.country.name} flag`}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover"
                />
                <span>{country.country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCountry;
