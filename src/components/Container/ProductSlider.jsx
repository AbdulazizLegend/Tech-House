import { useState, useRef, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import "./ProductSlider.css";
import l1 from "../../assets/Images/image1.png";

export default function Product({ images = [] }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const imgRef = useRef(null);

  // 🔥 HAMMA RASMLARNI BITTA ARRAYGA YIG'DIK
  const allImages = [...images, l1, l1, l1, l1];

  if (!allImages.length) return null;

  const prev = () =>
    setActive((p) => (p === 0 ? allImages.length - 1 : p - 1));

  const next = () =>
    setActive((p) => (p === allImages.length - 1 ? 0 : p + 1));

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    imgRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <>
      <div className="pz-wrap">

        {/* THUMBS */}
        <div className="pz-thumbs">
          <div className="kartinkas">
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className={active === i ? "active" : ""}
                onClick={() => setActive(i)}
                alt=""
              />
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div
          className="pz-main"
          onMouseMove={handleMove}
          onClick={() => setOpen(true)}
        >
          <button
            className="pz-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <IoIosArrowBack />
          </button>

          <img ref={imgRef} src={allImages[active]} alt="" />

          <button
            className="pz-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="pz-modal" onClick={() => setOpen(false)}>
          <button className="pz-close">
            <IoMdClose />
          </button>

          <button
            className="pz-modal-arrow left"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
          >
            <IoIosArrowBack />
          </button>

          <img src={allImages[active]} alt="" />

          <button
            className="pz-modal-arrow right"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
          >
            <IoIosArrowForward />
          </button>
        </div>
      )}
    </>
  );
}
