import React, { useRef, useEffect, useState } from "react";

export default function AccordionItem({ title, children, isOpen, onToggle }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onToggle}>
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      <div
        className="accordion-content"
        ref={contentRef}
        style={{
          height: `${height}px`,
          transition: "height 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div className="accordion-inner">{children}</div>
      </div>
    </div>
  );
}
