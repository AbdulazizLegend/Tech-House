import React, { useState } from "react";
import { getCreds, setCreds } from "../adminStore";
import { LS_EVENTS } from "../../../static/productStore";

export default function SettingsPage() {
  const c = getCreds();
  const [username, setUsername] = useState(c.username);
  const [password, setPassword] = useState(c.password);
  const [ok, setOk] = useState("");

  const save = () => {
    setCreds({ username: username.trim(), password });
    setOk("Saqlangan.");
    setTimeout(() => setOk(""), 2000);
  };

  const clearLogs = () => {
    if (!confirm("Loglarni o‘chirasizmi?")) return;
    localStorage.removeItem(LS_EVENTS);
    setOk("Loglar tozalandi.");
    setTimeout(() => setOk(""), 2000);
  };

  return (
    <div className="admGrid2">
      <div className="admCard box">
        <div className="boxHead">
          <div className="boxTitle">Admin login (cred operations)</div>
          {ok && <div className="pill">{ok}</div>}
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="admMuted">Username</span>
            <input className="admInput" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label style={{ display: "grid", gap: 6 }}>
            <span className="admMuted">Password</span>
            <input className="admInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className="admBtn admBtnPrimary" onClick={save}>Saqlash</button>
          <div className="admMuted">Eslatma: bu LocalStorage’da saqlanadi.</div>
        </div>
      </div>

      <div className="admCard box">
        <div className="boxHead">
          <div className="boxTitle">Loglar</div>
          <div className="pill">Events</div>
        </div>
        <div style={{ display: "grid", gap: 10 }}>
          <div className="admMuted">Statistika loglari (like/cart) shu yerdan tozalanadi.</div>
          <button className="admBtn admBtnDanger" onClick={clearLogs}>Loglarni tozalash</button>
        </div>
      </div>
    </div>
  );
}
