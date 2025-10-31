import React, { useState } from "react";
import Modal from "../components/Modal";

export default function Home() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <h1>Modal with Portal Example</h1>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Modal Title</h2>
        <p>This is modal content with focus trap.</p>
        <button onClick={() => alert("Clicked inside modal!")}>
          Click Me
        </button>
      </Modal>
    </div>
  );
}
