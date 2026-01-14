import { createSlice } from "@reduxjs/toolkit";

/* 🔥 localStorage dan o‘qib olish */
const savedWishes = JSON.parse(localStorage.getItem("wishes")) || [];

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
      } else {
       
        state.value.push(product);
      }

     
      localStorage.setItem("wishes", JSON.stringify(state.value));
    },

    clearWishes(state) {
      state.value = [];
      localStorage.removeItem("wishes");
    }
  }
});

export const { toggleWish, clearWishes } = wishesSlice.actions;
export default wishesSlice.reducer;
