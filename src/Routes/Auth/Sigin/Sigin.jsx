import { useState } from "react";
import { Link } from "react-router-dom";
import "./Sigin.css";

function Sigin() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirm: "",
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

    alert("Ro‘yxatdan muvaffaqiyatli o‘tildi");
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2 className="auth-title">Ro‘yxatdan o‘tish</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <button className="auth-btn" type="submit">
            Ro‘yxatdan o‘tish
          </button>
        </form>

        <p className="auth-footer">
          Akkount bormi? <Link to="/auth/login">Kirish</Link>
        </p>
      </div>
    </div>
  );
}

export default Sigin;
