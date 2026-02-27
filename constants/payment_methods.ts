export const PAYMENT_METHODS = [
  {
    id: 1,
    name: "VISA",
    displayName: "دفع بالفيزا",
  },
  {
    id: 2,
    name: "CASH_ON_DELIVERY",
    displayName: "دفع عند الاستلام",
  },
];

export const PAYMENT_METHODS_ENUM = {
  VISA: 1,
  CASH_ON_DELIVERY: 2,
} as const;
