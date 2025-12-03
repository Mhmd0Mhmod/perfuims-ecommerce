import ComboBox from "@/components/shared/combo-box";
import { Button } from "@/components/ui/button";
import { useCountries } from "@/hooks/use-countries";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

function CurrencyCombobox({
  value,
  onChange,
}: {
  value: string | undefined;
  onChange: (value: string) => void;
}) {
  const form = useFormContext();
  const { data, isLoading: isCountriesLoading } = useCountries();
  const currencies = data?.flatMap((country) => Object.keys(country.currencies));
  const uniqueCurrencies = Array.from(new Set(currencies));
  const name = form.watch("name");
  useEffect(() => {
    if (name) {
      const country = data?.find((c) => c.name.common === name);
      console.log(country);

      if (country) {
        const countryCurrencies = Object.keys(country.currencies);
        if (countryCurrencies.length > 0) {
          onChange(countryCurrencies[0]);
        }
      }
    }
  }, [name, data, onChange]);

  return (
    <ComboBox>
      <ComboBox.Trigger>
        <Button
          variant="outline"
          role="combobox"
          disabled={isCountriesLoading || !uniqueCurrencies?.length}
          className={cn("w-full justify-between", !value && "text-muted-foreground")}
        >
          {value ? value : "اختر العملة..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboBox.Trigger>
      <ComboBox.Content>
        <ComboBox.Input placeholder="ابحث عن العملة..." />
        <ComboBox.List emptyState="لم يتم العثور على عملة.">
          {uniqueCurrencies?.map((currency) => (
            <ComboBox.Item key={currency} value={currency} onSelect={() => onChange(currency)}>
              {currency}
            </ComboBox.Item>
          ))}
        </ComboBox.List>
      </ComboBox.Content>
    </ComboBox>
  );
}
export default CurrencyCombobox;
