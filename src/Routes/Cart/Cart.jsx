import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/cartSlice";
import "./Cart.css";

function Cart() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container">
      <h2 className="cart-title">🛒 Savatcha</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Savatcha hozircha bo‘sh</p>
      ) : (
        <>
          <div className="cart-list">
            {cart.map(p => (
              <div className="cart-item" key={p.id}>
                <div className="cart-img">
                  <img src={p.url} alt={p.title} />
                </div>

                <div className="cart-info">
                  <p className="cart-name">{p.title}</p>
                  <strong className="cart-price">
                    {p.price.toLocaleString()} so‘m
                  </strong>
                  <span className="cart-qty">
                    Soni: {p.quantity}
                  </span>
                </div>

                <button
                  className="cart-remove"
                  onClick={() => dispatch(removeFromCart(p.id))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="cart-summary">
            <div>
              <span>Jami mahsulot:</span>
              <strong>{totalQuantity} dona</strong>
            </div>
            <div>
              <span>Jami summa:</span>
              <strong>{totalPrice.toLocaleString()} so‘m</strong>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
