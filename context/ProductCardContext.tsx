"use client ";
import { Product, ProductVariant } from "@/types/product";
import { createContext, useContext, useState } from "react";

const ProductCardContext = createContext<{
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant) => void;
  offer: ProductVariant["offerResponseDTO"];
  countryCode: string;
} | null>(null);

function ProductCardProvider({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.at(0) || null,
  );
  const offer = selectedVariant?.offerResponseDTO || null;
  const countryCode = product.countryCode;
  return (
    <ProductCardContext.Provider
      value={{ selectedVariant, setSelectedVariant, offer, countryCode }}
    >
      {children}
    </ProductCardContext.Provider>
  );
}
function useProductCardContext() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error("useProductCardContext must be used within a ProductCardProvider");
  }

  return context;
}
export { ProductCardProvider, useProductCardContext };
