import { useSelector } from "react-redux";
import ProductCard from "../../components/Products/ProductCard";
import "./Delishes.css"

function Delishes() {
  const wishes = useSelector(state => state.wishes.value);

  return (
    <div className="sevimlilar">
      <div className="container">

        <h2>❤️ Sevimli mahsulotlararingiz</h2>

        {wishes.length === 0 ? (
          <p>Hozircha sevimlilar yo‘q</p>
        ) : (
          <div className="products-grid home-products">
            {wishes.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Delishes;
