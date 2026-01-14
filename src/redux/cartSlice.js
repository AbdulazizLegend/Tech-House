import { createSlice } from "@reduxjs/toolkit";

 
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart, 
  },
  reducers: {
     
    addToCart(state, action) {
      const item = action.payload;

      const exist = state.items.find(p => p.id === item.id);

      if (exist) {
        exist.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

     
    decreaseCart(state, action) {
      const item = state.items.find(p => p.id === action.payload);

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter(p => p.id !== action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

 
    removeFromCart(state, action) {
      state.items = state.items.filter(
        p => p.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
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
