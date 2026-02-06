import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";


import Home from "./Routes/Home/Home";
import Delishes from "./Routes/Delishes/Delishes";
import Cart from "./Routes/Cart/Cart";
import Sigin from "./Routes/Auth/Sigin/Sigin";
import Login from "./Routes/Auth/Login/Login";
import CategoryPage from "./Routes/CategoryPage/CategoryPage.jsx";
import SinglePage from "./Routes/SinglePage/SinglePage.jsx";

import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Catalog from "./Routes/Catalog/Catalog.jsx";
import Checkout from "./Routes/Checkout/Checkout.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Admin from "./Routes/Admin/Admin.jsx";
import Snowfall from "react-snowfall";

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="App">

      {!isAdmin && (
        <Snowfall
          snowflakeCount={80}
          speed={[0.5, 2]}
          radius={[1, 3]}
          color="#f5752f"
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        />
      )}
      {!isAdmin && <Header />}
      {!isAdmin && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/auth/sigin" element={<Sigin />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delishes" element={<Delishes />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<SinglePage />} />
        <Route path="/category/:parent" element={<CategoryPage />} />
        <Route path="/category/:parent/:category" element={<CategoryPage />} />
      </Routes>

      {!isAdmin && <Footer />}
      {!isAdmin && <BottomNav />}
    </div>
  );
}

export default App;
