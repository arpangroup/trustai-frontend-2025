import React, { useState, useEffect } from "react";
import "./Carousel.css";

export default function Carousel({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [slideCount]);

  function goToSlide(idx) {
    setActiveIndex(idx);
  }

  return (
    <div className="carousel">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${activeIndex * 100}vw)` }}
      >
        {slides.map(({ title, desc, learnText, subText, imgSrc, alt }, i) => (
          <div className="carousel-slide" key={i}>
            <div className="banner">
              <div className="banner-txt">
                <div className="banner-title">{title}</div>
                <div className="banner-desc">{desc}</div>
                <div className="banner-learn">{learnText}</div>
                <div style={{ color: "#8b99bc", fontSize: 11, marginTop: 6 }}>
                  {subText}
                </div>
              </div>
              <img src={imgSrc} className="banner-img" alt={alt} />
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot${i === activeIndex ? " active" : ""}`}
            onClick={() => goToSlide(i)}
            role="button"
            aria-label={`Slide ${i + 1}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") goToSlide(i);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
