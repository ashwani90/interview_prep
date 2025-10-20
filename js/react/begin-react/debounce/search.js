import React, { useState, useEffect, useRef } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeoutRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Clear previous debounce timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }

    timeoutRef.current = setTimeout(() => {
      fetchResults(query);
    }, 500); // debounce delay 500ms

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [query]);

  const fetchResults = async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);

      abortRef.current = new AbortController();

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?q=${encodeURIComponent(searchTerm)}`,
        { signal: abortRef.current.signal }
      );

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      setResults(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul className="results">
        {results.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
