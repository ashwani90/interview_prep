import React, { useState, useCallback } from "react";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Spinner from "../components/Spinner";

// Mock API fetch
function fetchItems(page) {
  return new Promise(resolve => {
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: page * 10 + i,
        text: `Item ${page * 10 + i + 1}`
      }));
      resolve(newItems);
    }, 1000);
  });
}

export default function InfiniteScrollPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    const newItems = await fetchItems(page);
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);

    if (page >= 4) setHasMore(false); // stop after 5 pages for demo
  }, [page]);

  const { observerRef, isLoading } = useInfiniteScroll(loadMore, hasMore);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Infinite Scroll Demo</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "5px"
            }}
          >
            {item.text}
          </li>
        ))}
      </ul>

      {isLoading && <Spinner />}

      {hasMore && !isLoading && (
        <div
          ref={observerRef}
          style={{ height: "20px" }}
        />
      )}
    </div>
  );
}
