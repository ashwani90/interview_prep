import React from "react";
import Autocomplete from "./components/Autocomplete";

export default function App() {
  // Mock API fetch
  const fetchSuggestions = async (query) => {
    const localData = [
      "Apple",
      "Apricot",
      "Banana",
      "Blueberry",
      "Blackberry",
      "Cherry",
      "Grape",
      "Kiwi",
      "Lemon",
      "Mango",
      "Orange",
      "Peach",
      "Pear",
      "Pineapple",
      "Strawberry",
      "Watermelon"
    ];
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return localData.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Type-Ahead Autocomplete</h1>
      <Autocomplete fetchSuggestions={fetchSuggestions} />
    </div>
  );
}
