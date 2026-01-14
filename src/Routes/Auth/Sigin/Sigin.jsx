import { useState } from "react";
import "./Sigin.css";

function Sigin() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirm: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirm) {
      alert("Parollar mos emas");
      return;
    }

    alert("Ro‘yxatdan o‘tildi");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Ro‘yxatdan o‘tish</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ism"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Telefon raqam"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Parol"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirm"
            placeholder="Parolni tasdiqlang"
            value={form.confirm}
            onChange={handleChange}
          />

          <button type="submit">Ro‘yxatdan o‘tish</button>
        </form>

        <p className="login-footer">
          Akkount bormi? <span>Kirish</span>
        </p>
      </div>
    </div>
  );
}

export default Sigin;
