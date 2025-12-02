import LinkButton from "../shared/link-button";

const categories = [
  { name: "عطور رجالية", href: "/products?category=men" },
  { name: "عطور نسائية", href: "/products?category=women" },
  { name: "عطور للجنسين", href: "/products?category=unisex" },
  { name: "عطور فاخرة", href: "/products?category=luxury" },
  { name: "عطور شرقية", href: "/products?category=oriental" },
  { name: "عطور منعشة", href: "/products?category=fresh" },
];
function CategoryBar() {
  return (
    <nav className="bg-muted/30 w-full border-t">
      <div className="container mx-auto px-4">
        <div className="scrollbar-hide flex items-center justify-center gap-6 overflow-x-auto py-3">
          {categories.map((category) => (
            <LinkButton
              key={category.name}
              href={category.href}
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
