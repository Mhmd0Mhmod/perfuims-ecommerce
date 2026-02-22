import { CategoryAPI } from "@/lib/api/category";
import CategoryProducts from "./CategoryProducts";

async function CategoriesGrid() {
  const categories = await CategoryAPI.getAllCategoriesServer();
  const filteredCategories = categories.filter((category) => category.isAtHomePage);
  return (
    <div className="space-y-12">
      {filteredCategories?.map((category) => (
        <CategoryProducts key={category.id} category={category} />
      ))}
    </div>
  );
}

export default CategoriesGrid;
