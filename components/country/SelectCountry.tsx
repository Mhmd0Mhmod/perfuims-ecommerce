"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountryContext } from "@/context/CountryProvider";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

function SelectCountry() {
  const { countries, setCountry, country, isFetching } = useCountryContext();
  const handleCountryChange = (countryId: string) => {
    const selectedCountry = countries.find((country) => country.id.toString() === countryId);
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  };

  const activeCountries = countries.filter((country) => country.isActive);
  if (isFetching) {
    return (
      <div className="flex items-center justify-end gap-4">
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    );
  }
  if (activeCountries.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Select value={country?.id.toString()} onValueChange={handleCountryChange}>
        <SelectTrigger id="country-select">
          <SelectValue placeholder="🌐" />
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.id} value={country.id.toString()}>
              <div className="flex items-center gap-2">
                <Image
                  src={country.flagUrl}
                  alt={`${country.name} flag`}
                  width={24}
                  height={16}
                  className="rounded-sm object-cover"
                />
                <span>{country.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCountry;
