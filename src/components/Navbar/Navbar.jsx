import "./Navbar.css";
import Logo from "../../assets/TechHouse.svg";
import Search from "../Search/Search.jsx";

import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cart = useSelector(state => state.cart.items);

  // jami mahsulot soni (quantity bo‘yicha)
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navinner">

          {/* LOGO */}
          <NavLink to="/" className="logo">
            <img src={Logo} alt="TechHouse" />
            <span>TechHouse</span>
          </NavLink>

          {/* KATALOG */}
          <div className="iconka">
            <NavLink to="/" className="icon-link">
              <BiCategory className="ikons" />
              <span>Katalog</span>
            </NavLink>
          </div>

          {/* SEARCH */}
          <Search />

          {/* ICONS */}
          <div className="icons">

            <NavLink to="/delishes" className="icon-link">
              <GoHeart className="ikons" />
              <span>Sevimlilar</span>
            </NavLink>

            {/* 🛒 CART WITH BADGE */}
            <NavLink to="/cart" className="icon-link cart-link">
              <div className="cart-icon-wrapper">
                <BsCart3 className="ikons" />

                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </div>
              <span>Savatcha</span>
            </NavLink>

            <NavLink to="/auth/sigin" className="icon-link">
              <LuUser className="ikons" />
              <span>Kirish</span>
            </NavLink>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
