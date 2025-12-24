"use client";
import ComboBox from "@/components/shared/combo-box";
import { Button } from "@/components/ui/button";
import { useAllCountries } from "@/hooks/use-all-countries";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

function CountriesCombox({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (name: string, code: string) => void;
}) {
  const { data: countries, isLoading: isCountriesLoading } = useAllCountries();
  return (
    <ComboBox>
      <ComboBox.Trigger>
        <Button
          variant="outline"
          role="combobox"
          disabled={isCountriesLoading || !countries?.length}
          className={cn("w-full justify-between", !value && "text-muted-foreground")}
        >
          {value ? value : "اختر الدولة..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboBox.Trigger>
      <ComboBox.Content>
        <ComboBox.Input placeholder="ابحث عن الدولة..." />
        <ComboBox.List emptyState="لم يتم العثور على دولة.">
          {countries?.map((country) => (
            <ComboBox.Item
              key={country.cca2}
              value={country.name.common}
              onSelect={() => onChange(country.name.common, country.cca2)}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === country.name.common ? "opacity-100" : "opacity-0",
                )}
              />
              <span>{country.flag}</span>
              <span>{country.name.common}</span>
            </ComboBox.Item>
          ))}
        </ComboBox.List>
      </ComboBox.Content>
    </ComboBox>
  );
}
export default CountriesCombox;
