// Tech House: Products + Categories store (LocalStorage)
// Admin panel writes here, Front reads here.

import SEED_PRODUCTS from "./index";

export const LS_PRODUCTS = "techhouse_products_v2";
export const LS_CATEGORIES = "techhouse_categories_v2";
export const LS_EVENTS = "techhouse_events_v2";
export const LS_VISITOR = "techhouse_visitor_v1";

function safeParse(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function getVisitorId() {
  const existing = localStorage.getItem(LS_VISITOR);
  if (existing) return existing;
  const id = `u-${Math.random().toString(16).slice(2, 10)}-${Date.now().toString(16)}`;
  localStorage.setItem(LS_VISITOR, id);
  return id;
}

export function logEvent(type, payload) {
  const events = loadEvents();
  events.unshift({
    id: `e-${Math.random().toString(16).slice(2)}-${Date.now().toString(16)}`,
    type,
    userId: getVisitorId(),
    at: new Date().toISOString(),
    ...payload,
  });
  localStorage.setItem(LS_EVENTS, JSON.stringify(events.slice(0, 2000)));
}

export function loadEvents() {
  const raw = localStorage.getItem(LS_EVENTS);
  if (!raw) return [];
  return safeParse(raw, []);
}

function normalizeProduct(p) {
  const id = String(p.id);
  const url = p.url || (Array.isArray(p.images) ? p.images[0] : "");
  const images = Array.isArray(p.images) && p.images.length ? p.images : (url ? [url] : []);
  return {
    id,
    title: p.title || p.name || "",
    price: Number(p.price || 0),
    parentCategory: p.parentCategory || p.parent || "",
    category: p.category || "",
    brand: p.brand || "",
    stock: Number(p.stock ?? p.count ?? 0),
    description: p.description || p.sharh || "",
    images,
    url: url || images[0] || "",
    createdAt: p.createdAt || new Date().toISOString(),
  };
}

export function seedIfNeeded() {
  if (!localStorage.getItem(LS_PRODUCTS)) {
    const seeded = (SEED_PRODUCTS || []).map((p) => {
      const n = normalizeProduct(p);
      // eski data uchun slider ishlashi: kamida 3 ta rasm ko‘rinsin
      if (n.images.length === 1) n.images = [n.images[0], n.images[0], n.images[0]];
      if (n.images.length === 2) n.images = [n.images[0], n.images[1], n.images[0]];
      n.url = n.images[0];
      return n;
    });
    localStorage.setItem(LS_PRODUCTS, JSON.stringify(seeded));
  }

  if (!localStorage.getItem(LS_CATEGORIES)) {
    // Seed parent + child categories from products
    const parents = new Map();
    const childs = [];
    const products = loadProducts();
    products.forEach((p) => {
      const parent = p.parentCategory?.trim();
      const child = p.category?.trim();
      if (parent) {
        if (!parents.has(parent)) {
          parents.set(parent, { id: `par-${parents.size + 1}`, name: parent });
        }
        if (child) {
          const parentId = parents.get(parent).id;
          const exists = childs.some((c) => c.parentId === parentId && c.name === child);
          if (!exists) childs.push({ id: `cat-${childs.length + 1}`, parentId, name: child });
        }
      }
    });
    localStorage.setItem(
      LS_CATEGORIES,
      JSON.stringify({ parents: Array.from(parents.values()), children: childs })
    );
  }
}

export function loadProducts() {
  seedIfNeeded();
  const raw = localStorage.getItem(LS_PRODUCTS);
  const arr = safeParse(raw || "[]", []);
  return arr.map(normalizeProduct);
}

export function saveProducts(products) {
  localStorage.setItem(
    LS_PRODUCTS,
    JSON.stringify((products || []).map(normalizeProduct))
  );
}

export function getNextProductId(products) {
  const list = products || loadProducts();
  let max = 0;
  list.forEach((p) => {
    const m = String(p.id).match(/(\d+)/g);
    if (!m) return;
    const last = Number(m[m.length - 1]);
    if (Number.isFinite(last)) max = Math.max(max, last);
  });
  return `p${max + 1}`;
}

export function loadCategories() {
  seedIfNeeded();
  const raw = localStorage.getItem(LS_CATEGORIES);
  const obj = safeParse(raw || "{}", { parents: [], children: [] });
  return {
    parents: Array.isArray(obj.parents) ? obj.parents : [],
    children: Array.isArray(obj.children) ? obj.children : [],
  };
}

export function saveCategories(next) {
  localStorage.setItem(LS_CATEGORIES, JSON.stringify(next));
}
