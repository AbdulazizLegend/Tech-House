import "./Navbar.css";
import Logo from "../../assets/TechHouse.svg";
import Search from "../Search/Search.jsx";

import { GoHeart } from "react-icons/go";
import { LuUser } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function Navbar() {
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
            <NavLink
              to="/"
              className={({ isActive }) =>
                `icon-link ${isActive ? "active" : ""}`
              }
            >
              <BiCategory className="ikons" />
              <span>Katalog</span>
            </NavLink>
          </div>

          {/* SEARCH */}
          <Search />

          {/* ACTION ICONS */}
          <div className="icons">
            <NavLink
              to="/delishes"
              className={({ isActive }) =>
                `icon-link ${isActive ? "active" : ""}`
              }
            >
              <GoHeart className="ikons" />
              <span>Sevimlilar</span>
            </NavLink>

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `icon-link ${isActive ? "active" : ""}`
              }
            >
              <BsCart3 className="ikons" />
              <span>Savatcha</span>
            </NavLink>

            <NavLink
              to="/auth/sigin"
              className={({ isActive }) =>
                `icon-link ${isActive ? "active" : ""}`
              }
            >
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

 