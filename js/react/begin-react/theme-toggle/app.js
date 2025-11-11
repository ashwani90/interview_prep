import React from "react";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  return (
    <div className="app">
      <h1>Dark/Light Theme Toggle</h1>
      <ThemeToggle />
      <p>
        This is some sample text to see how the theme colors change when toggling
        between dark and light mode.
      </p>
    </div>
  );
}
