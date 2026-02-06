import React, { useMemo } from "react";
import "./StatsPage.css";
import { loadProducts, loadEvents } from "../../../static/productStore";

export default function StatsPage() {
  const products = useMemo(() => {
    try { return loadProducts(); } catch { return []; }
  }, []);

  const events = useMemo(() => {
    try { return loadEvents(); } catch { return []; }
  }, []);

  const topLiked = useMemo(() => {
    const likeCount = new Map();
    events.forEach((e) => {
      if (e.type === "like_add") {
        likeCount.set(e.productId, (likeCount.get(e.productId) || 0) + 1);
      }
    });
    const prodMap = new Map(products.map((p) => [p.id, p]));
    return [...likeCount.entries()]
      .map(([id, cnt]) => ({ id, cnt, title: prodMap.get(id)?.title || id }))
      .sort((a, b) => b.cnt - a.cnt)
      .slice(0, 8);
  }, [events, products]);

  const cartNow = useMemo(() => {
    // Bu qurilmadagi cart holati (redux ham shu localStorage ni ishlatadi)
    try {
      return JSON.parse(localStorage.getItem("techhouse_cart_v2") || localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  }, []);

  const recent = useMemo(() => events.slice(0, 12), [events]);

  const stats = useMemo(() => {
    const likes = events.filter((e) => e.type === "like_add").length;
    const cartAdds = events.filter((e) => e.type === "cart_add").length;
    return {
      products: products.length,
      likes,
      cartAdds,
      events: events.length,
    };
  }, [events, products]);

  const eventsByDay = useMemo(() => {
    const map = new Map();
    const days = 7;
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      map.set(key, 0);
    }
    events.forEach((e) => {
      const key = String(e.at || "").slice(0, 10);
      if (map.has(key)) map.set(key, (map.get(key) || 0) + 1);
    });
    const list = [...map.entries()].map(([day, cnt]) => ({ day, cnt }));
    const max = Math.max(1, ...list.map((x) => x.cnt));
    return { list, max };
  }, [events]);

  const topCategories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const k = (p.parentCategory || "-") + " / " + (p.category || "-");
      map.set(k, (map.get(k) || 0) + 1);
    });
    return [...map.entries()].map(([name, cnt]) => ({ name, cnt })).sort((a,b) => b.cnt - a.cnt).slice(0, 6);
  }, [products]);

  return (
    <div className="admStats">
      <div className="admGrid3">
        <div className="admCard stat">
          <div className="admMuted">Mahsulotlar</div>
          <div className="val">{stats.products}</div>
          <div className="pill">Katalog</div>
        </div>
        <div className="admCard stat">
          <div className="admMuted">Like</div>
          <div className="val">{stats.likes}</div>
          <div className="pill">So‘nggi loglar</div>
        </div>
        <div className="admCard stat">
          <div className="admMuted">Savatga qo‘shish</div>
          <div className="val">{stats.cartAdds}</div>
          <div className="pill">Harakatlar</div>
        </div>
      </div>

      <div className="admGrid2 mt">
        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Top like qilinganlar</div>
            <div className="pill">TOP 8</div>
          </div>
          <div className="list">
            {topLiked.length ? topLiked.map((x) => (
              <div className="row" key={x.id}>
                <div className="title">{x.title}</div>
                <div className="pill">{x.cnt} like</div>
              </div>
            )) : (
              <div className="admMuted empty">Hozircha like log yo‘q</div>
            )}
          </div>
        </div>

        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Savatda turganlar (shu qurilma)</div>
            <div className="pill">{cartNow.reduce((s, i) => s + (i.quantity || 0), 0)} dona</div>
          </div>
          <div className="list">
            {cartNow.length ? cartNow.slice(0, 8).map((it) => (
              <div className="row" key={it.id}>
                <div className="title">{it.title}</div>
                <div className="pill">x{it.quantity}</div>
              </div>
            )) : (
              <div className="admMuted empty">Savat bo‘sh</div>
            )}
          </div>
        </div>

      </div>

      <div className="admGrid2 mt">
        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Oxirgi 7 kun: loglar</div>
            <div className="pill">{eventsByDay.list.reduce((s, x) => s + x.cnt, 0)} ta</div>
          </div>
          <div className="miniBars">
            {eventsByDay.list.map((x) => (
              <div className="barCol" key={x.day} title={`${x.day}: ${x.cnt}`}
              >
                <div className="bar" style={{ height: `${Math.round((x.cnt / eventsByDay.max) * 100)}%` }} />
                <div className="barLbl">{x.day.slice(5)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="admCard box">
          <div className="boxHead">
            <div className="boxTitle">Top kategoriyalar</div>
            <div className="pill">TOP 6</div>
          </div>
          <div className="list">
            {topCategories.length ? topCategories.map((x) => (
              <div className="row" key={x.name}>
                <div className="title">{x.name}</div>
                <div className="pill">{x.cnt}</div>
              </div>
            )) : (
              <div className="admMuted empty">Kategoriya topilmadi</div>
            )}
          </div>
        </div>
      </div>

      <div className="admCard box mt">
        <div className="boxHead">
          <div className="boxTitle">So‘nggi harakatlar (kun / user / amal)</div>
          <div className="pill">{stats.events} ta log</div>
        </div>
        <div className="tableWrap">
          <table className="tbl">
            <thead>
              <tr>
                <th>Vaqt</th>
                <th>User</th>
                <th>Amal</th>
                <th>Mahsulot</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((e) => (
                <tr key={e.id}>
                  <td className="mono">{new Date(e.at).toLocaleString()}</td>
                  <td className="mono">{e.userId}</td>
                  <td>{e.type}</td>
                  <td>{e.title || e.productId || "-"}</td>
                </tr>
              ))}
              {!recent.length && (
                <tr><td colSpan="4" className="admMuted empty">Hozircha log yo‘q</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
