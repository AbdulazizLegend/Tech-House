import { Link } from "react-router-dom";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { toggleWish } from "../../redux/wishesSlice";
import { addToCart, decreaseCart } from "../../redux/cartSlice";
import { useMemo, useRef, useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  // ❤️ wishlist
  const wishes = useSelector((state) => state.wishes.value);
  const liked = wishes.some((p) => p.id === product.id);

  // 🛒 cart
  const cart = useSelector((state) => state.cart.items);
  const cartItem = cart.find((p) => p.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWish(product));
  };

  // 🖼️ images (card swipe)
  const images = useMemo(() => {
    const arr = Array.isArray(product.images) && product.images.length ? product.images : [];
    const url = product.url || arr[0];
    const base = arr.length ? arr : (url ? [url] : []);
    return base.slice(0, 6);
  }, [product]);

  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);
  const blockedClick = useRef(false);

  const clampIdx = (n) => {
    if (!images.length) return 0;
    if (n < 0) return 0;
    if (n > images.length - 1) return images.length - 1;
    return n;
  };

  const onTouchStart = (e) => {
    if (images.length <= 1) return;
    dragging.current = true;
    blockedClick.current = false;
    startX.current = e.touches?.[0]?.clientX || 0;
    deltaX.current = 0;
  };

  const onTouchMove = (e) => {
    if (!dragging.current || images.length <= 1) return;
    const x = e.touches?.[0]?.clientX || 0;
    deltaX.current = x - startX.current;
    if (Math.abs(deltaX.current) > 6) {
      blockedClick.current = true;
      // link bosilib ketmasligi uchun
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onTouchEnd = (e) => {
    if (!dragging.current || images.length <= 1) return;
    dragging.current = false;

    const dx = deltaX.current;
    const threshold = 40;

    if (Math.abs(dx) >= threshold) {
      if (dx < 0) setIdx((v) => clampIdx(v + 1));
      else setIdx((v) => clampIdx(v - 1));
    }

    deltaX.current = 0;
    if (blockedClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // 🖱️ mouse / pointer swipe (desktop)
  const onPointerDown = (e) => {
    if (images.length <= 1) return;
    // faqat chap tugma
    if (e.button !== undefined && e.button !== 0) return;
    dragging.current = true;
    blockedClick.current = false;
    startX.current = e.clientX || 0;
    deltaX.current = 0;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };

  const onPointerMove = (e) => {
    if (!dragging.current || images.length <= 1) return;
    const x = e.clientX || 0;
    deltaX.current = x - startX.current;
    if (Math.abs(deltaX.current) > 6) {
      blockedClick.current = true;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onPointerUp = (e) => {
    if (!dragging.current || images.length <= 1) return;
    dragging.current = false;
    const dx = deltaX.current;
    const threshold = 40;
    if (Math.abs(dx) >= threshold) {
      if (dx < 0) setIdx((v) => clampIdx(v + 1));
      else setIdx((v) => clampIdx(v - 1));
    }
    deltaX.current = 0;
    if (blockedClick.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onImgClick = (e) => {
    // swipe bo‘lganda single page ga kirmasin
    if (blockedClick.current) {
      e.preventDefault();
      e.stopPropagation();
      blockedClick.current = false;
    }
  };

  const goTo = (e, n) => {
    e.preventDefault();
    e.stopPropagation();
    setIdx(clampIdx(n));
  };

  return (
    <Link to={`/product/${product.id}`} className="product_card">
      {/* ❤️ LIKE */}
      <button className={`product-card__like ${liked ? "active" : ""}`} onClick={toggleLike}>
        {liked ? <GoHeartFill /> : <GoHeart />}
      </button>

      {/* IMAGE (Swipe) */}
      <div
        className="product-card__img"
        onClick={onImgClick}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerLeave={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="pc-slider"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {(images.length ? images : [product.url]).map((src, i) => (
            <div className="pc-slide" key={i}>
              <img src={src} alt={product.title} draggable={false} />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <div className="pc-dots" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            {images.map((_, i) => (
              <button
                key={i}
                className={`pc-dot ${i === idx ? "active" : ""}`}
                onClick={(e) => goTo(e, i)}
                aria-label={`Rasm ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* INFO */}
      <div className="product-card__info">
        <div className="product-card__bottom">
          <strong className="product-card__price">{product.price.toLocaleString()} so‘m</strong>
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
            <button className="cart-btn minus" onClick={() => dispatch(decreaseCart(product.id))}>
              −
            </button>

            <span className="cart-count">{quantity}</span>

            <button className="cart-btn plus" onClick={() => dispatch(addToCart(product))}>
              +
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export default ProductCard;
