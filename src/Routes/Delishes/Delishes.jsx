import { useSelector } from "react-redux";
import ProductCard from "../../components/Products/ProductCard";

function Delishes() {
  const wishes = useSelector(state => state.wishes.value);

  return (
    <div className="container">
      <h2>❤️ Sevimli mahsulotlar</h2>

      {wishes.length === 0 ? (
        <p>Hozircha sevimlilar yo‘q</p>
      ) : (
        <div className="products-grid">
          {wishes.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Delishes;
