import React from "react";
import { useCart } from "../context/CartContext";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

export default function ProductList() {
  const { addToCart } = useCart();

  return (
    <div className="product-list">
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} className="product">
          <span>{p.name}</span>
          <span>${p.price}</span>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
