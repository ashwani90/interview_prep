import React from "react";
import UserProfile from "../components/UserProfile";
import Products from "../components/Products";
import Cart from "../components/Cart";

export default function Home() {
  return (
    <div>
      <h1>Zustand Global State Example</h1>
      <UserProfile />
      <Products />
      <Cart />
    </div>
  );
}
