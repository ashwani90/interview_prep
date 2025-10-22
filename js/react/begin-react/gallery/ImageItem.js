import React, { useRef, useState, useEffect } from "react";

export default function ImageItem({ src, alt, onClick }) {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="image-item" ref={imgRef} onClick={onClick}>
      {isVisible ? (
        <img src={src} alt={alt} loading="lazy" />
      ) : (
        <div className="placeholder">Loading...</div>
      )}
    </div>
  );
}
s