import React, { useState, useRef } from "react";
import "./Tabs.css";

export default function Tabs({ tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);

  const handleKeyDown = (e, index) => {
    if (e.key === "ArrowRight") {
      const nextIndex = (index + 1) % tabs.length;
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
    if (e.key === "ArrowLeft") {
      const prevIndex = (index - 1 + tabs.length) % tabs.length;
      setActiveIndex(prevIndex);
      tabRefs.current[prevIndex]?.focus();
    }
  };

  return (
    <div className="tabs-container">
      <div className="tab-list" role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            className={`tab-button ${index === activeIndex ? "active" : ""}`}
            role="tab"
            aria-selected={index === activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-panel" role="tabpanel">
        {tabs[activeIndex].content}
      </div>
    </div>
  );
}
