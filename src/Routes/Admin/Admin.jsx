import React, { useMemo, useState } from "react";
import "./Admin.css";
import { clearAuth, getAuth } from "./adminStore";
import AdminLogin from "./AdminLogin";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import StatsPage from "./pages/StatsPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import SettingsPage from "./pages/SettingsPage";

export default function Admin() {
  const [auth, setAuth] = useState(getAuth());
  const [page, setPage] = useState("stats");

  const content = useMemo(() => {
    switch (page) {
      case "products":
        return <ProductsPage /> ;
      case "add":
        return <AddProductPage />;
      case "categories":
        return <CategoriesPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <StatsPage />;
    }
  }, [page]);

  if (!auth?.isAuthed) {
    return <AdminLogin onSuccess={(a) => setAuth(a)} />;
  }

  return (
    <div className="thAdmin">
      <AdminSidebar page={page} onChange={setPage} />
      <div className="thAdmin__main">
        <AdminTopbar
          page={page}
          username={auth.username}
          onLogout={() => {
            clearAuth();
            setAuth({ isAuthed: false, username: "" });
          }}
        />
        <div className="thAdmin__content">{content}</div>
      </div>
    </div>
  );
}
