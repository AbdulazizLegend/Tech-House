import BestSels from "../../components/BestSels/BestSels";
import Discount from "../../components/Discount/Discount";
import Slider from "../../components/Slider/Slider";
import ProductCard from "../../components/Products/ProductCard.jsx";

import useProducts from "../../static/useProducts";
import "./Home.css";

function Home() {
  const PRODUCTS = useProducts();
  return (
    <div  className="main_home">
    <div  className="container
    ">
      <Slider />

      {/* 1-qator mahsulotlar */}
      <div className=" home-products">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <BestSels />

      {/* 2-qator mahsulotlar */}
      <div className=" home-products">
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Discount />
    </div>
    </div>
  );
}

export default Home;
