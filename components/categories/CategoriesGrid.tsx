import { CategoryAPI } from "@/lib/api/category";
import CategoryProducts from "./CategoryProducts";
interface CategoriesGridProps {
  countryCode?: string;
}
async function CategoriesGrid({ countryCode }: CategoriesGridProps) {
  const categories = await CategoryAPI.getAllCategoriesServer(countryCode);
  const filteredCategories = categories?.filter((category) => category.isAtHomePage);

  return (
    <div className="space-y-12">
      {filteredCategories?.map((category) => (
        <CategoryProducts key={category.id} category={category} countryCode={countryCode} />
      ))}
    </div>
  );
}

export default CategoriesGrid;
