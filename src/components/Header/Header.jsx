import './Header.css'
import { IoIosArrowDown } from "react-icons/io";
function Header() {
  return (
    <header>
      <div className="container">
        <div className="header">
          <span>Tanlangan mahsulotlarga 50% chegirma oling</span>

          <div className="header__info">
            <p>UZB <IoIosArrowDown /></p>
            <p>Joylashuv <IoIosArrowDown /></p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
