import { useState } from "react";
import PRODUCTS from "../../static";
import ProductCard from "../../components/Products/ProductCard";
import "./Catalog.css";
import { IoIosArrowForward } from "react-icons/io";

function Catalog() {
  const [hoverParent, setHoverParent] = useState("");
  const [activeParent, setActiveParent] = useState("Barcha mahsulotlar");
  const [activeCategory, setActiveCategory] = useState("");

  const parents = [
    "Barcha mahsulotlar",
    ...new Set(PRODUCTS.map((p) => p.parentCategory)),
  ];

  const subMap = PRODUCTS.reduce((acc, p) => {
    if (!acc[p.parentCategory]) acc[p.parentCategory] = new Set();
    acc[p.parentCategory].add(p.category);
    return acc;
  }, {});

  const filtered = PRODUCTS.filter((p) => {
    if (activeParent !== "Barcha mahsulotlar" && activeCategory) {
      return p.parentCategory === activeParent && p.category === activeCategory;
    }

    if (activeParent !== "Barcha mahsulotlar") {
      return p.parentCategory === activeParent;
    }

    return true;
  });

  const currentParent = hoverParent || activeParent;

  return (
    <div className="main_catalog">
      <div className="container">
        <div className="catalog-page">
          {/* TOP KATALOG */}
          <div className="catalog-top">
            {/* SIDEBAR */}
            <div className="sidebar">
              {parents.map((parent) => (
                <div
                id="qator"
                  key={parent}
                  className={`parent ${activeParent === parent ? "active" : ""}`}
                  onMouseEnter={() => setHoverParent(parent)}
                  onMouseLeave={() => setHoverParent("")}
                  onClick={() => {
                    setActiveParent(parent);
                    setActiveCategory("");
                  }}
                >
                <p>
                   {parent}
                  </p> 
                  <IoIosArrowForward />
                </div>
              ))}
            </div>

            {/* MEGA MENU */}
            <div className="mega">
              {currentParent && currentParent !== "Barcha mahsulotlar" && (
                <>
                  <h3>{currentParent}</h3>

                  <div className="mega-grid">
                    {[...subMap[currentParent]]?.map((sub) => (
                      <p
                        key={sub}
                        className={activeCategory === sub ? "active-sub" : ""}
                        onClick={() => {
                          setActiveParent(currentParent);
                          setActiveCategory(sub);
                        }}
                      >
                        {sub}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MAHSULOTLAR */}
          <div className="home-products">
            {filtered.length ? (
              filtered.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              <p>Mahsulot topilmadi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
