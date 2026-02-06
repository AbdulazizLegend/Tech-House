import React, { useMemo, useState } from "react";
import "./ProductsPage.css";
import ProductEditor from "../components/ProductEditor";
import { api, dispatchProductsChange } from "../adminStore";

export default function ProductsPage() {
  const [refresh, setRefresh] = useState(0);
  const [editing, setEditing] = useState(null);
  const fileRef = React.useRef(null);
  const products = useMemo(() => {
    try { return api.loadProducts(); } catch { return []; }
  }, [refresh]);

  const del = (id) => {
    if (!confirm("Mahsulotni o‘chirasizmi?")) return;
    const next = products.filter((p) => p.id !== id);
    api.saveProducts(next);
    dispatchProductsChange();
    setEditing(null);
    setRefresh((x) => x + 1);
  };

  
  const exportJSON = async () => {
    const data = JSON.stringify(products, null, 2);

    // clipboard (optional)
    try {
      await navigator.clipboard.writeText(data);
    } catch {}

    // download file
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const importJSON = async (file) => {
    if (!file) return;
    try {
      const text = await file.text();
      const arr = JSON.parse(text);
      if (!Array.isArray(arr)) throw new Error("JSON array emas");
      // normalize minimal fields
      const cleaned = arr
        .filter((p) => p && (p.id || p.title || p.name))
        .map((p) => ({
          ...p,
          id: String(p.id || ""),
          title: p.title || p.name || "",
          price: Number(p.price || 0),
          images: Array.isArray(p.images) ? p.images : (p.url ? [p.url] : []),
          url: p.url || (Array.isArray(p.images) ? p.images[0] : ""),
        }));
      api.saveProducts(cleaned);
      dispatchProductsChange();
      setEditing(null);
      setRefresh((x) => x + 1);
      alert("✅ Import bo‘ldi. Mahsulotlar yangilandi.");
    } catch (e) {
      alert("❌ JSON import xato: " + (e?.message || ""));
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };


  return (
    <div className="admProducts">
      {editing && (
        <ProductEditor
          editing={editing}
          onCancel={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            setRefresh((x) => x + 1);
          }}
        />
      )}

      <div className="admCard box">
        <div className="boxHead">
          <div className="boxTitle">Katalog ({products.length})</div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button className="admBtn" onClick={() => fileRef.current?.click()}>Import JSON</button>
            <button className="admBtn" onClick={exportJSON}>Export JSON</button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={(e) => importJSON(e.target.files?.[0])}
            />
          </div>
          <div className="admMuted">Edit/Delete (CRUD)</div>
        </div>

        <div className="tableWrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Rasm</th>
                <th>ID</th>
                <th>Nomi</th>
                <th>Kategoriya</th>
                <th>Narx</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="pimg">
                      <img src={p.images?.[0] || p.url} alt="" />
                    </div>
                  </td>
                  <td className="mono">{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.parentCategory} / {p.category}</td>
                  <td>{Number(p.price).toLocaleString()} so‘m</td>
                  <td className="actions">
                    <button className="admBtn" onClick={() => setEditing(p)}>Edit</button>
                    <button className="admBtn admBtnDanger" onClick={() => del(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
              {!products.length && (
                <tr><td colSpan="6" className="admMuted empty">Mahsulot yo‘q</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
