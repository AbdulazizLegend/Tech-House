import { createContext, useState } from "react";
import PRODUCTS from "../static";

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [products] = useState(PRODUCTS);
  const [cart, setCart] = useState([]);
  const [wishes, setWishes] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        setCart,
        wishes,
        setWishes,
        search,
        setSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
