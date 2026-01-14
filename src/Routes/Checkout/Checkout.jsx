import { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
    card: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("Buyurtma qabul qilindi ✅");
  };

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-card">
          <h2>Buyurtmani rasmiylashtirish</h2>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="rowess">
              <input name="name" placeholder="Ism" onChange={handleChange} required />
              <input name="surname" placeholder="Familiya" onChange={handleChange} required />
            </div>

            <input name="phone" placeholder="Telefon raqam" onChange={handleChange} required />
            <input name="address" placeholder="Yetkazib berish manzili" onChange={handleChange} required />
            <input name="card" placeholder="Karta raqami (8600 xxxx xxxx xxxx)" onChange={handleChange} required />

            <button type="submit">Buyurtmani yuborish</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
