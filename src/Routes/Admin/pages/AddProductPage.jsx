import React, { useState } from "react";
import ProductEditor from "../components/ProductEditor";

export default function AddProductPage() {
  const [done, setDone] = useState(false);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {done && (
        <div className="admCard" style={{ padding: 14 }}>
          <b>✅ Mahsulot qo‘shildi.</b>
          <div className="admMuted" style={{ marginTop: 6 }}>Front tomonda ham darhol ko‘rinadi.</div>
        </div>
      )}
      <ProductEditor editing={null} onSaved={() => setDone(true)} />
    </div>
  );
}
