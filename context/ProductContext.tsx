"use client";
import { Product, ProductVariant } from "@/types/product";
import { createContext, useContext, useState } from "react";

const ProductContext = createContext<{
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant) => void;
  offer: ProductVariant["offerResponseDTO"];
  countryCode: string;
} | null>(null);

function ProductProvider({ product, children }: { product: Product; children: React.ReactNode }) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.at(0) || null,
  );
  const offer = selectedVariant?.offerResponseDTO || null;
  const countryCode = product.countryCode;
  return (
    <ProductContext.Provider value={{ selectedVariant, setSelectedVariant, offer, countryCode }}>
      {children}
    </ProductContext.Provider>
  );
}
function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductContextProvider");
  }

  return context;
}
export { ProductProvider, useProductContext };
