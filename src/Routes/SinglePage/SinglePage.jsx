import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseCart } from "../../redux/cartSlice";
import { toggleWish } from "../../redux/wishesSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";

import PRODUCTS from "../../static";
import ProductCard from "../../components/Products/ProductCard";
import ProductSlider from "../../components/Container/ProductSlider";
import "./SinglePage.css";

function SinglePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart.items);
  const wishes = useSelector(state => state.wishes.value);

  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return <div className="container">Mahsulot topilmadi</div>;
  }

  const cartItem = cart.find(p => p.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const liked = wishes.some(p => p.id === product.id);

  const related = PRODUCTS.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  // 🔥 MUHIM JOY
  // Agar product.images bo‘lsa → array
  // bo‘lmasa → bitta product.url dan array qilamiz
  const images = product.images?.length
    ? product.images
    : [product.url];

  return (
    <div className="singleWrapper">

      <div className="container ">
        <div className="single-page">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <Link to="/">Bosh sahifa</Link>
          <IoIosArrowForward />
          <span>{product.parentCategory}</span>
          <IoIosArrowForward />
          <span>{product.category}</span>
        </div>

        {/* MAIN */}
        <div className="single-wrapper">

          {/* IMAGE */}
          <div className="single-img">
            {/* 👉 RASMLAR SLIDER GA YUBORILDI */}
            <ProductSlider images={images} />
          </div>

          {/* INFO */}
          <div className="single-info">
            <div className="row">
              <h1>{product.title}</h1>

              <button
                className={`single-like ${liked ? "active" : ""}`}
                onClick={() => dispatch(toggleWish(product))}
              >
                {liked ? <GoHeartFill /> : <GoHeart />}
              </button>
            </div>

            <p className="desc">
              Mahsulot original, sifatli va kafolat bilan taqdim etiladi.
            </p>

            <div className="meta">
              <span className="starss">⭐⭐⭐⭐⭐</span>
              <span className="orders">• 120+ buyurtma</span>
            </div>

            <ul className="features">
              <li>✔ Original mahsulot</li>
              <li>✔ 12 oy kafolat</li>
              <li>✔ Yetkazib berish 1–2 kun</li>
            </ul>

            <del className="old-price">
              {(product.price * 1.2).toLocaleString()} so‘m
            </del>

            <div className="price">
              {product.price.toLocaleString()} so‘m
            </div>

            {/* CART */}
            {quantity === 0 ? (
              <div className="container_button">
                <button
                  className="buy-btn"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Savatchaga qo‘shish
                </button>
                <button className="buy-btn now" onClick={handleBuyNow}>
                  Hoziroq xarid qilish
                </button>
              </div>
            ) : (
              <div className="cart-counter">
                <button onClick={() => dispatch(decreaseCart(product.id))}>
                  −
                </button>

                <span>{quantity}</span>

                <button onClick={() => dispatch(addToCart(product))}>
                  +
                </button>

                <Link to="/cart" className="buy-now-link">
                  Rasmiylashtirishga o‘tish
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="related">
            <h3>O‘xshash mahsulotlar</h3>
            <br />
            <div className="related-grid">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />

              ))}
            </div>
          </div>
        )}

      </div>
      </div>
  

    </div>
  );
}

export default SinglePage;
