import { getAllCategories } from "@/app/(shop)/helper";
import LinkButton from "../shared/link-button";

async function CategoryBar() {
  const categories = await getAllCategories();

  return (
    <nav className="bg-muted/30 w-full border-t">
      <div className="container mx-auto px-4">
        <div className="scrollbar-hide flex items-center justify-center gap-6 overflow-x-auto py-3">
          {categories.content.map((category) => (
            <LinkButton
              key={category.name}
              href={`/products?category=${category.id}`}
              className="hover:text-primary whitespace-nowrap text-black"
            >
              {category.name}
            </LinkButton>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default CategoryBar;
