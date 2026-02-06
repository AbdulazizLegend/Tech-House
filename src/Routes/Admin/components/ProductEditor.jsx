import React, { useEffect, useMemo, useState } from "react";
import "./ProductEditor.css";
import { api, dispatchProductsChange } from "../adminStore";

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export default function ProductEditor({ editing, onSaved, onCancel }) {
  const [savedOk, setSavedOk] = useState(false);
  const [uploadKey, setUploadKey] = useState(0);
  const [products, setProducts] = useState(() => api.loadProducts());
  const [cats, setCats] = useState(() => api.loadCategories());
  const isEdit = Boolean(editing?.id);

  useEffect(() => {
    try { setProducts(api.loadProducts()); } catch {}
    try { setCats(api.loadCategories()); } catch {}
  }, [editing?.id]);

  const nextId = useMemo(() => api.getNextProductId(products), [products]);

  const [mode, setMode] = useState("url"); // url | upload
  const [parentMode, setParentMode] = useState("select"); // select | create
  const [childMode, setChildMode] = useState("select");

  const firstParentId = cats.parents?.[0]?.id || "";
  const firstChildId = cats.children?.find((c) => c.parentId === firstParentId)?.id || "";

  const [form, setForm] = useState({
    id: nextId,
    title: "",
    brand: "",
    price: 0,
    description: "",
    parentId: firstParentId,
    parentName: "",
    childId: firstChildId,
    childName: "",
    images: ["", "", ""],
    stock: 0,
  });

  useEffect(() => {
    if (!isEdit) {
      setForm((s) => ({ ...s, id: nextId }));
    }
  }, [nextId, isEdit]);

  useEffect(() => {
    if (!isEdit) return;
    // Editing mapping
    const parent = cats.parents.find((p) => p.name === editing.parentCategory) || null;
    const child = cats.children.find((c) => c.name === editing.category && (!parent || c.parentId === parent.id)) || null;
    setForm({
      id: editing.id,
      title: editing.title || "",
      brand: editing.brand || "",
      price: Number(editing.price || 0),
      description: editing.description || "",
      parentId: parent?.id || "",
      parentName: editing.parentCategory || "",
      childId: child?.id || "",
      childName: editing.category || "",
      images: (editing.images?.length ? editing.images : [editing.url]).slice(0, 6).concat(["", "", ""]).slice(0, 3),
      stock: Number(editing.stock || 0),
    });
    setMode("url");
    setParentMode(parent ? "select" : "create");
    setChildMode(child ? "select" : "create");
  }, [isEdit, editing, cats]);

  const childrenForParent = useMemo(() => {
    return cats.children.filter((c) => c.parentId === form.parentId);
  }, [cats, form.parentId]);

  // Parent o'zgarsa: kategoriya (child) ni avtomatik tanlash (qo'shish ishlamay qolmasin)
  useEffect(() => {
    if (childMode !== "select") return;
    const list = cats.children.filter((c) => c.parentId === form.parentId);
    if (!list.length) {
      setForm((s) => ({ ...s, childId: "" }));
      return;
    }
    if (!list.some((c) => c.id === form.childId)) {
      setForm((s) => ({ ...s, childId: list[0].id }));
    }
  }, [form.parentId, cats, childMode]);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const canSave = useMemo(() => {
    if (!form.title.trim()) return false;
    if (!form.brand.trim()) return false;
    if (Number(form.price) <= 0) return false;
    if (Number(form.stock) < 0) return false;
    const imgs = (form.images || []).filter(Boolean);
    if (imgs.length < 3) return false;
    if (parentMode === "select" && !form.parentId) return false;
    if (parentMode === "create" && !form.parentName.trim()) return false;
    if (childMode === "select" && !form.childId) return false;
    if (childMode === "create" && !form.childName.trim()) return false;
    return true;
  }, [form, parentMode, childMode]);

  const ensureCategories = () => {
    const next = { ...cats, parents: [...cats.parents], children: [...cats.children] };

    let parentId = form.parentId;
    let parentName = "";
    if (parentMode === "create") {
      parentName = form.parentName.trim();
      const exists = next.parents.find((p) => p.name.toLowerCase() === parentName.toLowerCase());
      if (exists) parentId = exists.id;
      else {
        parentId = `par-${next.parents.length + 1}`;
        next.parents.push({ id: parentId, name: parentName });
      }
    } else {
      parentName = next.parents.find((p) => p.id === parentId)?.name || "";
    }

    let childId = form.childId;
    let childName = "";
    if (childMode === "create") {
      childName = form.childName.trim();
      const exists = next.children.find((c) => c.parentId === parentId && c.name.toLowerCase() === childName.toLowerCase());
      if (exists) childId = exists.id;
      else {
        childId = `cat-${next.children.length + 1}`;
        next.children.push({ id: childId, parentId, name: childName });
      }
    } else {
      childName = next.children.find((c) => c.id === childId)?.name || "";
    }

    api.saveCategories(next);
    setCats(next);
    return { parentId, parentName, childId, childName };
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!canSave) return;

    const { parentName, childName } = ensureCategories();
    const imgs = (form.images || []).filter(Boolean);

    const nextProduct = {
      id: String(form.id),
      title: form.title.trim(),
      brand: form.brand.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      description: form.description.trim(),
      parentCategory: parentName,
      category: childName,
      images: imgs,
      url: imgs[0],
      createdAt: editing?.createdAt || new Date().toISOString(),
    };

    const list = api.loadProducts();
    const idx = list.findIndex((p) => p.id === nextProduct.id);
    let nextList;
    if (idx >= 0) {
      nextList = [...list];
      nextList[idx] = nextProduct;
    } else {
      nextList = [nextProduct, ...list];
    }
    api.saveProducts(nextList);
    dispatchProductsChange();
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2000);

    if (!isEdit) {
      // clear inputs after successful add
      setForm({
        id: api.getNextProductId(nextList),
        title: "",
        brand: "",
        price: 0,
        stock: 0,
        description: "",
        parentId: cats.parents?.[0]?.id || "",
        parentName: "",
        childId: "",
        childName: "",
        images: ["", "", ""],
      });
      setMode("url");
      setParentMode("select");
      setChildMode("select");
      setUploadKey((k) => k + 1);
    }
    onSaved?.();
  };

  const setImageAt = (i, v) => {
    setForm((s) => {
      const imgs = [...(s.images || [])];
      imgs[i] = v;
      return { ...s, images: imgs };
    });
  };

  const pickFiles = async (files) => {
    const list = Array.from(files || []);
    const urls = [];
    for (const f of list) {
      // image only
      if (!f.type.startsWith("image/")) continue;
      const dataUrl = await readFileAsDataURL(f);
      urls.push(dataUrl);
    }
    setForm((s) => {
      const merged = [...(s.images || [])].filter(Boolean).concat(urls).slice(0, 6);
      const padded = merged.concat(["", "", ""]).slice(0, 3);
      return { ...s, images: padded };
    });
  };

  return (
    <div className="admCard pe">
      <div className="pe__head">
        <div>
          <div className="pe__title">{isEdit ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}</div>
          <div className="admMuted pe__sub">ID avtomatik: <b>{form.id}</b> · Rasm: kamida <b>3 ta</b></div>
        </div>
        {isEdit && <button className="admBtn" type="button" onClick={onCancel}>Bekor</button>}
      </div>

      <form onSubmit={submit} className="pe__form">
        <div className="admGrid2">
          <label className="pe__lbl">
            <span>Mahsulot nomi</span>
            <input className="admInput" value={form.title} onChange={(e) => set("title", e.target.value)} />
          </label>
          <label className="pe__lbl">
            <span>Brend</span>
            <input className="admInput" value={form.brand} onChange={(e) => set("brand", e.target.value)} />
          </label>
        </div>

        <div className="admGrid2">
          <label className="pe__lbl">
            <span>Narx (so‘m)</span>
            <input className="admInput" type="number" value={form.price} onChange={(e) => set("price", e.target.value)} />
          </label>
          <label className="pe__lbl">
            <span>Omborda nechta bor (stock)</span>
            <input className="admInput" type="number" value={form.stock} onChange={(e) => set("stock", e.target.value)} min={0} />
          </label>
          <label className="pe__lbl">
            <span>Izoh</span>
            <input className="admInput" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="(ixtiyoriy)" />
          </label>
        </div>

        <div className="admGrid2">
          <div className="pe__catBox">
            <div className="pe__catHead">
              <div className="pe__catTitle">Parent kategoriya</div>
              <div className="pe__tog">
                <button type="button" className={`pe__togBtn ${parentMode === "select" ? "active" : ""}`} onClick={() => setParentMode("select")}>Tanlash</button>
                <button type="button" className={`pe__togBtn ${parentMode === "create" ? "active" : ""}`} onClick={() => setParentMode("create")}>Yaratish</button>
              </div>
            </div>

            {parentMode === "select" ? (
              <select className="admSelect" value={form.parentId} onChange={(e) => set("parentId", e.target.value)}>
                {cats.parents.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            ) : (
              <input className="admInput" value={form.parentName} onChange={(e) => set("parentName", e.target.value)} placeholder="Masalan: Elektronika" />
            )}
          </div>

          <div className="pe__catBox">
            <div className="pe__catHead">
              <div className="pe__catTitle">Kategoriya</div>
              <div className="pe__tog">
                <button type="button" className={`pe__togBtn ${childMode === "select" ? "active" : ""}`} onClick={() => setChildMode("select")}>Tanlash</button>
                <button type="button" className={`pe__togBtn ${childMode === "create" ? "active" : ""}`} onClick={() => setChildMode("create")}>Yaratish</button>
              </div>
            </div>

            {childMode === "select" ? (
              <select className="admSelect" value={form.childId} onChange={(e) => set("childId", e.target.value)}>
                <option value="">Tanlang...</option>
                {childrenForParent.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            ) : (
              <input className="admInput" value={form.childName} onChange={(e) => set("childName", e.target.value)} placeholder="Masalan: Telefon" />
            )}
          </div>
        </div>

        <div className="pe__imgBox">
          <div className="pe__imgHead">
            <div>
              <div className="pe__catTitle">Rasmlar</div>
              <div className="admMuted pe__sub">URL yoki upload (kamida 3 ta)</div>
            </div>
            <div className="pe__tog">
              <button type="button" className={`pe__togBtn ${mode === "url" ? "active" : ""}`} onClick={() => setMode("url")}>URL</button>
              <button type="button" className={`pe__togBtn ${mode === "upload" ? "active" : ""}`} onClick={() => setMode("upload")}>Upload</button>
            </div>
          </div>

          {mode === "upload" && (
            <div className="pe__upload">
              <input
                className="admInput"
                type="file"
                accept="image/*"
                multiple
                key={uploadKey}
              onChange={(e) => pickFiles(e.target.files)}
              />
              <div className="admMuted pe__small">Bir martada 3+ rasm tanlang (jpg/png/webp).</div>
            </div>
          )}

          <div className="pe__imgGrid">
            {[0,1,2].map((i) => (
              <div className="pe__imgItem" key={i}>
                <div className="pe__imgNum">#{i+1}</div>
                {mode === "url" && (
                  <input
                    className="admInput"
                    placeholder="https://..."
                    value={form.images[i] || ""}
                    onChange={(e) => setImageAt(i, e.target.value)}
                  />
                )}
                <div className="pe__preview">
                  {form.images[i] ? <img src={form.images[i]} alt="" /> : <div className="admMuted">Preview</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pe__actions">
          <button className={`admBtn ${canSave ? "admBtnPrimary" : ""}`} disabled={!canSave}>
            {isEdit ? "Saqlash" : "Qo‘shish"}
          </button>
          {!canSave && <div className="admMuted pe__small">Majburiy: nom, brend, narx, parent+kategoriya, 3 ta rasm</div>}
        </div>
      </form>
    </div>
  );
}
