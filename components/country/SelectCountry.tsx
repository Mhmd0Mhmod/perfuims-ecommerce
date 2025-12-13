"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelectedCountry } from "@/hooks/use-selected-country";
import Image from "next/image";

function SelectCountry({ countries }: { countries: Country[] }) {
  const { selectedCountry, setSelectedCountry } = useSelectedCountry();

  return (
    <div className="flex items-center justify-end gap-4">
      <Select
        defaultValue={selectedCountry || ""}
        onValueChange={(value) => {
          setSelectedCountry(value);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="🌐" />
        </SelectTrigger>
        <SelectContent>
          {countries?.map((country) => (
            <SelectItem key={country.id} value={country.code}>
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
