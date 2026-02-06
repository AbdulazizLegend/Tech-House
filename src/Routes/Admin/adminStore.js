import { loadProducts, saveProducts, getNextProductId, loadCategories, saveCategories } from "../../static/productStore";

const LS_AUTH = "techhouse_admin_auth_v1";
const LS_CREDS = "techhouse_admin_creds_v1";

// Default admin credentials (user request)
// username: Admin1234
// password: 1234
const defaultCreds = { username: "Admin1234", password: "1234" };

export function getCreds() {
  try {
    return JSON.parse(localStorage.getItem(LS_CREDS)) || defaultCreds;
  } catch {
    return defaultCreds;
  }
}

export function setCreds(next) {
  localStorage.setItem(LS_CREDS, JSON.stringify(next));
}

export function getAuth() {
  try {
    return JSON.parse(localStorage.getItem(LS_AUTH)) || { isAuthed: false, username: "" };
  } catch {
    return { isAuthed: false, username: "" };
  }
}

export function setAuth(payload) {
  localStorage.setItem(LS_AUTH, JSON.stringify(payload));
}

export function clearAuth() {
  localStorage.removeItem(LS_AUTH);
}

export function verify(username, password) {
  const c = getCreds();
  return username === c.username && password === c.password;
}

export function dispatchProductsChange() {
  window.dispatchEvent(new Event("techhouse:products"));
}

export const api = {
  loadProducts,
  saveProducts,
  getNextProductId,
  loadCategories,
  saveCategories,
};
