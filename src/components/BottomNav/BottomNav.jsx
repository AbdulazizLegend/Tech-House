import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { LuUser } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";
import { GoHeart } from "react-icons/go";
import { useSelector } from "react-redux";

import "./BottomNav.css";

function BottomNav() {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="bn-item">
        <GrHomeRounded />
        <span>Bosh sahifa</span>
      </NavLink>

      <NavLink to="/catalog" className="bn-item">
        <BiCategory />
        <span>Katalog</span>
      </NavLink>

      <NavLink to="/delishes" className="bn-item">
        <GoHeart />
        <span>Sevimlilar</span>
      </NavLink>

      {/* 🛒 CART WITH BADGE */}
      <NavLink to="/cart" className="bn-item bn-cart">
        <div className="cart-icon-wrapper">
          <BsCart3 />

          {totalQuantity > 0 && (
            <span className="cart-badge">{totalQuantity}</span>
          )}
        </div>
        <span>Savat</span>
      </NavLink>

      <NavLink to="/auth/login" className="bn-item">
        <LuUser />
        <span>Kabinet</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
