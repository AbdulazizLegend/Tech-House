import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login bosildi");
  };

  return (
    <div className="auth">
      <div className="auth-box">
        <h2 className="auth-title">Kirish</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email yoki telefon"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="auth-btn" type="submit">
            Kirish
          </button>
        </form>

        <p className="auth-footer">
          Akkount yo‘qmi? <Link to="/auth/sigin">Ro‘yxatdan o‘tish</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
