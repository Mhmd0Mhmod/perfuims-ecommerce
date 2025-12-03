import { getCountries } from "@/app/admin/countries/helpers";
import { use } from "react";

function useCountries() {
  const countries = use(getCountries());
  return countries;
}
export { useCountries };
