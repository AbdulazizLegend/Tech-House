import { createSlice } from "@reduxjs/toolkit";
import { logEvent } from "../static/productStore";

const LS_WISHES = "techhouse_wishes_v2";

/* 🔥 localStorage dan o‘qib olish */
const savedWishes = JSON.parse(localStorage.getItem(LS_WISHES)) || JSON.parse(localStorage.getItem("wishes")) || [];

const wishesSlice = createSlice({
  name: "wishes",
  initialState: {
    value: savedWishes,
  },
  reducers: {
    toggleWish(state, action) {
      const product = action.payload;
      const exist = state.value.find(p => p.id === product.id);

      if (exist) {
       
        state.value = state.value.filter(p => p.id !== product.id);
        try { logEvent("like_remove", { productId: product.id, title: product.title }); } catch {}
      } else {
       
        state.value.push(product);
        try { logEvent("like_add", { productId: product.id, title: product.title }); } catch {}
      }

     
      localStorage.setItem(LS_WISHES, JSON.stringify(state.value));
      localStorage.setItem("wishes", JSON.stringify(state.value));
    },

    clearWishes(state) {
      state.value = [];
      localStorage.removeItem(LS_WISHES);
      localStorage.removeItem("wishes");
    }
  }
});

export const { toggleWish, clearWishes } = wishesSlice.actions;
export default wishesSlice.reducer;
