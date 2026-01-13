import BestSels from "../../components/BestSels/BestSels";
import Discount from "../../components/Discount/Discount";
import Slider from "../../components/Slider/Slider";
import ProductCard from "../../components/Products/ProductCard.jsx";

import PRODUCTS from "../../static";
import "./Home.css";

function Home() {
  return (
    <div  className="main_home">
      <Slider />

      {/* 1-qator mahsulotlar */}
      <div className="container home-products">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <BestSels />

      {/* 2-qator mahsulotlar */}
      <div className="container home-products">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Discount />
    </div>
  );
}

export default Home;
