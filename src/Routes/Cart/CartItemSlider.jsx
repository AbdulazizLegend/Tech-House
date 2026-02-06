import { useMemo, useRef, useState } from "react";
import "./CartItemSlider.css";

export default function CartItemSlider({ item }) {
  const images = useMemo(() => {
    const arr = Array.isArray(item?.images) && item.images.length ? item.images : [];
    const url = item?.url || arr[0];
    const base = arr.length ? arr : (url ? [url] : []);
    return base.slice(0, 6);
  }, [item]);

  const [idx, setIdx] = useState(0);
  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);

  const clampIdx = (n) => {
    if (!images.length) return 0;
    if (n < 0) return 0;
    if (n > images.length - 1) return images.length - 1;
    return n;
  };

  const onPointerDown = (e) => {
    if (images.length <= 1) return;
    if (e.button !== undefined && e.button !== 0) return;
    dragging.current = true;
    startX.current = e.clientX || 0;
    deltaX.current = 0;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };

  const onPointerMove = (e) => {
    if (!dragging.current || images.length <= 1) return;
    deltaX.current = (e.clientX || 0) - startX.current;
  };

  const onPointerUp = () => {
    if (!dragging.current || images.length <= 1) return;
    dragging.current = false;
    const dx = deltaX.current;
    const threshold = 40;
    if (Math.abs(dx) >= threshold) {
      if (dx < 0) setIdx((v) => clampIdx(v + 1));
      else setIdx((v) => clampIdx(v - 1));
    }
    deltaX.current = 0;
  };

  return (
    <div className="cartSlider" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp} onPointerLeave={onPointerUp}>
      <div className="cartSlider__track" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {(images.length ? images : [item?.url]).map((src, i) => (
          <div className="cartSlider__slide" key={i}>
            <img src={src} alt={item?.title || "product"} draggable={false} />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="cartSlider__dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`cartSlider__dot ${i === idx ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Rasm ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
