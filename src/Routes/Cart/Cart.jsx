import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, decreaseCart, clearCart } from "../../redux/cartSlice";
import "./Cart.css";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import { useState } from "react";
import CartItemSlider from "./CartItemSlider";

function Cart() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const totalQuantity = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <>
      <div id="uhh" className={`cart ${showModal ? "blur" : ""}`}>
        <div className="container">
          <h2 className="page-title">Savatingiz ({totalQuantity})</h2>

       
          {cart.length === 0 ? (
            <div className="empty">🛒 Savatcha bo‘sh</div>
          ) : (
            <div className="cart-grid">
              {/* LEFT */}
              <div className="cart-items">
                {cart.map(item => (
                  <div className="item" key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <CartItemSlider item={item} />
                    </Link>

                    <div className="info">
                      <h4>{item.title}</h4>
                      <span>{item.price.toLocaleString()} so‘m</span>
                    </div>
                    <div className="rows">

                      <div className="qty">
                        <button onClick={() => dispatch(decreaseCart(item.id))}>-</button>
                        <b>{item.quantity}</b>
                        <button onClick={() => dispatch(addToCart(item))}>+</button>
                      </div>

                      <div className="qty trashes">
                        <button
                          className="trash-btn"
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <GoTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT (faqat savat bo‘lsa chiqadi) */}
              <div className="summary">
                <h3>Buyurtma</h3>

                <div className="row">
                  <span>Mahsulotlar:</span>
                  <b>{totalQuantity} dona</b>
                </div>

                <div className="row">
                  <span>Jami:</span>
                  <b>{totalPrice.toLocaleString()} so‘m</b>
                </div>

                <button
                  className="checkout danger"
                  onClick={() => setShowModal(true)}
                >
                  Xamma mahsulotlarni o‘chirish
                </button>

                <br /><br />
                <Link to="/checkout">
                <button className="checkout">Rasmiylashtirish</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ogohlantirish ⚠️</h3>
            <p>Hamma mahsulotlarni o‘chirmoqchimisiz?</p>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Bekor qilish</button>

              <button
                className="danger"
                onClick={() => {
                  dispatch(clearCart());
                  setShowModal(false);
                }}
              >
                Ha, o‘chirish
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
