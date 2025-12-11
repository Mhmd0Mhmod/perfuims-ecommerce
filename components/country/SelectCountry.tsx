"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCountries } from "@/hooks/use-countries";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

function SelectCountry() {
  const { data: countries, isFetching } = useCountries();
  const { selectedCountry, setSelectedCountryById } = useSelectedCountry();
  if (isFetching) {
    return (
      <div className="flex items-center justify-end gap-4">
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Select
        defaultValue={selectedCountry?.id.toString()}
        onValueChange={(value) => {
          setSelectedCountryById(Number(value));
        }}
      >
        <SelectTrigger id="country-select">
          <SelectValue placeholder="🌐" />
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
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
