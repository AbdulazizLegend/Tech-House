import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { IoFlashOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { GrHomeRounded } from "react-icons/gr";
import { GoHeart } from "react-icons/go";

import "./BottomNav.css";

function BottomNav() {
    return (
        <nav className="bottom-nav">
            <NavLink to="/" className="bn-item">
                <GrHomeRounded />
                <span>Bosh sahifa</span>
            </NavLink>
            <NavLink to="/" className="bn-item">
                <BiCategory />
                <span>Katalog</span>
            </NavLink>
            <NavLink to="/delishes" className="bn-item">
                <GoHeart />
                <span>Sevimlilar</span>
            </NavLink>
            <NavLink to="/cart" className="bn-item">
                <BsCart3 />
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
