interface Country {
  id: number;
  name: string;
  currency: string;
  code: string;
  contactNumber: string;
  flag: string;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  paymentMethods: PaymentMethod[];
}
interface PublicCountry {
  name: {
    common: string;
    official: string;
    nativeName: { [key: string]: { official: string; common: string } };
  };
  cca2: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  flag: string;
}
