import { Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />

      <Routes> 
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/auth/sigin" element={<Sigin />} />
        <Route path="/auth/login" element={<Login />} />

        {/* CART & WISHES */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/delishes" element={<Delishes />} />

        {/* PRODUCT */}
        <Route path="/product/:id" element={<SinglePage />} />

        {/* CATEGORY (SEARCH + MENU) */}
        <Route path="/category/:parent" element={<CategoryPage />} />
        <Route path="/category/:parent/:category" element={<CategoryPage />} />
      </Routes>

      <Footer />
      <BottomNav />
    </div>
  );
}

export default App;
