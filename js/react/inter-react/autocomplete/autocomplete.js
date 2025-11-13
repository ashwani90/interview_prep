import React, { useState, useEffect, useRef } from "react";
import "./Autocomplete.css";

export default function Autocomplete({ fetchSuggestions }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);
  const containerRef = useRef(null);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced fetch
  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const results = await fetchSuggestions(query);
      setSuggestions(results);
      setHighlightIndex(-1);
      setLoading(false);
    }, 300);
  }, [query, fetchSuggestions]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      setQuery(suggestions[highlightIndex]);
      setSuggestions([]);
    }
  };

  const handleSelect = (value) => {
    setQuery(value);
    setSuggestions([]);
  };

  return (
    <div className="autocomplete-container" ref={containerRef}>
      <input
        type="text"
        value={query}
        placeholder="Type to search..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {loading && <div className="spinner"></div>}
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className={highlightIndex === index ? "highlighted" : ""}
              onClick={() => handleSelect(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
