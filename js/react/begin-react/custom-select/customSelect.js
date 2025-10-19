import React, { useState, useRef, useEffect } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import "./CustomSelect.css";

export default function CustomSelect({ options, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const optionsRef = useRef([]);

  useOutsideClick(containerRef, () => setIsOpen(false));

  useEffect(() => {
    if (isOpen && optionsRef.current[highlightedIndex]) {
      optionsRef.current[highlightedIndex].focus();
    }
  }, [isOpen, highlightedIndex]);

  function handleSelect(option) {
    setSelected(option);
    setIsOpen(false);
    onChange?.(option);
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(options[highlightedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  return (
    <div
      className="custom-select"
      ref={containerRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls="custom-select-listbox"
    >
      <div
        className="custom-select__control"
        tabIndex={0}
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
      >
        {selected ? selected.label : placeholder || "Select..."}
      </div>
      {isOpen && (
        <ul
          className="custom-select__list"
          id="custom-select-listbox"
          role="listbox"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selected?.value === option.value}
              tabIndex={-1}
              ref={(el) => (optionsRef.current[index] = el)}
              className={`custom-select__option ${
                highlightedIndex === index ? "highlighted" : ""
              }`}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
