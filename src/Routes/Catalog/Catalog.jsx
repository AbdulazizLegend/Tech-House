import { useState } from "react";
import PRODUCTS from "../../static";
import ProductCard from "../../components/Products/ProductCard";
import "./Catalog.css";

function Catalog() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [brand, setBrand] = useState("");

  const brands = ["Apple", "Samsung", "Xiaomi", "HP", "Lenovo"];

  const filtered = PRODUCTS.filter(p => {
    const priceOk =
      (!minPrice || p.price >= minPrice) &&
      (!maxPrice || p.price <= maxPrice);

    const brandOk =
      !brand || p.brand?.toLowerCase() === brand.toLowerCase();

    return priceOk && brandOk;
  });

  return (
    <div className="catalog">
      <div className="container catalog-layout">

        {/* FILTER SIDEBAR */}
        <aside className="Ccatalog-filter">
          <h3>Filtrlar</h3>

          <div className="Cfilter-box">
            <p>Narx</p>
            <input
              placeholder="dan"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
            />
            <input
              placeholder="gacha"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
            />
          </div>

          <div className="Cfilter-box">
            <p>Brend</p>
            <select value={brand} onChange={e => setBrand(e.target.value)}>
              <option value="">Hammasi</option>
              {brands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          <button
            className="Cclear-btn"
            onClick={() => {
              setMinPrice("");
              setMaxPrice("");
              setBrand("");
            }}
          >
            Tozalash
          </button>
        </aside>

        {/* PRODUCTS */}
        <main className="Ccatalog-content">
          <h2>Katalog</h2>

          <div className="catalog-grid">
            {filtered.length > 0 ? (
              filtered.map(p => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <p className="Cempty">Mahsulot topilmadi</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Catalog;
