import React, { useState } from "react";
import StarRating from "./components/StarRating";

export default function App() {
  const [rating, setRating] = useState(3);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Star Rating Component</h1>

      <h3>Editable Rating</h3>
      <StarRating value={rating} onChange={(val) => setRating(val)} />

      <p>Selected Rating: {rating}</p>

      <h3>Read-Only Rating</h3>
      <StarRating value={4} readOnly />
    </div>
  );
}
