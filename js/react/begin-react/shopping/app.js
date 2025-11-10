import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      <div className="container">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}
