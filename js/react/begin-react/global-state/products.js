import React from "react";
import { useStore } from "../store/useStore";

export default function Products() {
  const addToCart = useStore((state) => state.addToCart);

  const products = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Headphones" },
    { id: 3, name: "Keyboard" },
  ];

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name}{" "}
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
