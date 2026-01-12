import { useParams } from "react-router-dom";
import PRODUCTS from "../../static";
import ProductCard from "../../components/Products/ProductCard.jsx";
import "./CategoryPage.css";

function CategoryPage() {
  const { parent, category } = useParams();

  const filtered = PRODUCTS.filter((p) => {
    if (parent && category) {
      return (
        p.parentCategory?.toLowerCase() === parent.toLowerCase() &&
        p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (parent) {
      return (
        p.parentCategory?.toLowerCase() === parent.toLowerCase() ||
        p.category?.toLowerCase() === parent.toLowerCase()
      );
    }

    return false;
  });

  return (
    <div className="category-page">
      <div className="container">
        <h2 className="category-page__title">
          {parent}
          {category && ` / ${category}`}
        </h2>

        <div className="category-page__grid">
          {filtered.length > 0 ? (
            filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))
          ) : (
            <p className="category-page__empty">
              Bu turkumda mahsulot yo‘q
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
