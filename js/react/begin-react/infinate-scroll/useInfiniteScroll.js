import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(fetchMore, hasMore) {
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          fetchMore().finally(() => setIsLoading(false));
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, hasMore, isLoading]);

  return { observerRef, isLoading };
}
