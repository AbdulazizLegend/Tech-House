import React from "react";
import "./AdminTopbar.css";

const titles = {
  stats: "Statistika",
  products: "Barcha mahsulotlar",
  add: "Mahsulot qo‘shish",
  categories: "Kategoriyalar",
  settings: "Sozlamalar",
};

export default function AdminTopbar({ page, username, onLogout }) {
  return (
    <div className="admCard admTop">
      <div>
        <div className="admTop__title">{titles[page] || "Admin"}</div>
        <div className="admMuted admTop__sub">Xush kelibsiz, <b>{username}</b></div>
      </div>
      <button className="admBtn admBtnDanger" onClick={onLogout}>Chiqish</button>
    </div>
  );
}
