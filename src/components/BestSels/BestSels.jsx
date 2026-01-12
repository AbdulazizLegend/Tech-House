import PRODUCTS from "../../static";
import "./BestSels.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef } from "react";
import ProductCard from "../Products/ProductCard.jsx";

function BestSels() {
  const scrollRef = useRef(null);

  const scroll = (value) => {
    scrollRef.current?.scrollBy({
      left: value,
      behavior: "smooth",
    });
  };

  return (
    <section className="best-wrapper">
      <div className="container">
        <div className="best">

          <div className="best-head">
            <h2 className="section-title">
              Ko‘p sotilgan <IoIosArrowForward />
            </h2>

            <div className="arrows">
              <button className="arrow-btn" onClick={() => scroll(-260)}>
                <IoIosArrowBack />
              </button>
              <button className="arrow-btn" onClick={() => scroll(260)}>
                <IoIosArrowForward />
              </button>
            </div>
          </div>

          <div className="products-scroll" ref={scrollRef}>
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default BestSels;
