export interface Category {
  id: number;
  name: string;
  description: string;
  countryName: string;
  parentId: number | null;
  parentName: string | null;
  isActive: boolean;
  isAtHomePage: boolean;
  productIds: number[];
  createdAt: string;
  updatedAt: string;
  children: Category[];
}
