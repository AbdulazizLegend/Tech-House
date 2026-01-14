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
            color="#f5752f"
            style={{
              // position: "fixed",
              // width: "100%",
              // height: "100%",
              // top: 0,
              // left: 0,
              zIndex: 9999,
              pointerEvents: "none"
            }}
          />

          <App />
        </ProductProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
