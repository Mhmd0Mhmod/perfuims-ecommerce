"use client";

import { useProducts } from "@/hooks/use-products";
import { Product } from "@/types/product";
import { createContext, useContext, useReducer, Dispatch } from "react";

export type ProductsState = {
  searchTerm: string;
  categorieIds: string[];
  dealIds: string[];
  fromPrice?: number;
  toPrice?: number;
  page: number;
};

type ProductsAction =
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_DEALS"; payload: string[] }
  | { type: "SET_PRICE_RANGE"; payload: { fromPrice?: number; toPrice?: number } }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "RESET_FILTERS" };

const initialState: ProductsState = {
  searchTerm: "",
  categorieIds: [],
  dealIds: [],
  fromPrice: undefined,
  toPrice: undefined,
  page: 0,
};

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, searchTerm: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categorieIds: action.payload };
    case "SET_DEALS":
      return { ...state, dealIds: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, ...action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "RESET_FILTERS":
      return initialState;
    default:
      return state;
  }
}

type ProductsContextType = {
  filters: ProductsState;
  dispatch: Dispatch<ProductsAction>;
  products: Pagination<Product>;
  isFetching: boolean;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const { data: products, isFetching } = useProducts({
    searchTerm: state.searchTerm,
    categorieIds: state.categorieIds,
    dealIds: state.dealIds,
    fromPrice: state.fromPrice,
    toPrice: state.toPrice,
    page: state.page,
  });

  return (
    <ProductsContext.Provider value={{ filters: state, dispatch, products, isFetching }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProductsContext must be used within a ProductsProvider");
  }
  return context;
}
