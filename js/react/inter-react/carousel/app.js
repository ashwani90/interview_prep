import React from "react";
import ProductCarousel from "./components/ProductCarousel/ProductCarousel";

export default function App() {
  const products = [
    { name: "Product 1", image: "https://via.placeholder.com/300x200?text=1" },
    { name: "Product 2", image: "https://via.placeholder.com/300x200?text=2" },
    { name: "Product 3", image: "https://via.placeholder.com/300x200?text=3" },
    { name: "Product 4", image: "https://via.placeholder.com/300x200?text=4" },
  ];

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Product Slider / Carousel</h1>
      <ProductCarousel products={products} />
    </div>
  );
}
