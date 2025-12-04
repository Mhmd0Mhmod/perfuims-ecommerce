"use client";
import ComboBox from "@/components/shared/combo-box";
import { Button } from "@/components/ui/button";
import { useCountries } from "@/hooks/use-countries";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

function CountriesCombox({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const { data, isLoading: isCountriesLoading } = useCountries();
  const countries = data?.map((country) => ({
    name: country.name.common,
    currency: Object.keys(country.currencies)[0],
    flag: country.flags.svg,
  }));

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
              key={country.name}
              value={country.name}
              onSelect={() => onChange(country.name)}
            >
              <Check
                className={cn("mr-2 h-4 w-4", value === country.name ? "opacity-100" : "opacity-0")}
              />
              {country.name}
            </ComboBox.Item>
          ))}
        </ComboBox.List>
      </ComboBox.Content>
    </ComboBox>
  );
}
export default CountriesCombox;
