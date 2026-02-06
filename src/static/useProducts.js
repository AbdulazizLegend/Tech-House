import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setProducts(data || []);
    }

    loadProducts();
  }, []);

  return products;
}
