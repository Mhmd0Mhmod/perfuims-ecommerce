export interface Category {
  id: number;
  name: string;
  description: string;
  countryId: number;
  countryName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  isAtHomePage: boolean;
  subcategories: SubCategory[];
}
export interface SubCategory {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
