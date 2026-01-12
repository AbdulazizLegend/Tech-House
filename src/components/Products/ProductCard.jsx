import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWish } from "../../redux/wishesSlice";
import { addToCart, decreaseCart } from "../../redux/cartSlice";
import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // ❤️ wishlist
  const wishes = useSelector(state => state.wishes.value);
  const liked = wishes.some(p => p.id === product.id);

  // 🛒 cart
  const cart = useSelector(state => state.cart.items);
  const cartItem = cart.find(p => p.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWish(product));
  };

  return (
    <Link to={`/product/${product.id}`} className="product_card">

      {/* ❤️ LIKE */}
      <button
        className={`product-card__like ${liked ? "active" : ""}`}
        onClick={toggleLike}
      >
        {liked ? <GoHeartFill /> : <GoHeart />}
      </button>

      {/* IMAGE */}
      <div className="product-card__img">
        <img src={product.url} alt={product.title} />
      </div>

      {/* INFO */}
      <div className="product-card__info">

        <div className="product-card__bottom">
          <strong className="product-card__price">
            {product.price.toLocaleString()} so‘m
          </strong>
          <p className="stars">⭐⭐⭐⭐⭐</p>
        </div>

        <p className="product-card__title">{product.title}</p>

        {/* 🛒 CART */}
        {quantity === 0 ? (
          <button
            className="product-card__cart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              dispatch(addToCart(product));
            }}
          >
            Savatga qo‘shish
          </button>
        ) : (
          <div
            className="product-card__cart-wrap"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <button
              className="cart-btn minus"
              onClick={() => dispatch(decreaseCart(product.id))}
            >
              −
            </button>

            <span className="cart-count">{quantity}</span>

            <button
              className="cart-btn plus"
              onClick={() => dispatch(addToCart(product))}
            >
              +
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
