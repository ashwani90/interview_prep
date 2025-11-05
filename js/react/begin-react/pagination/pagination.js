import React, { useEffect, useState, useCallback } from "react";
import Pagination from "./Pagination";

export default function PaginatedList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10; // items per page

  const fetchData = useCallback(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setPage((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && page > 1) {
        setPage((prev) => prev - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [page]);

  return (
    <div>
      <ul className="list">
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>

      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
