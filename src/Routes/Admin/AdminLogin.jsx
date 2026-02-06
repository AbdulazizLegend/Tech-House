import React, { useState } from "react";
import "./AdminLogin.css";
import { setAuth, verify } from "./adminStore";

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("12345");
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setErr("");
    if (!verify(username.trim(), password)) {
      setErr("Login yoki parol noto‘g‘ri.");
      return;
    }
    const payload = { isAuthed: true, username: username.trim() };
    setAuth(payload);
    onSuccess?.(payload);
  };

  return (
    <div className="admLogin">
      <div className="admCard admLogin__card">
        <div className="admLogin__brand">
          <div className="admLogin__logo">TH</div>
          <div>
            <div className="admLogin__title">Tech House Admin</div>
            <div className="admMuted admLogin__sub">Boshqaruv paneliga kirish</div>
          </div>
        </div>

        <form onSubmit={submit} className="admLogin__form">
          <label className="admLogin__lbl">
            <span>Username</span>
            <input className="admInput" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="admLogin__lbl">
            <span>Password</span>
            <input className="admInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          {err && <div className="admLogin__err">{err}</div>}

          <button className="admBtn admBtnPrimary" type="submit">Kirish</button>

          <div className="admMuted admLogin__hint">Demo: <b>admin</b> / <b>12345</b></div>
        </form>
      </div>
    </div>
  );
}
