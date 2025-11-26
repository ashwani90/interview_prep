import React, { useState, useRef, useEffect } from "react";
import "./Tooltip.css";

export default function Tooltip({ children, content, position = "top" }) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({});
  const targetRef = useRef(null);

  useEffect(() => {
    if (visible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      const tooltipOffset = 8; // px
      let top, left;

      switch (position) {
        case "bottom":
          top = rect.bottom + tooltipOffset;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - tooltipOffset;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + tooltipOffset;
          break;
        case "top":
        default:
          top = rect.top - tooltipOffset;
          left = rect.left + rect.width / 2;
          break;
      }

      setCoords({ top, left });
    }
  }, [visible, position]);

  return (
    <span
      className="tooltip-wrapper"
      ref={targetRef}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      tabIndex={0} // for keyboard focus
    >
      {children}
      {visible && (
        <div
          className={`tooltip-box tooltip-${position}`}
          style={{
            top: coords.top,
            left: coords.left,
            position: "fixed",
            transform:
              position === "top"
                ? "translate(-50%, -100%)"
                : position === "bottom"
                ? "translate(-50%, 0)"
                : position === "left"
                ? "translate(-100%, -50%)"
                : "translate(0, -50%)",
          }}
        >
          {content}
        </div>
      )}
    </span>
  );
}
