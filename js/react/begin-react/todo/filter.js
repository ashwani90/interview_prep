import React from "react";

export default function FilterButtons({ currentFilter, onChange }) {
  const filters = ["all", "active", "completed"];

  return (
    <div className="filters">
      {filters.map((f) => (
        <button
          key={f}
          className={f === currentFilter ? "active" : ""}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
