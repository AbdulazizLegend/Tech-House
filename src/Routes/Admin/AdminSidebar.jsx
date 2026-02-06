import React from "react";
import "./AdminSidebar.css";

const items = [
  { id: "stats", label: "Statistika" },
  { id: "products", label: "Barcha mahsulotlar" },
  { id: "add", label: "Mahsulot qo‘shish" },
  { id: "categories", label: "Kategoriyalar" },
  { id: "settings", label: "Sozlamalar" },
];

export default function AdminSidebar({ page, onChange }) {
  return (
    <aside className="admSide">
      <div className="admSide__top">
        <div className="admSide__logo">TH</div>
        <div>
          <div className="admSide__title">Tech House</div>
          <div className="admMuted admSide__sub">Admin Panel</div>
        </div>
      </div>

      <nav className="admSide__nav">
        {items.map((it) => (
          <button
            key={it.id}
            className={`admSide__btn ${page === it.id ? "active" : ""}`}
            onClick={() => onChange?.(it.id)}
          >
            {it.label}
          </button>
        ))}
      </nav>

      <div className="admMuted admSide__footer">v2 · LocalStorage</div>
    </aside>
  );
}
