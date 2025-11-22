import React, { useState } from "react";
import "./StarRating.css";

export default function StarRating({ maxStars = 5, value = 0, onChange, readOnly = false }) {
  const [hoveredStar, setHoveredStar] = useState(null);

  const handleClick = (rating) => {
    if (!readOnly && onChange) {
      onChange(rating);
    }
  };

  const handleMouseEnter = (rating) => {
    if (!readOnly) {
      setHoveredStar(rating);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoveredStar(null);
    }
  };

  return (
    <div className="star-rating">
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isFilled = hoveredStar
          ? starValue <= hoveredStar
          : starValue <= value;

        return (
          <span
            key={i}
            className={`star ${isFilled ? "filled" : ""} ${readOnly ? "readonly" : ""}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
