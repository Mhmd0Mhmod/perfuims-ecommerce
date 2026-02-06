"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, Dispatch, useContext, useReducer } from "react";

export type ProductsState = {
  searchTerm: string;
  categoryIds: string[];
  offerIds: string[];
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

function productsReducer(state: ProductsState, action: ProductsAction): ProductsState {
  switch (action.type) {
    case productsActions.SET_SEARCH:
      return { ...state, searchTerm: action.payload };
    case productsActions.SET_CATEGORIES:
      return { ...state, categoryIds: action.payload };
    case productsActions.SET_DEALS:
      return { ...state, offerIds: action.payload };
    case productsActions.SET_PRICE_RANGE:
      return { ...state, ...action.payload };
    case productsActions.RESET_FILTERS:
      return initialState;
    default:
      return state;
  }
}

type ProductsContextType = {
  filters: ProductsState;
  dispatch: Dispatch<ProductsAction>;
  resetFilters: () => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const initialState: ProductsState = {
  searchTerm: "",
  categoryIds: [],
  offerIds: [],
};
export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const {
    q: searchTerm,
    category: categoryIds,
    offer: offerIds,
  } = Object.fromEntries(searchParams.entries());

  const [state, dispatch] = useReducer(productsReducer, {
    ...initialState,
    searchTerm: (searchTerm as string) || "",
    categoryIds: categoryIds ? (categoryIds as string).split(",") : [],
    offerIds: offerIds ? (offerIds as string).split(",") : [],
  });
  const resetFilters = () => {
    dispatch({ type: productsActions.RESET_FILTERS });
    router.push(pathName, {
      scroll: false,
    });
  };

  return (
    <ProductsContext.Provider value={{ filters: state, dispatch, resetFilters }}>
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
