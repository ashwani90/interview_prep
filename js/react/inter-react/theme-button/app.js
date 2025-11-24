import React from "react";
import Button from "./components/Button/Button";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Themeable Button Library Demo</h2>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Button variant="primary" size="sm">Small Primary</Button>
        <Button variant="primary" size="md">Medium Primary</Button>
        <Button variant="primary" size="lg">Large Primary</Button>

        <Button variant="secondary" size="md" icon={<FaPlus />}>
          Add Item
        </Button>

        <Button variant="danger" size="md" icon={<FaTrash />}>
          Delete
        </Button>

        <Button variant="primary" size="md" disabled>
          Disabled
        </Button>
      </div>
    </div>
  );
}
