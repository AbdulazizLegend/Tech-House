import { useState } from "react";
import "./Login.css";
import {Link} from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login bosildi");
  };

  return (
    <div className="login-page">
      <div className="container">

        <div className="login-card">
          <h2>Kirish</h2>

          <form onSubmit={handleSubmit}>
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

            <button type="submit">Kirish</button>
          </form>

          <p className="login-footer">
            Akkount yo‘qmi? <Link to="/auth/sigin">Ro‘yxatdan o‘tish</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
