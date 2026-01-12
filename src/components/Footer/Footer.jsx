import "./Footer.css";
import { FaTruck, FaHeadset, FaLock, FaUndo } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      
      {/* TOP INFO */}
      <div className="footer-top container">
        
        <div className="info-card">
          <FaTruck />
          <div>
            <h4>Bepul yetkazib berish</h4>
            <p>400$ dan yuqori buyurtmalar uchun</p>
          </div>
        </div>

        <div className="info-card">
          <FaHeadset />
          <div>
            <h4>24/7 Qo‘llab-quvvatlash</h4>
            <p>Telefon va email orqali</p>
          </div>
        </div>

        <div className="info-card">
          <FaLock />
          <div>
            <h4>Xavfsiz to‘lov</h4>
            <p>Barcha kartalar qabul qilinadi</p>
          </div>
        </div>

        <div className="info-card">
          <FaUndo />
          <div>
            <h4>Pul qaytarish kafolati</h4>
            <p>30 kun ichida</p>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="container footer-content">

          <div className="footer-logo">
            <h2>Tech House</h2>
            <div className="socials">
              <FaYoutube />
              <FaFacebookF />
              <FaInstagram />
            </div>
          </div>

          <ul className="footer-links">
            <li>Bosh sahifa</li>
            <li>Kategoriyalar</li>
            <li>Yangiliklar</li>
            <li>Aloqa</li>
          </ul>

        </div>

        <div className="footer-bottom">
          <p>
            Maxfiylik siyosati | Foydalanish shartlari | 
            © 2024 Barcha huquqlar himoyalangan
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
