import { ProductAPI } from "@/lib/api/product";
import ProductCard from "../products/ProductCard";
import EmptyCountry from "../shared/empty-country";
import EmptyProducts from "../shared/empty-products";
async function ProductsGrid({ countryCode, limit = 4 }: { countryCode?: string; limit?: number }) {
  if (!countryCode) {
    return <EmptyCountry />;
  }
  const products = await ProductAPI.getProductsServer({}, countryCode);
  if (products?.content?.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products?.content?.slice(0, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
export default ProductsGrid;
