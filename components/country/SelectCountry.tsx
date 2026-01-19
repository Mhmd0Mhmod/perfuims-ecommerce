"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { PublicCountry } from "@/types/country";
import { useCallback } from "react";

function SelectCountry({
  countries,
  selectedCountryCode,
}: {
  countries: PublicCountry[];
  selectedCountryCode?: string;
}) {
  const { setSelectedCountry, selectedCountry } = useSelectedCountry();
  const onCountryChange = useCallback(
    (code: string) => {
      setSelectedCountry(code);
    },
    [setSelectedCountry],
  );

  return (
    <div className="flex items-center justify-end gap-4">
      <Select value={selectedCountry || selectedCountryCode || ""} onValueChange={onCountryChange}>
        <SelectTrigger>
          <SelectValue placeholder="🌐" />
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country.cca2} value={country.cca2}>
              <div className="flex items-center gap-2">
                <span>{country.flag}</span>
                <span>{country.name.common}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCountry;
