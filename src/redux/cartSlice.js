import { createSlice } from "@reduxjs/toolkit";
import { logEvent } from "../static/productStore";

const LS_CART = "techhouse_cart_v2";

 
const savedCart = JSON.parse(localStorage.getItem(LS_CART)) || JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, 
  },
  reducers: {
     
    addToCart(state, action) {
      const item = action.payload;

      // slider uchun images ni saqlab qo'yamiz (eski mahsulotlarda faqat url bo'lishi mumkin)
      const safeImages = Array.isArray(item?.images) && item.images.length
        ? item.images
        : (item?.url ? [item.url, item.url, item.url] : []);

      const exist = state.items.find(p => p.id === item.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...item, images: safeImages, quantity: 1 });
      }

      try { logEvent("cart_add", { productId: item.id, title: item.title }); } catch {}
      localStorage.setItem(LS_CART, JSON.stringify(state.items));
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

     
    decreaseCart(state, action) {
      const item = state.items.find(p => p.id === action.payload);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(p => p.id !== action.payload);
      }

      try { logEvent("cart_dec", { productId: action.payload }); } catch {}
      localStorage.setItem(LS_CART, JSON.stringify(state.items));
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

 
    removeFromCart(state, action) {
      state.items = state.items.filter(
        p => p.id !== action.payload
      );

      try { logEvent("cart_remove", { productId: action.payload }); } catch {}
      localStorage.setItem(LS_CART, JSON.stringify(state.items));
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      try { logEvent("cart_clear", {}); } catch {}
      localStorage.removeItem(LS_CART);
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
