import React, { useState, useRef } from "react";
import "./ProductCarousel.css";

export default function ProductCarousel({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(null);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      nextSlide(); // swipe left
    } else if (diff < -50) {
      prevSlide(); // swipe right
    }

    touchStartX.current = null;
  };

  return (
    <div
      className="carousel-container"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button className="carousel-btn left" onClick={prevSlide}>
        ❮
      </button>

      <div className="carousel-slide">
        <img
          src={products[currentIndex].image}
          alt={products[currentIndex].name}
        />
        <p>{products[currentIndex].name}</p>
      </div>

      <button className="carousel-btn right" onClick={nextSlide}>
        ❯
      </button>
    </div>
  );
}
