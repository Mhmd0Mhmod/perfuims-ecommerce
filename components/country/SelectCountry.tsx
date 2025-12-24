"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import { useCallback, useEffect, useState } from "react";

function SelectCountry({
  countries,
  selectedCountryCode,
}: {
  countries: PublicCountry[];
  selectedCountryCode?: string;
}) {
  const { setSelectedCountry, selectedCountry } = useSelectedCountry();
  const [value, setValue] = useState<string>(selectedCountryCode || "");
  const onCountryChange = useCallback(
    (code: string) => {
      setSelectedCountry(code);
    },
    [setSelectedCountry],
  );

  useEffect(() => {
    setValue(selectedCountry || "");
  }, [selectedCountry]);

  return (
    <div className="flex items-center justify-end gap-4">
      <Select value={value} onValueChange={onCountryChange}>
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
