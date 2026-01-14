import { useParams } from "react-router-dom";
import { useState } from "react";
import PRODUCTS from "../../static";
import ProductCard from "../../components/Products/ProductCard";
import "./CategoryPage.css";

function CategoryPage() {
  const { parent } = useParams();

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const colors = ["qizil", "qora", "oq", "yashil", "ko‘k"];
  const brands = ["Samsung", "Xiaomi", "Infinix", "Tecno", "Apple"];

  const toggleColor = (c) => {
    setSelectedColors(prev =>
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const toggleBrand = (b) => {
    setSelectedBrands(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  const filtered = PRODUCTS.filter(p => {
    const matchCategory =
      p.parentCategory?.toLowerCase() === parent?.toLowerCase() ||
      p.category?.toLowerCase() === parent?.toLowerCase();

    const matchPrice =
      (!minPrice || p.price >= minPrice) &&
      (!maxPrice || p.price <= maxPrice);

    const matchColor =
      selectedColors.length === 0 || selectedColors.includes(p.color);

    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.includes(p.brand);

    return matchCategory && matchPrice && matchColor && matchBrand;
  });

  return (
    <div className="category-page">
      <div className="container ">
        <div className="category-layout">


          {/* FILTER */}
          <aside className="filters">
            <h3>Filterlar</h3>

            {/* PRICE */}
            <div className="filter-box">
              <p>Narx (so‘m)</p>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="dan"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="gacha"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* COLOR */}
            <div className="filter-box">
              <p>Rang</p>
              <div className="color-list">
                {colors.map(c => (
                  <div
                    key={c}
                    onClick={() => toggleColor(c)}
                    className={`color-item ${selectedColors.includes(c) ? "active" : ""}`}
                  >
                    <span className={`dod ${c}`}></span>
                    {c}
                  </div>
                ))}
              </div>
            </div>

            {/* BRAND */}
            <div className="filter-box">
              <p>Brend</p>
              <div className="brand-list">
                {brands.map(b => (
                  <label key={b}>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(b)}
                      onChange={() => toggleBrand(b)}
                    />
                    <p>

                      {b}
                    </p>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <div>
            <h2 className="category-title">{parent}</h2>

            <div className="category-grid">
              {filtered.length > 0 ? (
                filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))
              ) : (
                <p className="empty">Mos mahsulot topilmadi</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;


