import React, { useMemo, useState } from "react";
import "./CategoriesPage.css";
import { api } from "../adminStore";

export default function CategoriesPage() {
  const [refresh, setRefresh] = useState(0);
  const cats = useMemo(() => {
    try { return api.loadCategories(); } catch { return { parents: [], children: [] }; }
  }, [refresh]);

  const [parent, setParent] = useState("...");
  const [child, setChild] = useState("...");

  const addParent = () => {
    const name = parent.trim();
    if (!name) return;
    const next = {
      parents: [...cats.parents],
      children: [...cats.children],
    };
    const exists = next.parents.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (!exists) next.parents.push({ id: `par-${next.parents.length + 1}`, name });
    api.saveCategories(next);
    setParent("");
    setRefresh((x) => x + 1);
  };

  const addChild = () => {
    const [pName, cName] = child.split("|").map((s) => s.trim());
    if (!pName || !cName) return;
    const next = {
      parents: [...cats.parents],
      children: [...cats.children],
    };
    let par = next.parents.find((p) => p.name.toLowerCase() === pName.toLowerCase());
    if (!par) {
      par = { id: `par-${next.parents.length + 1}`, name: pName };
      next.parents.push(par);
    }
    const exists = next.children.find((c) => c.parentId === par.id && c.name.toLowerCase() === cName.toLowerCase());
    if (!exists) next.children.push({ id: `cat-${next.children.length + 1}`, parentId: par.id, name: cName });
    api.saveCategories(next);
    setChild("");
    setRefresh((x) => x + 1);
  };

  const delParent = (id) => {
    if (!confirm("Parent kategoriyani o‘chirasizmi? (ichidagi sub-kategoriyalar ham o‘chadi)")) return;
    const next = {
      parents: cats.parents.filter((p) => p.id !== id),
      children: cats.children.filter((c) => c.parentId !== id),
    };
    api.saveCategories(next);
    setRefresh((x) => x + 1);
  };

  const delChild = (id) => {
    if (!confirm("Kategoriyani o‘chirasizmi?")) return;
    const next = {
      parents: [...cats.parents],
      children: cats.children.filter((c) => c.id !== id),
    };
    api.saveCategories(next);
    setRefresh((x) => x + 1);
  };

  return (
    <div className="admCats">
      <div className="admCard box">
        <div className="boxHead">
          <div className="boxTitle">Kategoriya qo‘shish</div>
          <div className="admMuted">Parent | Child</div>
        </div>

        <div className="admGrid2">
          <div className="catForm">
            <div className="admMuted">Parent kategoriya (masalan: Elektronika)</div>
            <div className="row2">
              <input className="admInput" value={parent} onChange={(e) => setParent(e.target.value)} placeholder="Elektronika" />
              <button className="admBtn admBtnPrimary" onClick={addParent}>Qo‘shish</button>
            </div>
          </div>
          <div className="catForm">
            <div className="admMuted">Parent | Kategoriya (masalan: Elektronika | Telefon)</div>
            <div className="row2">
              <input className="admInput" value={child} onChange={(e) => setChild(e.target.value)} placeholder="Elektronika | Telefon" />
              <button className="admBtn admBtnPrimary" onClick={addChild}>Qo‘shish</button>
            </div>
          </div>
        </div>
      </div>

      <div className="admGrid2">
        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Parent kategoriyalar</div>
            <div className="pill">{cats.parents.length}</div>
          </div>
          <div className="list">
            {cats.parents.map((p) => (
              <div className="row" key={p.id}>
                <div className="title">{p.name}</div>
                <button className="admBtn admBtnDanger" onClick={() => delParent(p.id)}>Delete</button>
              </div>
            ))}
            {!cats.parents.length && <div className="admMuted empty">Yo‘q</div>}
          </div>
        </div>

        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Kategoriyalar</div>
            <div className="pill">{cats.children.length}</div>
          </div>
          <div className="list">
            {cats.children.slice(0, 200).map((c) => {
              const p = cats.parents.find((x) => x.id === c.parentId);
              return (
                <div className="row" key={c.id}>
                  <div className="title">{p?.name || "?"} / {c.name}</div>
                  <button className="admBtn admBtnDanger" onClick={() => delChild(c.id)}>Delete</button>
                </div>
              );
            })}
            {!cats.children.length && <div className="admMuted empty">Yo‘q</div>}
          </div>
        </div>
      </div>
    
    </div>
  );
}
