"use client";

import { useProducts } from "@/hooks/use-products";
import { Product } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { createContext, useContext, useReducer, Dispatch } from "react";

export type ProductsState = {
  searchTerm: string;
  subcategoryIds: string[];
  categorieIds: string[];
  dealIds: string[];
  fromPrice?: number;
  toPrice?: number;
  page: number;
};

export const productsActions = {
  SET_SEARCH: "SET_SEARCH",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_DEALS: "SET_DEALS",
  SET_PRICE_RANGE: "SET_PRICE_RANGE",
  SET_PAGE: "SET_PAGE",
  SET_COUNTRY: "SET_COUNTRY",
  RESET_FILTERS: "RESET_FILTERS",
} as const;
type ProductsAction =
  | { type: typeof productsActions.SET_SEARCH; payload: string }
  | { type: typeof productsActions.SET_CATEGORIES; payload: string[] }
  | { type: typeof productsActions.SET_DEALS; payload: string[] }
  | {
      type: typeof productsActions.SET_PRICE_RANGE;
      payload: { fromPrice?: number; toPrice?: number };
    }
  | { type: typeof productsActions.SET_PAGE; payload: number }
  | { type: typeof productsActions.SET_COUNTRY; payload: string }
  | { type: typeof productsActions.RESET_FILTERS };

const initialState: ProductsState = {
  searchTerm: "",
  categorieIds: [],
  subcategoryIds: [],
  dealIds: [],
  fromPrice: undefined,
  toPrice: undefined,
  page: 0,
};

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case productsActions.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    case productsActions.SET_CATEGORIES:
      return { ...state, categorieIds: action.payload };
    case productsActions.SET_DEALS:
      return { ...state, dealIds: action.payload };
    case productsActions.SET_PRICE_RANGE:
      return { ...state, ...action.payload };
    case productsActions.SET_PAGE:
      return { ...state, page: action.payload };
    case productsActions.RESET_FILTERS:
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
  const searchParams = useSearchParams();

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
