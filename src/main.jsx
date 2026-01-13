import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Snowfall from "react-snowfall"; // 👈 QO‘SHILDI

import App from "./App.jsx";
import "./index.css";

import ProductProvider from "./Context/ProductContext.jsx";
import { store } from "./redux/store";   // 🔥 REDUX STORE

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>        {/* 🔥 REDUX */}
      <BrowserRouter>
        <ProductProvider>           {/* 🔥 CONTEXT */}
            <Snowfall
        snowflakeCount={80}
        speed={[0.5, 2]}
        radius={[1, 3]}
        color="#ffffffff"

      />
          <App />
        </ProductProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
