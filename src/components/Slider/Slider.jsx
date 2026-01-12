import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import img1 from "../../assets/Images/Banner.png";
import img2 from "../../assets/Images/Banner.png";
import img3 from "../../assets/Images/Banner.png";
import { IoIosArrowForward , IoIosArrowBack } from "react-icons/io";


const slides = [img1, img2, img3];

function Slider() {
  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const isDown = useRef(false);

  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, []);

  // DRAG HANDLERS
  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e) => {
    if (!isDown.current) return;
    const diff = e.clientX - startX.current;

    if (diff > 50) prev();
    if (diff < -50) next();

    isDown.current = false;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  return (
    <div
      className="slider"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="slider__track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((img, i) => (
          <div className="slider__slide" key={i}>
            <img src={img} alt="" draggable="false" />
          </div>
        ))}
      </div>

      <button className="slider__btn left" onClick={prev}><p>
        <IoIosArrowBack />
        </p></button>
      <button className="slider__btn right" onClick={next}>
        <p><IoIosArrowForward /></p>
      </button>

      <div className="slider__dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={index === i ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
