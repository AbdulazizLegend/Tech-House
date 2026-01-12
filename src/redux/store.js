import { configureStore } from "@reduxjs/toolkit";
import wishesReducer from "./wishesSlice";
import cartReducer from "./cartSlice"

export const store = configureStore({
  reducer: {
    wishes: wishesReducer,
    cart: cartReducer
  }
});
